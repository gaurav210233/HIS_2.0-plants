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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PlantSetupForm from "./PlantSetupForm";
import { DialogClose } from "@radix-ui/react-dialog";

interface PlantData {
  plantData: [
    {
      createdAt: string;
      MoistureLevel: number;
      PlantId: string;
    }
  ];
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
    return Array.from(ids).reverse();
  }, [plantData]);

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className="mx-[100px]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {plantIds.map((id) => (
            <CarouselItem key={id}>
              <div className="p-1">
                <PlantDataCard
                  plantData={plantData.filter((data) => data.PlantId === id)}
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
          <Button variant="outline">Add Plant/Crop</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fill Device Details</DialogTitle>
            <DialogDescription>
              <PlantSetupForm />
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
      </Dialog>{" "}
    </>
  );
}
