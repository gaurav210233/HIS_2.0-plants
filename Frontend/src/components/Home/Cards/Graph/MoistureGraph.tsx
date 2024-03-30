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
        label: "Real-Time Moisture Reading",
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
    const size = labels.length < 12 ? -labels.length : -12;
    const slicedLabels = labels.slice(size);
    const slicedValues = values.slice(size);

    setChartData({
      labels: slicedLabels,
      datasets: [{ ...chartData.datasets[0], data: slicedValues }],
    });
  }, [plantData]);

  return (
    <div className="dashboard" style={{ width: "90vw", height: "70vh" }}>
      <Line
        data={chartData}
        options={{
          aspectRatio: 2, // Adjust the aspect ratio for better appearance on mobile
          maintainAspectRatio: true, // Maintain aspect ratio
          responsive: true, // Resize when the container size changes
          plugins: {
            title: {
              display: true,
              text: "Moisture Level Over Time", // Graph title
              font: {
                size: 16, // Adjust font size for better visibility on mobile
              },
            },
            legend: {
              display: true,
              position: "bottom", // Legend position
              labels: {
                font: {
                  size: 12, // Adjust font size for better visibility on mobile
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
