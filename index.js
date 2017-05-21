var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var authKeys = require('./auth.js');

var bot_token = authKeys.getToken();

var rtm = new RtmClient(bot_token);

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  var dmChannel = message.channel;
  console.log(message)
  if (message.text == 'Baño') {
    rtm.sendMessage("No sé, aún no estoy funcionando ", dmChannel);
  }
});

rtm.start();