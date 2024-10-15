import ReactApexChart from "react-apexcharts";

interface LineChartProps {
  colors: string[];
  xAxisLabel: string[];
  seriesData: {
    name: string;
    data: number[];
  }[];
  type?: "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "treemap"
  | "boxPlot"
  | "candlestick"
  | "radar"
  | "polarArea"
  | "rangeBar",
}
const LineChart = ({ colors, seriesData, xAxisLabel,type }: LineChartProps) => {
  const option2 = {
    series: seriesData,
  };

  return (
    <div className="h-full pt-5 pb-3" id="chart apexOuter">
      <ReactApexChart
        style={{
          display: "block",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          outerHeight:"100%"
        }}
        options={{
          chart: {
            id: "chart",
            toolbar: {
              show: false,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
                customIcons: [],
              },
            },
          },
          xaxis: {
            categories: xAxisLabel,
          },
          grid:{
            strokeDashArray:4
          },
          stroke: {
            curve: "straight",

            lineCap: "round",
            colors: colors,
            width: 2,
          },
          legend: {
            show: false,
            position: "top",
          },
        }}
        fill={colors}
        width={"95%"}
        height={400}
        series={option2.series}
        type={type}
      />
    </div>
  );
};

export default LineChart;
