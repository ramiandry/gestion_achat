import { ListAlt, ProductionQuantityLimits } from "@mui/icons-material";
import { Button, ButtonGroup, Icon, List, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import React, { Component, useState } from "react";
import Chart from "react-apexcharts";
function CardChart({ titre, color, icon, nombre, data, year }) {
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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#FFFFFF"],
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: "Ticket ",
        },
        marker: {
          show: false,
        },
        tooltip: {
          theme: "light",
        },
      },
      fill: {
        colors: ["#FFFFFF"],
      },
      xaxis: {
        categories: [
          "Janv",
          "Fevr",
          "Mars",
          "Avri",
          "Mai",
          "Juin",
          "Jull",
          "Aout",
          "Sept",
          "Octo",
          "Nov",
          "Dec",
        ],
      },
    },

    series: [
      {
        name: "series-1",
        data: data,
      },
    ],
  };

  return (
    <Box
      width="350px"
      height="120px"
      bgcolor={color}
      borderRadius="20px"
      margin={2}
      padding={1}
    >
      <Box display="flex" justifyContent="space-around">
        <Box>
          <Typography variant="h6" color="white">
            {titre}
          </Typography>
        </Box>
        <Box>
          <Button variant="text" color="inherit">
            {year.getFullYear() == new Date().getFullYear()
              ? "Cette année"
              : "ANNEE " + year.getFullYear()}
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddinX="20px"
      >
        <Box sx={{ color: "white", textAlign: "center" }} width="50%">
          {icon}
          <Typography>{nombre}</Typography>
        </Box>
        <Box
          sx={{
            paddingTop: "5px",
            "& .apexcharts-series-area": {
              fill: "#FFFFFF !important",
            },
          }}
        >
          <Chart
            options={chart.options}
            series={chart.series}
            type="line"
            width="120px"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CardChart;
