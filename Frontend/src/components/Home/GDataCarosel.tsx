import React, { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import
//   Drawer,
// DrawerClose,
// DrawerContent,
// DrawerDescription,
// DrawerFooter,
// DrawerHeader,
// DrawerTitle,
// DrawerTrigger,
// "@/components/ui/drawer";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import GDataCard from "./Cards/GDataCard";
import { Button } from "../ui/button";
import DeviceSetupForm from "./DeviceSetupForm";
export interface DataProps {
  temperature: number;
  humidity: number;
  setupId: string;
  setupName: string;
}
const GDataCarousel = ({ temperature, humidity, setupName }: DataProps) => {
  // console.log(temperature, humidity, setupName);
  const handleSubmit = async () => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

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
    <div >
      <div className="flex justify-center mb-[1vh] mx-[2vw]">
        <h1 className="text-[3.5vh] text-[black]">Setup Devices</h1>
      </div>
      <GDataCard
        setupId=""
        temperature={temperature}
        humidity={humidity}
        setupName={setupName}
      />
      {/* <Carousel className=" max-w-sm ml-[100px]">
        <CarouselContent>
          {Array.from({ length: 1 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <GDataCard
                  temperature={temperature}
                  humidity={humidity}
                  setupName={setupName}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
      {/* <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select the Device Name" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="dark"></SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select> */}
    </div>
  );
};

export default GDataCarousel;
