// Node modules
var express = require('express'),
	hipchatter = require('hipchatter'),
	bodyParser = require('body-parser'),
	util = require('util');

util.log('Starting');

// App variables
var intPunchClockRoomId = 784860,	// Change this to the HipChat room id that your organisation is using
	host = 'localhost',				// Change this to the domain name that this web app will be hosted on
	port = 23555,					// This will be the port that the Node.js backend will listen to
	app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/send', function(request, response) {
	// Allow requests from everywhere
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'X-Requested-With');
	response.header('Content-Type', 'application/json');

	var strMessage = '',
		strColor = '',
		boolArriving = false,
		boolLeaving = false,
		strHipchatApiKey = request.body.strApiKey,
		strEvent = request.body.strEvent;

	if (typeof strHipchatApiKey !== 'string' || strHipchatApiKey.length !== 40) {
		response.send('{"success": false, "message": "Invalid API key recieved"}');
		return false;
	} else {
		// Instantiate a new object for every request, otherwise multiple users will be mixed up
		var objHipChat = new hipchatter(strHipchatApiKey);

		if (strEvent === 'arriving') {
			boolArriving = true;
			strMessage = 'In'; // This is the message that will be sent to the PunchClock room when someone is arriving
			strColor = 'green';
		} else if (strEvent === 'leaving') {
			boolLeaving = true;
			strMessage = 'Out'; // This is the message that will be sent to the PunchClock room when someone is leaving
			strColor = 'red';
		}

		if (boolArriving || boolLeaving) {
			objHipChat.notify(intPunchClockRoomId, {
				message: strMessage,
				color: strColor,
				token: strHipchatApiKey
			},
			function(err) {
				// Real error handling could be done here
				if (err == null) {
					if (boolArriving) {
						util.log('Someone just arrived');
					} else {
						util.log('Someone just left');
					}
				}
			});

			response.send('{"success": true, "message": "Message was sent"}');
		} else {
			response.send('{"success": false, "message": "A valid event was not recieved"}');
		}
	}
});

// Actually start listening
app.listen(port, host);

util.log('Started, now listening...');
