import {
  CheckCircle,
  Delete,
  Download,
  Edit,
  FileDownload,
  Unpublished,
} from "@mui/icons-material";
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
import Information from "./Information";
import Swal from "sweetalert2";

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

function Demande({ data, setData }) {
  const role = sessionStorage.getItem("role");
  var theme = useTheme();
  const header = ["Code", "date", "saisie par", "Budget", "Quantité", "Action"];
  const classes = useStyles();
  const option = { day: "numeric", month: "long", year: "numeric" };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/demande/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
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
  };

  const editQuantite = (idDemande, value, res) => {
    Swal.fire({
      title: `Etes-vous sûre de ${res} cette demande?`,
      icon: "question",
      padding: "3em",
      width: "600",
      color: "#ff2525",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor:"#3085d6",
      cancelButtonColor:"#d33",
      confirmButtonText: "Oui",
      denyButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:8080/demande/editQuantite/${idDemande}`, {
            valideQuantite: value,
          })
          .then((result) => {
            console.log(result.data);
            getData();
            Swal.fire(`Demande ${res} !`, "", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const editBudget = (idDemande, value, res) => {
    Swal.fire({
      title: `Etes-vous sûre de ${res} cette demande?`,
      icon: "question",
      padding: "3em",
      width: "600",
      color: "#ff2525",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor:"#3085d6",
      cancelButtonColor:"#d33",
      confirmButtonText: "Oui",
      denyButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:8080/demande/editBudget/${idDemande}`, {
            valideBudget: value,
          })
          .then((response) => {
            console.log(response.data);
            getData();
            Swal.fire(`Demande ${res} !`, "", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const deleteDemande = (index) => {
    axios
      .delete(`http://localhost:8080/demande/delete/${index}`)
      .then((res) => {
        console.log(res.data);
        setData((data) => data.filter((data, key) => index !== data.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            {data.map((data) => {
              return (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {data.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {new Date(data.date).toLocaleDateString("fr-FR", option)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.username}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <Typography
                      sx={{
                        backgroundColor: data.budget
                          ? "green"
                          : data.budget == null
                          ? "grey"
                          : "red",
                        color: "white",
                        fontWeight: "bolder",
                        padding: "2px 10px",
                        borderRadius: 8,
                        width: "fit-content",
                      }}
                    >
                      {data.budget
                        ? "Validé"
                        : data.budget == null
                        ? "Pas de réponse"
                        : "Réfuse"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <Typography
                      sx={{
                        backgroundColor: data.quantite
                          ? "green"
                          : data.quantite == null
                          ? "grey"
                          : "red",
                        color: "white",
                        fontWeight: "bolder",
                        padding: "2px 10px",
                        borderRadius: 8,
                        width: "fit-content",
                      }}
                    >
                      {data.quantite
                        ? "validé"
                        : data.quantite == false
                        ? "Réfusé"
                        : "Pas de répone"}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Modifier id={data.id} />
                    {/*<IconButton onClick={()=>deleteDemande(data.id)}>
                      <Delete />
                      </IconButton>*/}
                    <Information id={data.id} />
                    {role == 2 && data.quantite == null && data.budget ? (
                      <>
                        <IconButton
                          color="success"
                          onClick={() => editQuantite(data.id, true, "valider")}
                        >
                          <CheckCircle />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() =>
                            editQuantite(data.id, false, "réfuser")
                          }
                        >
                          <Unpublished />
                        </IconButton>
                      </>
                    ) : null}

                    {role == 4 &&
                    (data.budget == null || data.quantite == null) ? (
                      <>
                        <IconButton
                          color="success"
                          onClick={() => editBudget(data.id, true, "valider")}
                        >
                          <CheckCircle />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => editBudget(data.id, false, "refuser")}
                        >
                          <Unpublished />
                        </IconButton>
                      </>
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TableFooter
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box marginRight={3}></Box>
        </TableFooter>
      </TableContainer>
    </div>
  );
}

export default Demande;
