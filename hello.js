var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var authKeys = require('./auth.js');

var  bot_token = authKeys.getToken(),
    rtm = new RtmClient(bot_token);

rtm.start();

var response = "Hola, mi nombre es Pingu. \n" +
              "Soy un bot que les ayudará a saber si los baños de arriba están ocupados \n" +
              "Sólo mándame un mensaje directo con la palabra 'baño' o 'wc', también puedes especificar el baño (ej: wc hombres)\n" +
              "Estoy en versión BETA, así que ténganme paciencia \n" +
              ":penguin:";

var dmChannel = "D5GK35N86";

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it 
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});
 
// you need to wait for the client to fully connect before you can send messages 
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  rtm.sendMessage(response, dmChannel);
});
 
rtm.start();