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

    String message;
    for (int i = 0; i < length; i++)
    {
        message += (char)payload[i];
    }

    // Convert string to an integer
    int value = message.toInt();

    // Check if the value is between 0 and 100
    if (value >= 0 && value <= 100) {
        Serial.print("Received value: ");
        Serial.println(value);
    } else {
        Serial.println("Invalid value received!");
    }
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
            _client.subscribe(ENV_INTOPIC);
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

