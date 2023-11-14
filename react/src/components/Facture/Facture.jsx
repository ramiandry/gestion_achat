import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { FileDownload, PictureAsPdf } from "@mui/icons-material";

import GenererPdf from "./GenererPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row, article } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  var [dataReception, setDataReception] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/reception_article/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataReception(res.data);
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
  console.log(row);
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell align="center">
          {new Date(row.date).toLocaleDateString("fr-FR")}
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.fournisseur}
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.nom}
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.reçeptionist}
        </TableCell>
        <TableCell align="center">{row.id_commande}</TableCell>
        <TableCell align="center">{row.id_reception}</TableCell>
        <TableCell align="center">
          <PDFDownloadLink
            document={<GenererPdf row={row} />}
            fileName="facture.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading"
              ) : (
                <IconButton>
                  <FileDownload />
                </IconButton>
              )
            }
          </PDFDownloadLink>
        </TableCell>
      </TableRow>
      <TableRow style={{ width: "100%" }}>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
          colSpan={9}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} width={"100%"}>
              <Box>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
              </Box>
              <Table size="small" aria-label="purchases" sx={{ width: "100%" }}>
                <TableHead>
                  <TableRow sx={{ fontWeight: "bolder" }}>
                    <TableCell sx={{ fontWeight: "bolder" }}>code</TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }} align="right">
                      Prix Unitaire
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }} align="right">
                      Réçu
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bolder" }}>TVA</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                      Prix Total sans TVA (MGA)
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                      Prix Total avec TVA (MGA)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {article.map((article) => (
                    <TableRow key={article.id_article}>
                      <TableCell component="th" scope="row">
                        {article.id_article}
                      </TableCell>
                      <TableCell>{article.description}</TableCell>
                      <TableCell align="right">
                        {article.prix_unitaire}
                      </TableCell>
                      <TableCell align="right">
                        {dataReception
                          .filter(
                            (data) =>
                              article.id_article == data.id_article &&
                              article.id_reception == data.id_reception
                          )
                          .map((item) => item.quantite_recu)}
                      </TableCell>
                      <TableCell align="right">{article.tva}</TableCell>
                      <TableCell align="right">
                        {dataReception
                          .filter(
                            (data) =>
                              article.id_article == data.id_article &&
                              article.id_reception == data.id_reception
                          )
                          .map((item) => item.quantite_recu) *
                          article.prix_unitaire}
                      </TableCell>
                      <TableCell align="right">
                        {(article.prix_unitaire / article.tva +
                          article.prix_unitaire) *
                          dataReception
                            .filter(
                              (data) =>
                                article.id_article == data.id_article &&
                                article.id_reception == data.id_reception
                            )
                            .map((item) => item.quantite_recu)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell align="right" colSpan={4}></TableCell>
                    <TableCell align="right" colSpan={1}>
                      <Typography sx={{ fontWeight: "bolder" }}>Total</Typography>
                    </TableCell>
                    <TableCell align="right" colSpan={1} sx={{ fontWeight: "bolder", bgcolor:"grey" }}>
                      {article
                        .map(
                          (article) =>
                            article.prix_unitaire *
                            dataReception
                              .filter(
                                (data) =>
                                  article.id_article == data.id_article &&
                                  article.id_reception == data.id_reception
                              )
                              .map((item) => item.quantite_recu)
                        )
                        .reduce((prev, curr) => prev + curr, 0)}
                    </TableCell>
                    <TableCell align="right" colSpan={1} sx={{ fontWeight: "bolder", bgcolor:"grey" }}>
                    {article
                        .map(
                          (article) =>
                            ((article.prix_unitaire/article.tva)+article.prix_unitaire)*
                            dataReception
                              .filter(
                                (data) =>
                                  article.id_article == data.id_article &&
                                  article.id_reception == data.id_reception
                              )
                              .map((item) => item.quantite_recu)
                        )
                        .reduce((prev, curr) => prev + curr, 0)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Facture() {
  var [dataArticle, setDataArticle] = useState([]);
  var [dataFacture, setDataFacture] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/facture_article/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataArticle(res.data);
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/facture/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataFacture(res.data);
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
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Numero</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="left">Fournisseur</TableCell>
            <TableCell align="left">Saisie par</TableCell>
            <TableCell align="left">Réçu par</TableCell>
            <TableCell align="center">N° Commande</TableCell>
            <TableCell align="center">N° reception</TableCell>
            <TableCell align="center">Exporter PDF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataFacture.map((row) => {
            return (
              <Row
                key={row.id}
                row={row}
                article={dataArticle.filter((item) => item.id == row.id)}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
