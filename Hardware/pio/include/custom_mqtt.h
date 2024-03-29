#ifndef CUSTOM_MQTT_H
#define CUSTOM_MQTT_H

#include <WiFi.h>
#include <PubSubClient.h>
#include <secrets.h>

#define BROKER ENV_BROKER
#define OUTTOPIC ENV_OUTTOPIC
#define INTOPIC ENV_INTOPIC

class CustomMqtt
{
public:
    CustomMqtt(WiFiClient& wifiClient);
    void setup(const char* broker, int port, const char* outTopic, const char* inTopic);
    void loop();
    void publish(const char* message);
    WiFiClient& _wifiClient;
    PubSubClient _client;
    void callback(char* topic, byte* payload, unsigned int length);
    static void callbackWrapper(char* topic, byte* payload, unsigned int length);
    void reconnect();
};

#endif // CUSTOM_MQTT_H
