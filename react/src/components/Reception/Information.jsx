import { Close, Edit, Info, Print } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import GenererPdf from "./GenererPdf";
import { ListItem } from "@material-ui/core";

const option = {
  month: "long",
  year: "numeric",
  day: "numeric",
};

function Information({ id }) {
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState([{}]);
  const [reception, setReception] = useState({});
  const [commande, setCommande] = useState([{}]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/reception_article/getByReception/${id}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setArticle(res.data);
            console.log(res.data);
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

  function getCommande(id) {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/commande_article/getByCommande/${id}`, {
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
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/reception/getById/${id}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setReception(res.data);
            getCommande(res.data.id_commande);
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
    <>
      <IconButton
        onClick={() => {
          handleClickOpen();
        }}
      >
        <Info />
      </IconButton>
      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle align="center">Information</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Typography variant="h6">Code de reception </Typography>
              <Typography>: {reception.id}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Typography variant="h6">Code de commande </Typography>
              <Typography>: {reception.id_commande}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Typography variant="h6">Date de création </Typography>
              <Typography>
                : {new Date(reception.date).toLocaleDateString("fr-FR", option)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Typography variant="h6">Saisie par </Typography>
              <Typography>: {reception.nom}</Typography>
            </Box>
          </Box>
          {article.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  width: "50%",
                }}
              >
                <Typography variant="h6">Date de livraison</Typography>
                <Typography>
                  :{" "}
                  {new Date(article[0].date_livraison).toLocaleDateString(
                    "fr-FR",
                    option
                  )}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  width: "50%",
                }}
              >
                <Typography variant="h6">Receptionniste</Typography>
                <Typography>: {reception.receptionniste}</Typography>
              </Box>
            </Box>
          ) : null}
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Typography variant="h6">Emplacement</Typography>
              <Typography>: {reception.emplacement}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Typography variant="h6">Fournisseur </Typography>
              <Typography>: {reception.fournisseur}</Typography>
            </Box>
          </Box>
          <Divider>
            <Typography variant="h5" align="left">
              Listes d'articles réçues
            </Typography>
          </Divider>
          <Box>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="medium"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bolder" }}>Code</TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }} align="right">
                      Description
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }} align="right">
                      Qté Demandé
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }} align="right">
                      Qté Commandé
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }} align="right">
                      Quantité reçue
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }} align="right">
                      Prix Unitaire
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {article.map((row) => {
                    var qte_commande = 0;
                    commande.map((item)=>{
                      //console.log(item.id_article+" "+row.id_article+" "+item.id+" "+reception.id_commande)
                      if(item.id_article==row.id_article && item.id==reception.id_commande){
                        qte_commande=item.quantite_commande;
                      }
                    })
                    return (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell scope="row">{row.id_article}</TableCell>
                        <TableCell component="th" align="right">
                          {row.description}
                        </TableCell>
                        <TableCell align="right">
                          {row.quantite_demande}
                        </TableCell>
                        <TableCell align="right">{qte_commande}</TableCell>
                        <TableCell align="right">{row.quantite_recu}</TableCell>
                        <TableCell align="right">{row.prix_unitaire}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" color="error" onClick={handleClose}>
              <Close /> Fermer
            </Button>
            <PDFDownloadLink
              document={<GenererPdf article={article} reception={reception} commande={commande}/>}
              fileName={`reception_${reception.id}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Loading"
                ) : (
                  <Button variant="contained">
                    <Print /> Imprimer en PDF
                  </Button>
                )
              }
            </PDFDownloadLink>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Information;
