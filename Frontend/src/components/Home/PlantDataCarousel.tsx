import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import PlantDataCard from "./Cards/PlantDataCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

interface PlantData {
  plantData: {
    createdAt: string;
    MoistureLevel: number;
    PlantId: string;
  }[];
}

export default function PlantDataCarousel({ plantData }: PlantData) {
  const plugin = React.useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  );
  const plantIds = React.useMemo(() => {
    const ids = new Set<string>();
    plantData.forEach((data) => {
      ids.add(data.PlantId);
    });
    return Array.from(ids);
  }, [plantData]);

  return (
    <div className="w-[100vw]">
      <Carousel
        plugins={[plugin.current]}
        className="w-[100%]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="w-full">
          {plantIds.map((id) => (
            <CarouselItem className="w-[100%]" key={id}>
              <div className="">
                <PlantDataCard
                  plantData={[
                    plantData.find((data) => data.PlantId === id) || {
                      createdAt: "",
                      MoistureLevel: 0,
                      PlantId: "",
                    },
                  ]}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
