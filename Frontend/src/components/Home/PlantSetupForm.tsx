import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

const formSchema = z.object({
  plantName: z.string(),
  moisture: z.string().regex(/^\d+$/).transform(Number),
});

export default function PlantSetupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plantName: "",
      moisture: 0,
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="plantName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Plant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Plant Name" type="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="moisture"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Required Moisture Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Required Moisture Amount"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding plant..." : "Add Plant"}
          </Button>
        </form>
      </Form>
    </>
  );
}
