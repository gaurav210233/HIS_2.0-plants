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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import GDataCard from "./Cards/GDataCard";
import { Button } from "../ui/button";
import DeviceSetupForm from "./DeviceSetupForm";
export interface DataProps {
  temperature: number;
  humidity: number;
  setupName: string;
}
const GDataCarousel = ({ temperature, humidity, setupName }: DataProps) => {
  console.log(temperature, humidity, setupName);
  return (
    <div className="mt-[2vh] mx-[3vw]">
      <div className="flex justify-center mb-[1vh] mx-[2vw]">
        <h1 className="text-[3.5vh] text-[black]">Setup Devices</h1>
      </div>
      <GDataCard
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
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="my-[2vh]" variant="outline">
              Add Device
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Fill Device Details</DialogTitle>
              <DialogDescription>
                <DeviceSetupForm />
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-start">
              {/* <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <Button className="mx-[2vw] bg-red-900 onClick">Fail Safe</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
            </DialogHeader>

            <DialogClose asChild>
              <Button type="button" variant="secondary">
                
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Yes
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GDataCarousel;
