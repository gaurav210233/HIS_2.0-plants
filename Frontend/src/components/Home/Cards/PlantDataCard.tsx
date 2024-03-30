import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import Graph from "./Graph/MoistureGraph";
interface PlantData {
  plantData: [
    {
      createdAt: string;
      MoistureLevel: number;
      PlantId: string;
    }
  ];
}
export default function PlantDataCard({ plantData }: PlantData) {
  console.log(plantData);
  return (
    <div>
      <Card className="">
        <div className="flex justify-center">
          <span>Plant Name : {plantData[0].PlantId}</span>
        </div>
        <CardContent>
          <Graph plantData={plantData} />
        </CardContent>
      </Card>
    </div>
  );
}
