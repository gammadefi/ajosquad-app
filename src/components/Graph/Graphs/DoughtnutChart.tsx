import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultColors = {
  green: "#4BC769",
  orange: "#F5BA42",
  red: "#EA4C37",
  blue: "#183B6B",
};

interface IChartProps {
  datasets: { label: string; data: number[]; backgroundColor: string[] }[];
}

export function DoughnutChart({ datasets }: IChartProps) {
  return (
    <Doughnut
      data={{
        labels: [],
        datasets: datasets,
      }}
    />
  );
}
