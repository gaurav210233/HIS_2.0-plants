#include <Arduino.h>
#include <WiFi.h>
#include <secrets.h>
#include <PubSubClient.h>

#include <custom_dht.h>
#include <custom_soilMoist.h>
#include <ArduinoJson.h>

// My Includes
#include <secrets.h>

#define airVal1 3900 // calibrate it
#define waterVal1 1700 // 

#define airVal2 3000 // calibrate it
#define waterVal2 1000 // ---

CustomDht mydht(DHTPIN, DHTTYPE);
CustomSoilMoist m1(MOISTURE_PIN_1);
CustomSoilMoist m2(MOISTURE_PIN_2);

int count = 1;
int avg = 1;
int motor_state = 0; // 80%

int killSwitchState = 0;

WiFiClient espClient;
PubSubClient client(espClient);

char messages[50];

void setup_wifi()
{
  delay(100);
  Serial.print("\nConnecting to");
  Serial.println(ENV_WIFI_NAME);

  WiFi.begin(ENV_WIFI_NAME, ENV_WIFI_PASSWORD);

  while(WiFi.status() != WL_CONNECTED)
  {
    delay(100);
    Serial.print("- ");
  }

  Serial.print("\nConnected to");
  Serial.println(ENV_WIFI_NAME);
}

void reconnect()
{
  while(!client.connected())
  {
    Serial.print("\nConnecting to");
    Serial.println(ENV_BROKER);

    if(client.connect("gaurav"))
    {
      Serial.print("\nConnected to");
      Serial.println(ENV_BROKER);
      client.subscribe(ENV_INTOPIC);
    }
    else
    {
      Serial.print("\nTrying again in 5 secs");
      delay(5000);
    }
  }
}

void callback (char *topic, byte *payload, unsigned int length)
{
  Serial.print("Received Messages: ");
  Serial.println(topic);

  // Print the received message payload
  Serial.print("Payload: ");
  for(int i = 0; i< length; i++ )
  {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Parse JSON payload
  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, payload, length);

  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return;
  }

  killSwitchState = doc["killSwitch"];
  motor_state = doc["MoistureLevel"];

  Serial.print(killSwitchState);

  if(killSwitchState)
  {
    for(int i = 0; i < 5; i++)
    {
      digitalWrite(BUZZER, HIGH);
      delay(500);
      digitalWrite(BUZZER, LOW);
      delay(500);
    }
  }
  if(motor_state < 40 )
  {
    digitalWrite(BUZZER, HIGH);
    delay(1000);
    digitalWrite(BUZZER, LOW);
    delay(1000);
  }
  
  // // Echo back the received message
  // client.publish(ENV_OUTTOPIC, payload, length);
  
  // Serial.println("Echoed back the message");
}

void send(float &humidity, float &temperature, int &moistureLevel, int motor_state, int plant_id)
{
        // Create JSON object
    StaticJsonDocument<300> jsonDoc;

    // Populate JSON object with sensor data
    // jsonDoc["Id"] = currentTime + lastTime;
    jsonDoc["Id"] = SETUP_ID;
    jsonDoc["UserId"] = USER_ID;
    jsonDoc["WaterLevel"] = 100;
    jsonDoc["PlantId"] = plant_id;
    jsonDoc["MotorState"] = motor_state;
    jsonDoc["Humidity"] = humidity;
    jsonDoc["Temperature"] = temperature;
    jsonDoc["MoistureLevel"] = moistureLevel;

    // Serialize JSON object to string
    char jsonStr[300];
    serializeJson(jsonDoc, jsonStr);

        Serial.println("Sending messages: ");
        Serial.println(jsonStr);
       client.publish(ENV_OUTTOPIC, jsonStr);
        Serial.println();
  

    if(count > 12)
    {
        if((avg/12) < MOIST_THRES )
        {
            StaticJsonDocument<100> jsonDocAsk;

            jsonDocAsk["CheckTemp"] = 1;
            jsonDocAsk["MoistureLevel"] = moistureLevel;
            jsonDocAsk["Temperature"] = temperature;

            char jsonStrAsk[100];
        serializeJson(jsonDocAsk, jsonStrAsk);

        Serial.println("Sending messages for review: ");
        Serial.println(jsonStrAsk);
        client.publish(ENV_OUTTOPIC, jsonStrAsk);
        Serial.println();
        }
        count = 1;
        avg = 0;
    }

    avg += moistureLevel;
    count++;

 }

void get()
{
    float humidity = mydht.readHumidity();
    float temperature = mydht.readTemperature(); // degree celsius

    if (isnan(humidity) || isnan(temperature)) {
        Serial.println(F("Failed to read from DHT sensor!"));

        humidity = INT_MIN;
        temperature = INT_MIN;
    }

    int moistureLevel_1 = m1.readMoisture();
    int moistureLevel_2 = m2.readMoisture();

    int moisturePerc1 = map(moistureLevel_1 , airVal1, waterVal1, 0, 100);
    int moisturePerc2 = map(moistureLevel_2 , airVal2, waterVal2, 0, 100);

    if(moisturePerc1 < 0) moisturePerc1 = 0;
    if(moisturePerc2 < 0) moisturePerc2 = 0;

    if(moisturePerc1 > 100) moisturePerc1 = 100;
    if(moisturePerc2 > 100) moisturePerc2 = 100;

    
    // delay(10000);
    send(humidity, temperature, moisturePerc1, motor_state, 1);
    // delay(10000);
    send(humidity, temperature, moisturePerc2, motor_state, 2);
}

unsigned long lastPublishTime = 0;
const unsigned long publishInterval = 5000; // 5 seconds interval


void setup()
{
  Serial.begin(115200);
  setup_wifi();
  client.setServer(ENV_BROKER, ENV_PORT);
  client.setCallback(callback);

  mydht.begin();

    m1.begin();
    m2.begin();
}

void loop()
{
  if(!client.connected())
  {
    reconnect();
  }
  client.loop();

  unsigned long currentTime = millis();
  if (currentTime - lastPublishTime >= publishInterval) {
  // Publish data every 5 seconds
  get();
  lastPublishTime = currentTime;
  }
  // currentTime = millis();
  // if(currentTime - lastTime > 2000) // 10 seconds
  // {
  //   count++;
  //   snprintf(messages, 75, "%ld", count);
  //   Serial.print("Sending Messages");
  //   Serial.println(messages);
  //   client.publish(ENV_OUTTOPIC, messages);
  //   lastTime = millis();
  // }
}