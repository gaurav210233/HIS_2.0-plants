#include "custom_mqtt.h"

CustomMqtt::CustomMqtt(WiFiClient &wifiClient) : _wifiClient(wifiClient), _client(wifiClient) {}

void CustomMqtt::setup(const char *broker, int port, const char *outTopic, const char *inTopic)
{
    _client.setServer(broker, port);
    _client.setCallback([this](char *topic, byte *payload, unsigned int length)
                        { this->callback(topic, payload, length); });
}

void CustomMqtt::loop()
{
    if (!_client.connected())
    {
        reconnect();
    }
    _client.loop();
}

void CustomMqtt::publish(const char *message)
{
    _client.publish(OUTTOPIC, message);
}

void CustomMqtt::callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }
    Serial.println();
}

void CustomMqtt::reconnect()
{
    while (!_client.connected())
    {
        Serial.print("Attempting MQTT connection to ...");
        Serial.println(BROKER);

        if (_client.connect("HIS_2.0_ESP32Client"))
        {
            Serial.println("Connected to");
            Serial.println(BROKER);
            _client.subscribe(INTOPIC);
        }
        else
        {
            Serial.print("failed, rc=");
            Serial.print(_client.state());
            Serial.println(" try again in 5 seconds");
            delay(5000);
        }
    }
}