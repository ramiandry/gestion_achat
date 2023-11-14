import { Delete, Download, Edit, FileDownload } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modifier from "./Modifier";
const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    table: {
      width: "100%",
    },
    tableContainer: {
      borderRadius: 15,
      margin: "10px",
    },
    tableCell: {
      color:
        theme.palette.getContrastText(theme.palette.error.dark) + " !important",
      backgroundColor: theme.palette.error.dark,
      fontWeight: "bolder" + " !important",
      textTransform: "capitalize",
    },
  };
});

function Fournisseur({ data, setData }) {
  var theme = useTheme();
  var [dataCommande, setDataCommande] = useState([]);
  var [dataFournisseur, setDataFournisseur] = useState([]);
  const header = [
    "Code",
    "Nom",
    "Email",
    "Adresse",
    "N° Téléphone",
    "Nbr de commande envoyés",
    "Action",
  ];
  const classes = useStyles();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/fournisseur/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataFournisseur(res.data);
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
          .get(`http://127.0.0.1:8080/commande/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataCommande(res.data);
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

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ width: "95%", margin: "auto" }}
        className={classes.tableContainer}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {header.map((data) => (
                <TableCell align="left" className={classes.tableCell}>
                  {data}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFournisseur.map((data) => {
              return (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {data.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.nom}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.email}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {data.adresse}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {" "}
                    {data.tel}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {" "}
                    {
                      dataCommande.filter(
                        (item) => item.id_fournisseur == data.id
                      ).length
                    }
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton>
                      <Delete />
                    </IconButton>
                      <Modifier
                        fournisseur={data}
                        setData={setDataFournisseur}
                      />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Fournisseur;
