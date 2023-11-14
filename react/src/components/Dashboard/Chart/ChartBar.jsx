import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useTheme } from '@mui/material/styles';
import axios from "axios";

function ChartBar({year}) {
  var [article,setArticle]=useState([])

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/reception_article/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setArticle(res.data);
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

  function data(mois) {
    const data=article.filter((item)=>new Date(item.date_reception).getMonth()==mois && new Date(item.date_reception).getFullYear()==year)
    return data.map(item=>item.quantite_recu).reduce((prev,curr)=>prev+curr,0)
  }
const theme = useTheme()
  var chart = {
    height: 95,
    options: {
      title: {
        text: "Total Article réçues "+(year==new Date().getFullYear()?"cette année":"en "+year),
        align: "center",
        style: {
          fontSize: "20pt",
          color:theme.palette.error.main
        }
      },
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Janv", "Fevr", "Mars", "Avri", "Mai", "Juin", "Juil", "Aout", "Sept","Oct","Nov","Dec"]
      }
    },
    series: [
      {
        name: "series-1",
        data: [data(0),data(1), data(2), data(3), data(4), data(5), data(6), data(7), data(8),data(9),data(10), data(11)]
      }
    ]
  };
  return (
    <>
      <Chart
        options={chart.options}
        series={chart.series}
        type="bar"
        width="98%"
        height={"90%"}
      />
    </>
  );
}

export default ChartBar;
