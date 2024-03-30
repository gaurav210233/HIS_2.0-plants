import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { DataProps } from "../GDataCarosel";

const GDataCard: React.FC<DataProps> = ({
  temperature,
  humidity,
  setupName,
}) => {
  return (
    <div>
      <Card>
        <CardContent className="m-[1vh]">
          <span className="text-[2vh] ">Setup Name : {setupName}</span>
          <div className="">
            <div>
              <span>Temperature : {temperature}°C</span>
            </div>
            <div>
              <span>Humidity : {humidity}%</span>
              <h1></h1>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GDataCard;
