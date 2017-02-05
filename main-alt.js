//tessel list && tessel wifi -n ATT5RlN3g8 -p 4exv6prb=v=4
//cls && tessel list && tessel wifi -l && tessel run main.js

//Node Libraries
var http = require('http');

//Tessel Libraries
var tessel = require('tessel');
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['C']);

//Tessel Modules
var led1 = tessel.led[0].output(0);
var led2 = tessel.led[1].output(0);
var led3 = tessel.led[2].output(0);
var led4 = tessel.led[3].output(0);

function ledToggle() {
    led1.toggle();
    led2.toggle();
    led3.toggle();
    led4.toggle();
}

function ledFlash() {
    ledToggle();
    ledToggle();
}

function ledFlash(x) {
    for (var i = 0; i < x; i++)
        ledFlash();
}

//Data
var postUrl = "http://graph.facebook.com/v2.6/me/messages?access_token=EAAB7pxDq4loBAEwEhT97S3BTr37flvqdpN5ZCBIEuhjRGHAn5gaL1PbbluWaQEsZANS4aLk3Xz8vYaToZCSLXeW23q65lBVw7s8yj7mVs5YieQgax4Ip4Xqm8Ad608oSeknxWTZBHQ8RgvZAeqsC7Ny8usvKnXSACZBxN7vfDZApgZDZD";
// "id": "100001032402911"
var postData = '{"recipient": { "phone_number": "+1(408)658-8961" }, "message": { "text": "Hello World from Tessel!" }}';

console.log("Hello World");

// climate.on('ready', function () {
// console.log("Climate is ready!");
// setInterval(function () {
//     climate.readHumidity(function (err, humid) {
//         climate.readTemperature('f', function (err, temp) {
//             console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
//         });
//     });
// }, 1000);
// });

// climate.on('error', function (err) {
//     console.log('error connecting module', err);
// });

post(postUrl, postData, function (res) {
    ledFlash();
    console.log('statusCode: ', res.statusCode);
    console.log(res);
}, function (err) {
    ledFlash();
    ledFlash();
    ledFlash();
    console.error("Error posting data...", err);
    sendToAercloud('{"deviceID":"f000da30-005a4742-4e7c2586"}', "SimpleBottle-Logs");
});

function post(url, data, cb, errcb) {
    console.log("Posting Data...");
    var req = http.request({
        port: 80,
        method: 'POST',
        hostname: 'graph.facebook.com',
        path: '/v2.6/me/messages?access_token=EAAB7pxDq4loBAEwEhT97S3BTr37flvqdpN5ZCBIEuhjRGHAn5gaL1PbbluWaQEsZANS4aLk3Xz8vYaToZCSLXeW23q65lBVw7s8yj7mVs5YieQgax4Ip4Xqm8Ad608oSeknxWTZBHQ8RgvZAeqsC7Ny8usvKnXSACZBxN7vfDZApgZDZD',
        headers: {
            Host: 'graph.facebook.com',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'User-Agent': 'tessel'
        }
    }, function (res) {
        cb(res);
    });
    req.write(data);
    req.end();
    req.on('error', function (e) {
        errcb(e);
    });
}

function sendToAercloud(posting, cName) {
    console.log("Sending to AerCloud...");
    var req = http.request({
        port: 80,
        method: 'POST',
        hostname: 'api.aercloud.aeris.com',
        path: '/v1/16087/scls/f000da30-005a4742-4e7c2586/containers/'+cName+'/contentInstances?apiKey=cf88e244-eb00-11e5-9830-4bda0975d3a3',
        headers: {
            Host: 'api.aercloud.aeris.com',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'User-Agent': 'tessel'
        }
    }, function(res) {
        console.log('statusCode: ', res.statusCode);
    });
    req.write(posting);
    req.end();
    req.on('error', function(e) {
        console.error("error posting data to your container",e);
    });
}

//======================================================================================================================================================

//tessel list && tessel wifi -n ATT5RlN3g8 -p 4exv6prb=v=4
//cls && tessel list && tessel wifi -l && tessel run main.js

//Node Libraries
var request = require('request');

//Tessel Libraries
var tessel = require('tessel');
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['C']);

//Tessel Modules
var led1 = tessel.led[0].output(0);
var led2 = tessel.led[1].output(0);
var led3 = tessel.led[2].output(0);
var led4 = tessel.led[3].output(0);

function ledToggle() {
    led1.toggle();
    led2.toggle();
    led3.toggle();
    led4.toggle();
}

function ledFlash() {
    ledToggle();
    ledToggle();
}

function ledFlash(x) {
    for (var i = 0; i < x; i++)
        ledFlash();
}

//Data
var postUrl = "https://graph.facebook.com/v2.6/me/messages?access_token=EAAB7pxDq4loBAEwEhT97S3BTr37flvqdpN5ZCBIEuhjRGHAn5gaL1PbbluWaQEsZANS4aLk3Xz8vYaToZCSLXeW23q65lBVw7s8yj7mVs5YieQgax4Ip4Xqm8Ad608oSeknxWTZBHQ8RgvZAeqsC7Ny8usvKnXSACZBxN7vfDZApgZDZD";
var postData = {
    "recipient": {
        // "id": "100001032402911"
        "phone_number": "+1(408)658-8961"
    },
    "message": {
        "text": "Hello World from Tessel!"
    }
};

console.log("Hello World");

// climate.on('ready', function () {
//     console.log("Climate is ready!");
//     setInterval(function () {
//         climate.readHumidity(function (err, humid) {
//             climate.readTemperature('f', function (err, temp) {
//                 console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
//             });
//         });
//     }, 1000);
// });

// climate.on('error', function (err) {
//     console.log('error connecting module', err);
// });

request.post({ url: postUrl, form: postData }, function (err, httpResponse, body) {
    ledFlash();
    console.log(err);
    console.log(httpResponse);
    console.log(body);
});