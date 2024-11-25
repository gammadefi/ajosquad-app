import React from "react";

interface HorizontalBarProps {
  data: {
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

export const HorizontalBarChart: React.FC<HorizontalBarProps> = ({ data }) => {
  // Calculate the total sum of the data
  const totalSum = data.datasets[0].data.reduce((sum, value) => sum + value, 0);

  return (
    <div className="" style={{margin: "2px auto" }}>
      <div className="h-[32px] border rounded-sm p-2 flex gap-1">
        {data.datasets[0].data.map((item, index) => {
          // Calculate the percentage width for each item
          const percentage = (item / totalSum) * 100;

          return (
            <div
              key={index}
              style={{
                backgroundColor: data.datasets[0].backgroundColor[index],
                width: `${percentage}%`, // Use the calculated percentage
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalBarChart;
