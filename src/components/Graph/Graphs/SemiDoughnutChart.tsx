import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const defaultColors = {
  green: "#4BC769",
  orange: "#F5BA42",
  red: "#EA4C37",
  blue: "#183B6B",
};

interface IChartProps {
  datasets: { label: string; data: number[]; backgroundColor: string[] }[];
}

export function SemiDoughnutChart({ datasets }: IChartProps) {
  return (
    <div className="chart-container w-[80%] md:w-[244px]">
      <Doughnut
        data={{
          labels: [],
          datasets: datasets,
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          rotation: -90, // Start angle
          circumference: 180, // Semi-circle
          cutout: "60%", // Adjust the size of the inner circle
          maintainAspectRatio: false, // Allow flexibility in aspect ratio
          responsive: true, // Make the chart responsive
        }}
      />
    </div>
  );
}
