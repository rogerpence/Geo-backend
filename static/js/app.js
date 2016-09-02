var rp = rp || {};

rp.main = function () {

    function postGeoLocation() {
        var data = {
            "routeid": 34567,
            "latitude": "29.6537893",
            "longitude": "-91.5678932",
            "captured_at": "2016-08-31T21:01:47.894512"
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
        postGeoLocation: postGeoLocation
    };
} ();