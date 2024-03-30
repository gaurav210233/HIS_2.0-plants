import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GDataCard from "./Cards/GDataCard";
export interface DataProps {
  temperature: number;
  humidity: number;
  setupName: string;
}
const GDataCarousel = ({ temperature, humidity, setupName }: DataProps) => {
  console.log(temperature, humidity, setupName);
  return (
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
  );
};

export default GDataCarousel;
