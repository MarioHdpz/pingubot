var express = require('express');
var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var authKeys = require('./auth.js');

var app = express(),
    bot_token = authKeys.getToken(),
    rtm = new RtmClient(bot_token),
    men = new Date(),
    women = new Date();

var menWords = ["HOMBRE", "LINCE", "MACHO", "NIÑO", "CHICO"],
    womenWords = ["MUJER", "ELFA", "HEMBRA", "NIÑA", "CHICA"],
    wcWords = ["BAÑO", "WC", "TAZA", "ORINAR", "PIPI", "POPO", "TOCADOR", "LETRINA"];  

var wcLastConnection = new Date();

app.listen(2500, function () {
  console.log('Server started, listening on port 2500...');
});

app.get('/wc-set', function (req, res) { 
  console.log('Setting wc_set variable!' + ' gender: ' + req.query.bathroom)
  if (req.query.bathroom == "men") {
    men = new Date();
    men = new Date(men.getTime() + 1000*5);
  } else if (req.query.bathroom == "women") {
    women = new Date();
    women = new Date(women.getTime() + 1000*5); 
  }
  res.send("WC: occupied")
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  var dmChannel = message.channel;
  var response = "No entiendo lo que me quieres decir, por ahora sólo entiendo de baños :toilet:";  var now = new Date();
  var menState = (men > now ? "Ocupado ... :hankey:" : "Disponible");
  var womenState = (women > now ? "Ocupado ... :hankey:" : "Disponible");
  console.log(message)
  if(typeof message.text != "undefined"){
    var text = message.text.toUpperCase();
    
    wcWords.forEach(function(wcWord) {
      if(text.includes(wcWord)) {
        response = ":girl::skin-tone-2: : " + womenState +" \n" + ":boy::skin-tone-2: : " + menState + " \n";
        menWords.forEach(function(value) {
          if(text.includes(value)) {
            response = (men > now ? "El :toilet: de hombres está ocupado ... :hankey:" : "El :toilet: de hombres está disponible. ¡Corre! :runner::skin-tone-2:");
          }
        });
        womenWords.forEach(function(value) {
          if(text.includes(value)) {
            response = (women > now ? "El :toilet: de mujeres está ocupado ... :hankey:" : "El :toilet: de mujeres está disponible. ¡Corre! :dancer::skin-tone-2:");
          }
        });
      }
    });
    rtm.sendMessage(response, dmChannel);
  }
});

rtm.start();