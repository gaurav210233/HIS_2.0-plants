import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import Graph from "./Graph/MoistureGraph";
interface PlantData {
  plantData: [
    {
      createdAt: string;
      MoistureLevel: number;
    }
  ];
}
export default function PlantDataCard({ plantData }: PlantData) {
  console.log(plantData);
  return (
    <div>
      <Card className="h-[65vh] w-[60vw]">
        <CardContent>
          <span>Plant Name : Plant 1</span>
          <Graph plantData={plantData} />
        </CardContent>
      </Card>
    </div>
  );
}
