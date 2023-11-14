import React from "react";
import CardChart from "../Dashboard/Chart/CardChart";
import { Box, Typography } from "@mui/material";
import ChartBar from "../Dashboard/Chart/ChartBar";
import ChartDonut from "../Dashboard/Chart/ChartDonut";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "@mui/material/styles";
import {
  ListAlt,
  ProductionQuantityLimits,
  DeliveryDining,
} from "@mui/icons-material";
import CardProgress from "../Dashboard/Chart/CardProgress";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Analyse({ data }) {
  const theme = useTheme();
  var [commande, setCommande] = useState([]);
  var [livraison, setLivraison] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date());

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/livraison/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setLivraison(res.data);
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/commande/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setCommande(res.data);
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

  const commandeChart = (month) => {
    return commande.filter(
      (item) =>
        new Date(item.date).getMonth() == month &&
        new Date(item.date).getFullYear() == selectedYear.getFullYear()
    ).length;
  };

  const livraisonChart = (month) => {
    return livraison.filter(
      (item) =>
        new Date(item.date).getMonth() == month &&
        new Date(item.date).getFullYear() == selectedYear.getFullYear()
    ).length;
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "70%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
            }}
          >
            <Typography sx={{ marginX: "20px" }}>
              Selectionner une année:{" "}
            </Typography>
            <DatePicker
              selected={selectedYear}
              onChange={handleYearChange}
              dateFormat="yyyy"
              showYearPicker
              showMonthDropdown={false}
              scrollableYearDropdown
              yearDropdownItemNumber={10}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <CardChart
              titre="Total commande"
              year={selectedYear}
              color={theme.palette.error.main}
              nombre={
                commande.filter(
                  (item) =>
                    new Date(item.date).getFullYear() ==
                    selectedYear.getFullYear()
                ).length
              }
              data={[
                commandeChart(0),
                commandeChart(1),
                commandeChart(2),
                commandeChart(3),
                commandeChart(4),
                commandeChart(5),
                commandeChart(6),
                commandeChart(7),
                commandeChart(8),
                commandeChart(9),
                commandeChart(10),
                commandeChart(11),
              ]}
              icon={<ProductionQuantityLimits />}
            />
            <CardChart
              titre="Total livraison"
              color={theme.palette.primary.main}
              year={selectedYear}
              nombre={
                livraison.filter(
                  (item) =>
                    new Date(item.date).getFullYear() ==
                    selectedYear.getFullYear()
                ).length
              }
              data={[
                livraisonChart(0),
                livraisonChart(1),
                livraisonChart(2),
                livraisonChart(3),
                livraisonChart(4),
                livraisonChart(5),
                livraisonChart(6),
                livraisonChart(7),
                livraisonChart(8),
                livraisonChart(9),
                livraisonChart(10),
                livraisonChart(11),
              ]}
              icon={<DeliveryDining />}
            />
          </Box>
          <Box
            sx={{
              width: "98%",
              border: "1px solid red",
              borderRadius: "20px",
              height: "52vh",
              paddingTop: "2%",
            }}
          >
            <ChartBar year={selectedYear.getFullYear()} />
          </Box>
        </Box>

        <Box
          sx={{
            width: "30%",
            border: "1px solid red",
            borderRadius: "20px",
            height: "81vh",
          }}
        >
          <ChartDonut data={data} year={selectedYear.getFullYear()} />
          <CardProgress
            valeur={(
              (data.filter(
                (data) =>
                  data.budget == true &&
                  data.quantite == true &&
                  new Date(data.date).getFullYear() ==
                    selectedYear.getFullYear()
              ).length /
                data.filter(
                  (item) =>
                    new Date(item.date).getFullYear() ==
                    selectedYear.getFullYear()
                ).length) *
              100
            ).toFixed()}
            couleur="primary"
            titre="Demande validé"
          />
          <CardProgress
            valeur={(
              (data.filter(
                (data) =>
                  (data.budget == false || data.quantite == false) &&
                  new Date(data.date).getFullYear() ==
                    selectedYear.getFullYear()
              ).length /
                data.filter(
                  (item) =>
                    new Date(item.date).getFullYear() ==
                    selectedYear.getFullYear()
                ).length) *
              100
            ).toFixed()}
            couleur="error"
            titre="Demande réfusé"
          />
          <CardProgress
            valeur={(
              (data.filter(
                (data) =>
                  (data.budget == null ||(data.budget==true && data.quantite == null)) &&
                  new Date(data.date).getFullYear() ==
                    selectedYear.getFullYear()
              ).length /
                data.filter(
                  (item) =>
                    new Date(item.date).getFullYear() ==
                    selectedYear.getFullYear()
                ).length) *
              100
            ).toFixed()}
            couleur="inherit"
            titre="Demande non vérifié"
          />
        </Box>
      </Box>
    </div>
  );
}

export default Analyse;
