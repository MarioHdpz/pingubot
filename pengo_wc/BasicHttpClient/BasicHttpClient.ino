/**
 * BasicHTTPClient.ino
 *
 *  Created on: 24.05.2015
 *
 */

#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>

#define USE_SERIAL Serial

ESP8266WiFiMulti WiFiMulti;

void setup() {
    pinMode(LED_BUILTIN, OUTPUT); 
    USE_SERIAL.begin(115200);
   // USE_SERIAL.setDebugOutput(true);

    WiFiMulti.addAP("GUEST");
    WiFiMulti.addAP("Mario AP","holacrayola");
    WiFiMulti.addAP("TP-LINK_7E44","48010788");
}

void loop() {
    // wait for WiFi connection
    if((WiFiMulti.run() == WL_CONNECTED)) {

        HTTPClient http;

        USE_SERIAL.print("[HTTP] begin...\n");
        http.begin("http://173.255.221.68:2500/wc-set?bathroom=men"); //HTTP

        USE_SERIAL.print("[HTTP] GET...\n");
        // start connection and send HTTP header
        int httpCode = http.GET();

        // httpCode will be negative on error
        if(httpCode > 0) {
            // HTTP header has been send and Server response header has been handled
            USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);

            // file found at server
            if(httpCode == HTTP_CODE_OK) {
                String payload = http.getString();
                USE_SERIAL.println(payload);
                digitalWrite(LED_BUILTIN, LOW);
                delay(300);              
            }
        } else {
            USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }
        http.end();
    }
    digitalWrite(LED_BUILTIN, HIGH);
    delay(4700);
}

