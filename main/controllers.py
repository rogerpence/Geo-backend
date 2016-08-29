from flask import render_template
from main import main
# from flask.ext.login import login_required

@main.route('/')
def index():
    return render_template('index.html')