from flask import Flask
from flask_restful import Resource, Api
from flask_script import Manager, Server
from resources.foo import Foo
from pymongo import MongoClient

client = MongoClient()
db = client.rpdb

app = Flask(__name__)
api = Api(app)

# flask-script turns on debug if debug = None.
app.config['DEBUG'] = None

manager = Manager(app)
manager.add_command("runserver", Server(host='0.0.0.0'))

api.add_resource(Foo, '/Foo', resource_class_kwargs={'db': db}) 

from main import main as main_blueprint
# url_prefix is unnecessary in this case but provided for clarity.
# `main` provides the controls for the root.
app.register_blueprint(main_blueprint, url_prefix='/')

@app.context_processor
def inject_debug():
    return {'debug': app.debug}

@manager.command
def tester():
    """Test command line command."""
    print('running tester().')

@manager.command
def run_app():
    """Run Web app."""
    app.run(host="0.0.0.0", debug=True)

if __name__ == '__main__':
    manager.run()