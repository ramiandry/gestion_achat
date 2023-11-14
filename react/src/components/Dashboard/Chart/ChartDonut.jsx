import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

function ChartDonut({ year }) {
  var [data, setData] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/demande/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setData(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };
    fetchData();
    return () => {
      source.cancel();
    };
  }, []);
  const theme = useTheme();
  var chart = {
    height: 95,
    options: {
      chart: {
        id: "support-chart",
        sparkline: {
          enabled: true,
        },
      },
      fill: {
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      title: {
        text: "Demande "+(year==new Date().getFullYear()?"cette année":"en "+year),
        align: "center",
        style: {
          fontSize: "20pt",
          fontFamily: "arial",
        },
      },
      legend: {
        show: true,
        position: "bottom",
        customLegendItems: ["Validé", "Refusé", "Non verifié"],
      },
      colors: [theme.palette.primary.main, theme.palette.error.main, "#A7B6C8"],
    },

    series: [
      data.filter(
        (data) =>
          data.budget == true &&
          data.quantite == true &&
          new Date(data.date).getFullYear() == year
      ).length,
      data.filter(
        (data) =>
          (data.budget == false || data.quantite == false) &&
          new Date(data.date).getFullYear() == year
      ).length,
      data.filter(
        (data) =>
          (data.budget == null || (data.budget==true && data.quantite == null)) &&
          new Date(data.date).getFullYear() == year
      ).length,
    ],
  };
  return (
    <div>
      <Chart
        options={chart.options}
        series={chart.series}
        type="donut"
        width="100%"
      />
    </div>
  );
}

export default ChartDonut;
