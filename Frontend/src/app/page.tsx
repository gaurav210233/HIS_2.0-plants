"use client";
import React, { useState, useEffect } from "react";
import GDataCarosel from "@/components/Home/GDataCarosel";
import PlantDataCarousel from "@/components/Home/PlantDataCarousel";
import dynamic from "next/dynamic";

const Drawer = dynamic(
  () => import("@/components/ui/drawer").then((module) => module.Drawer),
  { ssr: false }
);
const DrawerContent = dynamic(
  () => import("@/components/ui/drawer").then((module) => module.DrawerContent),
  { ssr: false }
);
const DrawerClose = dynamic(
  () => import("@/components/ui/drawer").then((module) => module.DrawerClose),
  { ssr: false }
);
const DrawerDescription = dynamic(
  () =>
    import("@/components/ui/drawer").then((module) => module.DrawerDescription),
  { ssr: false }
);
const DrawerHeader = dynamic(
  () => import("@/components/ui/drawer").then((module) => module.DrawerHeader),
  { ssr: false }
);
const DrawerTitle = dynamic(
  () => import("@/components/ui/drawer").then((module) => module.DrawerTitle),
  { ssr: false }
);
const DrawerTrigger = dynamic(
  () => import("@/components/ui/drawer").then((module) => module.DrawerTrigger),
  { ssr: false }
);

import { Button } from "@/components/ui/button";
import DeviceSetupForm from "@/components/Home/DeviceSetupForm";

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
  const [plantData, setPlantData] = useState<
    [{ createdAt: string; MoistureLevel: number; PlantId: string }]
  >([
    {
      createdAt: "",
      MoistureLevel: 0,
      PlantId: "",
    },
  ]);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // console.log("Hello", plantData);
  }, [plantData]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jjs2jkn0-3000.inc1.devtunnels.ms/api/v1/log/all"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const latestData = data[data.length - 1];

      const gData = {
        humidity: latestData.Humidity.toFixed(0),
        temperature: latestData.Temperature.toFixed(0),
        setupName: latestData.Id,
      };

      setGData(gData);

      const convertedPlantData = data.map((item: PlantData) => ({
        ...item,
        createdAt: convertToTimeFormat(item.createdAt),
      }));
      // console.log(convertedPlantData);

      setPlantData(convertedPlantData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const convertToTimeFormat = (createdAt: string): string => {
    const date = new Date(createdAt);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleFailSafeClick = async () => {
    try {
      const setupId = gData.setupName;
      const response = await fetch(
        "https://jjs2jkn0-3000.inc1.devtunnels.ms/kill",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ setupId }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("API response:", responseData);
      } else {
        console.error("API request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-[2vh] mx-[3vw]">
      <GDataCarosel
        temperature={gData.temperature}
        humidity={gData.humidity}
        setupName={gData.setupName}
      />
      <div className="flex gap-6">
        <Drawer>
          <DrawerTrigger>
            <Button className="my-[2vh]" variant="outline">
              Add Device
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Fill Device Details</DrawerTitle>
              <DrawerDescription>
                <DeviceSetupForm />
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger>
            <Button
              className="my-[2vh] bg-red-900 hover:bg-red-900"
              onClick={handleFailSafeClick}
            >
              Fail Safe
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are You Sure?</DrawerTitle>
            </DrawerHeader>
            <DrawerClose className="mx-[2vh]">
              <Button className="bg-red-900">Yes</Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
      <PlantDataCarousel plantData={plantData} />
      <Drawer>
        <DrawerTrigger>
          <Button className="my-[2vh]" variant="outline">
            Add Plant/Crop
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Fill Device Details</DrawerTitle>
            <DrawerDescription>
              <DeviceSetupForm />
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
