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
    <div className="dashboard" style={{ width: "90vw", height: "42vh" }}>
      <Line
        data={chartData}
        options={{
          aspectRatio: 1,
          maintainAspectRatio: true,
          responsive: true,
          scales: {
            y: {
              type: "linear",
              ticks: {
                callback: (value) => value.toFixed(0), // Use toFixed() instead of ticks.formatters.numeric
                stepSize: 10,
              },
              min: 0,
              max: 100,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Moisture Level Over Time",
              font: {
                size: 16,
              },
            },
            legend: {
              display: true,
              position: "bottom",
              labels: {
                font: {
                  size: 12,
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
