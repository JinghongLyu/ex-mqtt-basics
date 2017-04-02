var should = require('chai').should();
var mosca = require('mosca');
var ex = require('../exercise.js');

var server;
before(function() {
    server = new mosca.Server({port: 1883});
});

after(function() {
    server.close();
});

describe('Call ConnectToServer', function() {
	it('Server registered connection', function(done) {
		server.on('clientConnected', function(client) {
			done();
		});
	    ex.ConnectToServer('mqtt://localhost');
	});
});

describe('Call SubscribeToChannel', function() {
	it('Server registered subscription', function(done) {
		server.on('subscribed', function(topic, client) {
			if(topic == 'TestChannel') done();
		});
	    ex.SubscribeToChannel('TestChannel');
	});
});

describe('Call SendToChannel', function() {
	it('Server registered message', function(done) {
		server.on('published', function(packet, client) {
			//  console.log(JSON.stringify(packet));
		  	if(packet.topic == "TestChannel")
			{
				message =  String.fromCharCode.apply(null, new Uint16Array(packet.payload));
				if(message == "TestMessage") done();
			}
		});
	    ex.SendToChannel('TestChannel','TestMessage');
	});
});

describe('Call ProcessMessage', function() {
	it('Client received message message', function(done) {
		ex.ProcessMessage();

		var message = {
		  topic: 'TestChannel',
		  payload: 'TestMessage2', // or a Buffer
		  qos: 0, // 0, 1, or 2
		  retain: false // or true
		};

		server.publish(message, function() {
		});

		setTimeout(function() {
			message = ex.yourMessage;
			if(message instanceof Buffer) message = String.fromCharCode.apply(null, new Uint16Array(ex.yourMessage));
			if(message=="TestMessage2") done();
		}, 1000);
	});
});

describe('Call Disconnect', function() {
    it('Client should end connection', function (done) {
        ex.Disconnect();
        done();
    });
});
