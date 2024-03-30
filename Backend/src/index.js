import express from "express";
import router from "./routes/route.js";
import mqtt from "mqtt";
import cors from 'cors'
import { addLogViaMqtt } from "./controllers/units/query.js";

// import { ConnectMqtt } from "./controllers/mqtt/mqtt.js";
const client = mqtt.connect("mqtt://broker.hivemq.com");

const toEsp = "/his2_mqtt/in";
const fromEsp = "/his2_mqtt/out";

const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/v1", router);

app.listen(3000, () => console.log("🚀 Server is running on port 3000"));
client.on("connect", () => {
  //subscribe to the topic
  client.subscribe(fromEsp, (err) => {
    if (!err) {
      console.log("Connected to MQTT broker");
    } else {
      console.error("Error subscribing:", err);
    }
  });
});

client.on("message", (topic, message) => {
  
const res   = message.toString();
  // console.log(JSON.parse(res));
  const data =JSON.parse(res);

  console.log(data)
  addLogViaMqtt(data)



});

client.publish(toEsp, "hi");

process.on("SIGINT", () => {
  client.end();
});


// ConnectMqtt();


