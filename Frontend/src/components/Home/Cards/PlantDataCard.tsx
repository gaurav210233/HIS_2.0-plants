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
      <Card className="h-[65vh] w-[60vw]">
        <CardContent>
          <span>Plant Name : {plantData[0].PlantId}</span>
          <Graph plantData={plantData} />
        </CardContent>
      </Card>
    </div>
  );
}
