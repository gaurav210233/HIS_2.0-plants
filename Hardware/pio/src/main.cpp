#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>

// My Includes
#include <secrets.h>

// Wifi credentials
const char* ssid = WIFI_NAME;
const char* password = WIFI_PASSWORD;

// MQTT
// const char* brokerUser = "";
// const char* brokerPass = "";
const char* broker = "broker.hivemq.com";
const char* outTopic = "/his2_mqtt/out";
const char* inTopic = "/his2_mqtt/in";

WiFiClient espClient;
PubSubClient client(espClient);

// Global Variables
// int count = 0;
// long currentTime, lastTime;
// char messages[50];


void setup_wifi() {
  delay(100);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection to ...");
    Serial.println(broker);

    if (client.connect("Gaurav_ESP32Client")) {
      Serial.println("Connected to");
      Serial.println(broker);
      client.subscribe(inTopic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(broker, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

//   currentTime = millis();

//   if(currentTime - lastTime > 2000)
//   {
//     count++;
//     snprintf(messages, 75, "Count: %ld", count);
//     Serial.print("Sending messages: ");
//     Serial.println(messages);
//     client.publish(outTopic, messages);
//     lastTime = millis();
//   }
}
