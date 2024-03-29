#include <Arduino.h>
#include <WiFi.h>
#include <custom_mqtt.h>
#include <wifi_setup.h>
#include <custom_dht.h>
#include <custom_soilMoist.h>

// My Includes
#include <secrets.h>

WiFiClient espClient;
CustomMqtt mqtt(espClient);

CustomDht mydht(DHTPIN, DHTTYPE);
CustomSoilMoist m1(MOISTURE_PIN_1);
CustomSoilMoist m2(MOISTURE_PIN_2);

#define SETUP_ID 1

int count = 0;
long currentTime, lastTime;
char messages[400];

void test(float &humidity, float &temperature, int &moistureLevel_1, int &moistureLevel_2)
{
    currentTime = millis();

    if(currentTime - lastTime > 2000 )
    {
        snprintf(messages, 500, "Temp: %ld   Hum: %ld\n Moisture-1: %d   Moisture-2: %d", temperature, humidity, moistureLevel_1, moistureLevel_2);
        Serial.println("Sending messages: ");
        Serial.println(messages);
        mqtt.publish(messages);
        lastTime = millis();
        Serial.println();
    }
}


void setup()
{
    Serial.begin(9600);

    WifiSetup::connect(ENV_WIFI_NAME, ENV_WIFI_PASSWORD);

    mqtt.setup(ENV_BROKER, ENV_PORT, ENV_OUTTOPIC, ENV_INTOPIC);
    mqtt._client.setCallback([](char *topic, byte *payload, unsigned int length){ 
        mqtt.callback(topic, payload, length); });

    mydht.begin();

    m1.begin();
    m2.begin();

}

void loop()
{
    mqtt.loop();

    float humidity = mydht.readHumidity();
    float temperature = mydht.readTemperature(); // degree celsius

    if (isnan(humidity) || isnan(temperature)) {
        Serial.println(F("Failed to read from DHT sensor!"));

        humidity = INT_MIN;
        temperature = INT_MIN;
    }

    int moistureLevel_1 = m1.readMoisture();
    int moistureLevel_2 = m2.readMoisture();

    delay(2000);

    test(humidity, temperature, moistureLevel_1, moistureLevel_2);
}
