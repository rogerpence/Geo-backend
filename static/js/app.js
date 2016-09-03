var rp = rp || {};

rp.main = function () {

function makeRequest (method, url, done) {
}
    function sendGeoLocation(geoData) {        
        postJson('POST', '/Foo', geoData)
        .then( (datums) => {
            console.log(datums);
        })
        .catch((err) => {
            console.error('Augh, there was an error!', err.statusText);
        });        
    }       

    function postJson (method, url, json) {
        return new Promise(function(resolve, reject) {
            jsonString = JSON.stringify(json);

            var xhr = new XMLHttpRequest();
            
            xhr.open(method, url);
            xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
            xhr.setRequestHeader("Content-length", jsonString.length);

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };

            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };

            xhr.send(jsonString);
        });
    }

    function postGeoLocation() {
        var data = {
            "routeid": 34567,
            "latitude": "29.6537893",
            "longitude": "-91.5678932",
            "timeCaptured": "2016-08-31T21:01:47.894512"
        };

        var options = {
            type: 'POST',
            url: '/Foo',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        };

        $.ajax(options).
            done((data) => {
                var j = data;
            }).
            fail((error) => {

            })
    }

    return {
        postGeoLocation: postGeoLocation,
        sendGeoLocation: sendGeoLocation
    };
}();