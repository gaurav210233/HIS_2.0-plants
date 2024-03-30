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
    <>
      <Carousel className=" max-w-sm ml-[100px]">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
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
      </Carousel>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Device</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fill Device Details</DialogTitle>
            <DialogDescription>
              <DeviceSetupForm />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GDataCarousel;
