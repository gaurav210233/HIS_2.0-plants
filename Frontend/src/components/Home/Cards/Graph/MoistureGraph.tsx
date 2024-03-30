import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PlantData {
  plantData: {
    createdAt: string;
    MoistureLevel: number;
    PlantID: string;
  }[];
}

export default function Graph({ plantData }: PlantData) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Real-time Data",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });
  console.log(plantData);
  useEffect(() => {
    // Assuming the response structure is like { createdAt: string, moistureLevel: number }[]
    const labels = plantData.map((entry) => entry.createdAt);
    const values = plantData.map((entry) => entry.MoistureLevel);

    // Slice the last 12 entries
    const size = labels.length < 12 ? -labels.length : -12;
    const slicedLabels = labels.slice(size);
    const slicedValues = values.slice(size);
    // console.log(slicedValues);
    setChartData({
      labels: slicedLabels,
      datasets: [
        {
          ...chartData.datasets[0],
          data: slicedValues,
        },
      ],
    });
  }, [plantData]);

  return (
    <div className="dashboard">
      <Line data={chartData} />
    </div>
  );
}
