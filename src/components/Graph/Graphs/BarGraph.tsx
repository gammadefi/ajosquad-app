import ReactApexChart from "react-apexcharts";

interface BarGraphProps {
  data: {
    colors: string[];
    xAxisLabel: string[];
    stacked: boolean;
    seriesData: {
      name: string;
      data: number[];
    }[];
  };
}
const BarGraph = ({ data }: BarGraphProps) => {
  const option = {
    series: data.seriesData,
  };

  return (
    <div className="h-full pt-5 pb-3" id="chart apexOuter">
      <ReactApexChart
        style={{
          display: "block",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        options={{
          chart: {
            id: "chart",
            stacked: data.stacked,
            sparkline:{
              enabled:false
            },
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
            categories: data.xAxisLabel,
          },
          yaxis: {
            labels: {
              show: false,
              offsetX: -15
            }
          },
          grid: {
            show: false,
            padding: {
              left: -1,
              right: 0,
            },

          },
          plotOptions:{
            bar: {
              columnWidth:"8px",
              barHeight:"90%",
              borderRadius:4,
              colors:{
                backgroundBarColors:["#DBCCE6"],
              }
            }
          },

          dataLabels:{
            enabled:false
          },

          legend: {
            show: false,
            position: "top",
          },
          colors: data.colors,
        }}
        width={"100%"}
        height={250}
        series={option.series}
        type="bar"
      />
    </div>
  );
};

export default BarGraph;
