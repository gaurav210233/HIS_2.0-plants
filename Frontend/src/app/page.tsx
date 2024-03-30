"use client";
import React, { useState, useEffect } from "react";
import GDataCarosel from "@/components/Home/GDataCarosel";
import PlantDataCarosel from "@/components/Home/PlantDataCarousel";

export interface PlantData {
  createdAt: string;
  MoistureLevel: number;
  PlantId: string;
}

export default function Home() {
  const [gData, setGData] = useState({
    humidity: 0,
    temperature: 0,
    setupName: "",
  });
  const [plantData, setPlantData] = useState<PlantData[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jjs2jkn0-3002.inc1.devtunnels.ms/api/v1/log/all"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      const gData = {
        humidity: data[data.length - 1].Humidity,
        temperature: data[data.length - 1].Temperature,
        setupName: data[data.length - 1].Id,
      };

      const plantDataArray = data.map(
        ({ createdAt, MoistureLevel, PlantId }) => ({
          createdAt,
          MoistureLevel,
          PlantId,
        })
      );

      setGData(gData);

      // Convert createdAt timestamps to hh:mm format
      const convertedPlantData = plantDataArray.map((item) => ({
        ...item,
        createdAt: convertToTimeFormat(item.createdAt),
      }));

      setPlantData(convertedPlantData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const convertToTimeFormat = (createdAt: string): string => {
    const date = new Date(createdAt);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <GDataCarosel
        temperature={gData.temperature}
        humidity={gData.humidity}
        setupName={gData.setupName}
      />
      <PlantDataCarosel plantData={plantData} />
    </>
  );
}
