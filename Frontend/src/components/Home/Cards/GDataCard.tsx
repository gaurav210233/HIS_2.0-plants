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
      <Card className="pb-[0] py-[1.5vh]">
        <CardContent className="pb-[0] leading-8">
          <span className="text-[2.7vh] ">Setup Name : {setupName}</span>
          <div className="">
            <div>
              <span className="text-[2.5vh]">
                Temperature : {temperature}°C
              </span>
            </div>
            <div>
              <span className="text-[2.5vh]">Humidity : {humidity}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GDataCard;
