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
  name: z.string().min(4),
  url: z.string().url(),
  password: z.string().min(3),
});

export default function DeviceSetupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");     try {
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
        form.reset();
      } else {
        setErrorMessage("Failed to submit the form. Please try again."); // Set error message for failed submission
        console.error("API request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again."); // Set a generic error message for unexpected errors
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      password: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Setup Name</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Setup Name"
                      type="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="align-left">URL</FormLabel>
                  <FormControl>
                    <Input required placeholder="URL" type="url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      required
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {errorMessage && (
            <div className="my-[2vh] text-[#FF0000]">{errorMessage}</div>
          )}{" "}
          {/* Display error message if there's any */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding device..." : "Add Device"}
          </Button>
        </form>
      </Form>
    </>
  );
}
