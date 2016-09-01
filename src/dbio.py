from datetime import datetime 

def addGeoLocation(db, g):    
    # result = db.route.insert_one({
    #     'latitude': 28.545,
    #     'longitude': -98.543,
    #     'captured_at': datetime.now().isoformat(),
    #     'routeid': 456
    # })
    result = db.route.insert_one(g)
