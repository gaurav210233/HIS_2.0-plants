import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";

interface DataProps {
  temperature: number;
  humidity: number;
}

const initialData: DataProps = {
  humidity: 0,
  temperature: 0,
};

const GDataCard: React.FC = () => {
  // const [data, setData] = useState<DataProps | null>(null);
  const [data, setData] = useState<DataProps>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<number>(Date.now());

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // const response = await fetch("/api/data");
      // const data: DataProps = await response.json();
      const newData: DataProps = {
        humidity: data.humidity + 1,
        temperature: data.temperature + 1,
      };
      setData(newData);
      setLastRefreshed(Date.now()); // Update lastRefreshed when data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastRefresh = Date.now() - lastRefreshed;
      if (timeSinceLastRefresh >= 2000) {
        fetchData();
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [lastRefreshed]);

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { temperature, humidity } = data;

  return (
    <div>
      <Card>
        <CardContent className="flex gap-1">
          <div>
            <div>
              <span>Temperature</span>
            </div>
            <div>
              <h1>{temperature}°C</h1>
            </div>
          </div>
          <div>
            <div>
              <span>Humidity</span>
            </div>
            <div>
              <h1>{humidity}%</h1>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button onClick={handleRefresh}>Refresh Data</Button>
    </div>
  );
};

export default GDataCard;
