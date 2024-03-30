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

  useEffect(() => {
    // Assuming the response structure is like { createdAt: string, moistureLevel: number }[]
    const labels = plantData.map((entry) => entry.createdAt);
    const values = plantData.map((entry) => entry.MoistureLevel);

    // Slice the last 12 entries
    const slicedLabels = labels.slice(-12);
    const slicedValues = values.slice(-12);

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
