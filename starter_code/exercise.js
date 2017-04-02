var mqtt = require('mqtt');
var client = {};
var exercise = {};

exercise.yourMessage = "";

exercise.ConnectToServer = function(address){
    // Connect to the MQTT broker
    // -------------------------------
	// ---------- Your Code ----------
	// -------------------------------
};

exercise.SubscribeToChannel = function(channel){
    // Subscribe to a channel
    // -------------------------------
	// ---------- Your Code ----------
	// -------------------------------
};

exercise.SendToChannel = function(channel,message){
    // Publish a message to a channel
    // -------------------------------
	// ---------- Your Code ----------
	// -------------------------------
};

exercise.ProcessMessage = function(){
    // Process an incoming message.
    // Set exercise.yourMessage to be
    // the incoming message.
    // Also log the incoming message
    // to console.
    // -------------------------------
	// ---------- Your Code ----------
	// -------------------------------
};

exercise.Disconnect = function(){
    // Disconnect the client
    // -------------------------------
    // ---------- Your Code ----------
    // -------------------------------
};

module.exports = exercise;