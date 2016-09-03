var rp = rp || {};

rp.getGeoLocationManager = function() {
    var options;
    const MOVEMENT_FACTOR = .0145;
    const DUMMY_START_LATITUDE = 28.5;
    const DUMMY_START_LONGITUDE = -98.5;

    var geoPosition = {
        latitude: 0,
        longitude: 0,
        previousLatitude: 0,
        previousLongitude: 0,
        captured_at: ''        
    }

    function captureGeoLocation() {
        navigator.geolocation.getCurrentPosition(reportCurrentPosition, geoError);
        // Dummy won't need HTTPS.
        //dummyGetCurrentPosition(reportCurrentPosition, geoError)                
    }

    function geoError(positionError) {
        // Handle GEO error here. 
        var x = positionError;
        console.log("GEO error occured.")
    }

    function dummyGetCurrentPosition(success, error) {
        success(geoPosition);
    }

    function reportCurrentPosition(position) {
        if (this.options.emulateMovement) {            
            geoPosition.latitude = (geoPosition.latitude == 0) ? Number.parseFloat(position.coords.latitude.toFixed(7)) : geoPosition.latitude  + MOVEMENT_FACTOR;  
            geoPosition.longitude = (geoPosition.longitude == 0) ? Number.parseFloat(position.coords.longitude.toFixed(7)) : geoPosition.longitude + MOVEMENT_FACTOR; 
        }                
        else {
            geoPosition.latitude = Number.parseFloat(position.coords.latitude.toFixed(7));
            geoPosition.longitude = Number.parseFloat(position.coords.longitude.toFixed(7));
        }

        geoPosition.captured_at = new Date(position.timestamp).toISOString();

        this.options.captureCallback(geoPosition);

        geoPosition.previousLatitude = geoPosition.latitude;
        geoPosition.previousLongitude = geoPosition.longitude;
    }

    function startGeoLocationCapture(options) {
        this.options = options;
        options.captureSecondsInterval = this.options.captureSecondsInterval * 1000;
        geoPosition.latitude = 0;
        geoPosition.longitude = 0;
        geoPosition.previousLatitude = 0;
        geoPosition.previousLongitude = 0;

        if (navigator.geolocation) {
            captureGeoLocation();
            options.captureId = setInterval(function() {
                captureGeoLocation();
            }, options.captureSecondsInterval);
        }
        else {
            console.log("Geolocation is not supported by this browser");
        }

    };      
    return {
        startGeoLocationCapture: startGeoLocationCapture
    }                     
}();