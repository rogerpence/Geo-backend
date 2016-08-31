from flask_restful import Resource, request

class Foo(Resource):
    def get(self):
        return {'hello': 'world'}        
        
    def post(self):
        # json_data = request.get_json(force=True)
        
        # If mime type is json this fetches the json.
        json_data = request.json
        un = json_data['username']
        pw = json_data['password']
        return jsonify(u=un.upper(), p=pw.upper())                