import React from "react";
import Chart from "apexcharts";
import ReactApexChart from "react-apexcharts";

function ChartLine() {
  /*var chart = {
    series: [
      {
        name: "South",
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          20,
          {
            min: 10,
            max: 60,
          }
        ),
      },
      {
        name: "North",
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          20,
          {
            min: 10,
            max: 20,
          }
        ),
      },
      {
        name: "Central",
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          20,
          {
            min: 10,
            max: 15,
          }
        ),
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min));
          },
        },
      },
      colors: ["#008FFB", "#00E396", "#CED4DC"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      xaxis: {
        type: "datetime",
      },
    },
  };*/

  return (
    <>
      <div id="chart">
{/*<ReactApexChart
          options={chart.options}
          series={chart.series}
          type="area"
          height={350}
  />*/}
      </div>
    </>
  );
}

export default ChartLine;
