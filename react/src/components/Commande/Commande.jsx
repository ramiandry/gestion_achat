import {
  CheckCircle,
  Delete,
  Download,
  Edit,
  FileDownload,
  Send,
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
import Modifier from "../Demande/Modifier";
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

function Commande({ data, setData }) {
  var theme = useTheme();
  const role = sessionStorage.getItem("role");
  var [dataCommande, setDataCommande] = useState([]);
  const header = [
    "Code",
    "date",
    "saisie par",
    "Debut paiement",
    "Nbr paiement",
    "Paiement",
    "Fournisseur",
    "Action",
  ];
  const classes = useStyles();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/commande/getAll`, {
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
  }, []);

  const send = (index, email) => {
    Swal.fire({
      title: `Etes-vous sûre d'envoyer cette email?`,
      text: `destinataire: ${email}`,
      icon: "question",
      padding: "3em",
      width: "600",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      denyButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://127.0.0.1:8080/email/send/${index}/${email}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire(`Email envoyer avec succès!`, "", "success");
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(`Verifier votre connexion!`, "", "error");
          });
      }
    });
  };

  const deleteDemande = (index) => {
    axios
      .delete(`http://localhost:8080/commande/delete/${index}`)
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
                    {new Date(data.date).toLocaleDateString("en-gb")}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.nom}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {new Date(data.date_paiement).toLocaleDateString("en-gb")}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {" "}
                    {data.nbr_paiement}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {" "}
                    {data.paiement}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {" "}
                    {data.fournisseur}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Information id={data.id} />
                    {role == 2 ? (
                      <IconButton
                        onClick={() => send(data.id, data.email_fournisseur)}
                      >
                        <Send />
                      </IconButton>
                    ) : null}
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

export default Commande;
