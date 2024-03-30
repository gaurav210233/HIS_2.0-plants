import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import PlantDataCard from "./Cards/PlantDataCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";

interface PlantData {
  plantData: [
    {
      createdAt: string;
      MoistureLevel: number;
    }
  ];
}

export default function PlantDataCarosel({ plantData }: PlantData) {
  // console.log("hELLO", plantData);
  const plugin = React.useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  );

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className="mx-[100px]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <PlantDataCard plantData={plantData} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Button>Add a Plant</Button>
    </>
  );
}
