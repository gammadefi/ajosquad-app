import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import the type for options

interface BarGraphProps {
  data: {
    colors: string[];
    xAxisLabel: string[];
    seriesData: number[];
  };
}

const BarGraph = ({ data }: BarGraphProps) => {
  // Explicitly type the options object
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.xAxisLabel,
      labels:{
        style:{
          fontWeight:"700"
        }
      } // Set x-axis labels
    },
    yaxis: {
      labels: {
        show: false,
        offsetX: -15
      },
      title: {
        text: "No of Customers", // Y-axis title
        style: {
          color: "#fff",
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "90%", // Adjust bar width
        distributed: true, // Make each bar a unique color
        borderRadius: 4, // Rounded corners
        borderRadiusApplication:"end",
      },
    },
    dataLabels: {
      enabled: true, // Display values on bars
      style: {
        colors: ["#fff"], // Color for the labels
      },
    },
    grid: {
      show: false,
      padding: {
        left: -1,
        right: 0,
      },

    },
    colors: data.colors, // Set bar colors
    legend: {
      show: false, // Hide legend
    },
  };

  const series = [
    {
      name: "Customers",
      data: data.seriesData, // Single series data
    },
  ];

  return (
    <div className="h-full pt-5 pb-3">
      <ReactApexChart
        options={options} // Pass properly typed options
        series={series}
        type="bar"
        width="100%"
        height={250}
      />
    </div>
  );
};

export default BarGraph;
