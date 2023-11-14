import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

// Create Document Component
export default function GenererPdf({ row }) {
  var [user, setUser] = useState({});
  var [article, setArticle] = useState([]);
  var [reception, setReception] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/facture_article/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setArticle(res.data.filter((item) => item.id == row.id));
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
          .get(`http://localhost:8080/reception_article/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setReception(res.data);
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
    var id = sessionStorage.getItem("id");
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/utilisateur/getById/${id}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setUser(res.data);
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
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.entete}>
          <View>
            <Image style={styles.image} src="cem-logo.png" />
          </View>
          <View>
            <Text style={styles.imprimer}>
              Imprimer le : {new Date().toLocaleString("fr-FR")}
            </Text>
            <Text style={styles.imprimer}>Par : {user.userUsername}</Text>
          </View>
        </View>

        <View style={styles.titre}>
          <Text>Facture de N° {row.id}</Text>
        </View>
        <View style={styles.section1}>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Code de commande</Text>
            </View>
            <View style={styles.section}>
              <Text>: {row.id_commande}</Text>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Code de reception</Text>
            </View>
            <View style={styles.section}>
              <Text>: {row.id_reception}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section1}>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Date de création</Text>
            </View>
            <View style={styles.section}>
              <Text>: {new Date(row.date).toLocaleDateString("fr-FR")}</Text>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Saisie par </Text>
            </View>
            <View style={styles.section}>
              <Text>: {row.nom}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section1}>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Fournisseur</Text>
            </View>
            <View style={styles.section}>
              <Text>: {row.fournisseur}</Text>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Receptionniste </Text>
            </View>
            <View style={styles.section}>
              <Text>: {row.receptionniste}</Text>
            </View>
          </View>
        </View>

        <View style={styles.details}>
          <Text>Details:</Text>
        </View>

        <Table
          data={article.map((data) => ({
            id: data.id_article,
            description: data.description,
            prix_unitaire: data.prix_unitaire,
            recu: parseInt(
              reception
                .filter(
                  (item) =>
                    data.id_article == item.id_article &&
                    data.id_reception == item.id_reception
                )
                .map((elt) => elt.quantite_recu)
            ),
            total_sans_tva:
              reception
                .filter(
                  (item) =>
                    data.id_article == item.id_article &&
                    data.id_reception == item.id_reception
                )
                .map((item) => item.quantite_recu) * data.prix_unitaire,
            total_avec_tva:
              reception
                .filter(
                  (item) =>
                    data.id_article == item.id_article &&
                    data.id_reception == item.id_reception
                )
                .map((item) => item.quantite_recu) *
              (data.prix_unitaire / data.tva + data.prix_unitaire),
          }))}
        >
          <TableHeader>
            <TableCell style={styles.header}>Code</TableCell>
            <TableCell style={styles.header}>Description</TableCell>
            <TableCell style={styles.header}>Prix unitaire</TableCell>
            <TableCell style={styles.header}>Qte Réçue</TableCell>
            <TableCell style={styles.header}>Tle sans TVA</TableCell>
            <TableCell style={styles.header}>Tle avec TVA</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell style={styles.row} getContent={(r) => r.id} />
            <DataTableCell
              style={styles.rowLeft}
              getContent={(r) => r.description}
            />
            <DataTableCell
              style={styles.rowRight}
              getContent={(r) => r.prix_unitaire}
            />
            <DataTableCell style={styles.row} getContent={(r) => r.recu} />
            <DataTableCell
              style={styles.rowRight}
              getContent={(r) => r.total_sans_tva}
            />
            <DataTableCell
              style={styles.rowRight}
              getContent={(r) => r.total_avec_tva}
            />
          </TableBody>
        </Table>
        <View style={styles.total}>
          <Text>
            Total sans TVA:
            {article
              .map(
                (article) =>
                  article.prix_unitaire *
                  reception
                    .filter(
                      (data) =>
                        article.id_article == data.id_article &&
                        article.id_reception == data.id_reception
                    )
                    .map((item) => item.quantite_recu)
              )
              .reduce((prev, curr) => prev + curr, 0)}{" "}
            Ariary
          </Text>
        </View>
        <View style={styles.total}>
          <Text>
            Total avec TVA:
            {article
              .map(
                (article) =>
                  (article.prix_unitaire / article.tva +
                    article.prix_unitaire) *
                  reception
                    .filter(
                      (data) =>
                        article.id_article == data.id_article &&
                        article.id_reception == data.id_reception
                    )
                    .map((item) => item.quantite_recu)
              )
              .reduce((prev, curr) => prev + curr, 0)}{" "}
            Ariary
          </Text>
        </View>
      </Page>
    </Document>
  );
}

// Create styles
const styles = StyleSheet.create({
  page: { padding: 15 },
  section: {
    margin: 10,
    flexGrow: 1,
    fontSize: "12pt",
    width: "30%",
  },
  section1: {
    display: "flex",
    flexDirection: "row",
  },
  section2: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: "150px",
  },
  entete: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titre: {
    fontSize: "20pt",
    textAlign: "center",
    textDecoration: "underline",
    marginVertical: "15px",
  },
  imprimer: {
    fontSize: "10pt",
    fontWeight: "normal",
    fontStyle: "italic",
  },
  header: {
    fontSize: "12pt",
    textAlign: "center",
  },
  row: {
    textAlign: "center",
    height: "20px",
    display: "flex",
    alignItems: "center",
    fontSize: "12pt",
  },
  rowLeft: {
    textAlign: "left",
    height: "20px",
    display: "flex",
    alignItems: "flex-start",
    fontSize: "12pt",
    lineHeight: "1",
  },
  rowRigth: {
    textAlign: "right",
    height: "20px",
    display: "flex",
    alignItems: "flex-end",
    fontSize: "12pt",
  },
  details: {
    paddingVertical: 8,
    fontSize: "14pt",
  },
  total: {
    padding: 6,
    fontSize: "11pt",
  },
});
