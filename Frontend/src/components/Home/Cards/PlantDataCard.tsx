import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import Graph from "./Graph/MoistureGraph";
interface PlantData {
  plantData: {
    createdAt: string;
    MoistureLevel: number;
    PlantId: string;
  }[];
}
export default function PlantDataCard({ plantData }: PlantData) {
  return (
    <div>
      {plantData.map((data, index) => (
        <Card key={index} className="">
          <div className="flex justify-center">
            <span>Plant Name : {data.PlantId}</span>
          </div>
          <CardContent>
            <Graph plantData={[data]} />{" "}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
