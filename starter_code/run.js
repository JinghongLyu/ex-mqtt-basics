var mosca = require('mosca');
var mqtt = require('mqtt');
var ex = require('./exercise.js');

// In the following code we create a local MQTT broker to test our code with.
// This broker does everything a regular broker would do, in addition, it logs
// all behaviour to console.

var server = new mosca.Server({port: 1883});
server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running, to exit use "ctrl+c"');
}

// fired whena  client is connected
server.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  if(packet.topic == "myChannel") {
    console.log('Published : ', String.fromCharCode.apply(null, new Uint16Array(packet.payload)));
  }
});

// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
  console.log('subscribed : ', topic);
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
  console.log('unsubscribed : ', topic);
});

// fired when a client is disconnecting
server.on('clientDisconnecting', function(client) {
  console.log('clientDisconnecting : ', client.id);
});

// fired when a client is disconnected
server.on('clientDisconnected', function(client) {
  console.log('clientDisconnected : ', client.id);
});

// Now we will use your exercise code to access this local broker
ex.ConnectToServer('mqtt://localhost');
ex.SubscribeToChannel('TestChannel');
ex.ProcessMessage();
ex.SendToChannel('TestChannel','TestMessage');

// To exit this program use "ctrl+c"
