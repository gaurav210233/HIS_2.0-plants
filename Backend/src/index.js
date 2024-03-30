import express from "express";
import router from "./routes/route.js";
import mqtt from "mqtt";
import cors from "cors";
import { addLogViaMqtt } from "./controllers/units/query.js";
import { toggleMotor } from "./controllers/helper/helper.js";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/v1", router);


app.listen(3002, () => console.log("🚀 Server is running on port 3002"));

const client = mqtt.connect("mqtt://broker.hivemq.com");

const toEsp = "/his/in";
const fromEsp = "/his/out";

client.on("connect", () => {
  client.subscribe(fromEsp, (err) => {
    if (!err) {
      console.log("Connected to MQTT broker");
    } else {
      console.error("Error subscribing:", err);
    }
  });
});

// Handle MQTT message reception
client.on("message", async(topic, message) => {
  // console.log(message.toString());
  
  const res = message.toString();
  
  const data = JSON.parse(res);
  
  console.log("====================================");
  
  if ("CheckTemp" in data) {
    console.log(data);
    
    const rsl =await  toggleMotor(data);
    console.log(rsl)
    
    const response = {
      killSwitch : 0,
      MoistureLevel :rsl.MoistureLevel 
    }
    
    if (rsl.motorState) {
      // client.publish(toEsp,"----------------------------------")
      client.publish(toEsp, JSON.stringify(response));
    }
  } else {
    console.log(data);
    // addLogViaMqtt(data)
  }
});

app.patch("/kill",async(req,res)=>{
  const {data} = req.body
  // process the setup and prompt
  
  const response = {
    killSwitch : 1,
    MoistureLevel :0 
  }
  client.publish(toEsp, JSON.stringify(response));

  res.json({"status":"success"})
})





process.on("SIGINT", () => {
  client.end();
});
