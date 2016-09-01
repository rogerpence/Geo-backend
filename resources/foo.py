import sys, os.path
from flask_restful import Resource, request
from flask import jsonify

pathup = os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)) + '/common'
sys.path.append(pathup)

from src import dbio

class Foo(Resource):
    def __init__(self, **kwargs):
        # The db is injected in the constructor.
        self.db = kwargs['db']    

    def get(self):
        g = {"routeid": 492,
             "latitude": 25.6, 
             "longitude": -98.567,
             "captured_at": "2016-08-31T21:01:47.894512"}

        msg = dbio.addGeoLocation(self.db, g)

        return {'hello': msg}        
        
    def post(self):
        # json_data = request.get_json(force=True)        
        # If mime type is json this fetches the json.
        json_data = request.json
        g = {"routeid": json_data['routeid'],
             "latitude": json_data['latitude'], 
             "longitude": json_data['longitude'],
             "captured_at": json_data['captured_at']}

        dbio.addGeoLocation(self.db, g)
        return jsonify(status="ok")                