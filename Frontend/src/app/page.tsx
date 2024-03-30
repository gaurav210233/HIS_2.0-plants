"use client";
import React, { useState, useEffect } from "react";
import GDataCarosel from "@/components/Home/GDataCarosel";
import PlantDataCarosel from "@/components/Home/PlantDataCarousel";

export interface plantDataInterface {
  createdAt: string;
  MoistureLevel: 0;
}
[];

export default function Home() {
  const [gData, setGData] = useState({
    humidity: 0,
    temperature: 0,
    setupName: "",
  });
  const [plantData, setPlantData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jjs2jkn0-3000.inc1.devtunnels.ms/api/v1/log/all"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      const gData = {
        humidity: data[data.length - 1].Humidity,
        temperature: data[data.length - 1].Temperature,
        setupName: data[data.length - 1].Id,
      };``

      const plantDataArray = data.map(({ createdAt, MoistureLevel }) => ({
        createdAt,
        MoistureLevel,
      }));

      setGData(gData);
      console.log(gData);
      setPlantData(plantDataArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(plantData);
  }, [plantData]);
  // Function to update plantData

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
