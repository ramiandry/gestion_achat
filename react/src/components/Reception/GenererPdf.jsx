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
export default function GenererPdf({ article, reception, commande }) {
  var [user, setUser] = useState({});
  const id = sessionStorage.getItem("id");
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
          <Text>Reception N° {reception.id}</Text>
        </View>
        <View style={styles.section1}>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Code de commande</Text>
            </View>
            <View style={styles.section}>
              <Text>: {reception.id_commande}</Text>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Code de reception</Text>
            </View>
            <View style={styles.section}>
              <Text>: {reception.id}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section1}>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Date de reception</Text>
            </View>
            <View style={styles.section}>
              <Text>
                : {new Date(reception.date).toLocaleDateString("fr-FR")}
              </Text>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Saisie par </Text>
            </View>
            <View style={styles.section}>
              <Text>: {reception.nom}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section1}>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Fournisseur</Text>
            </View>
            <View style={styles.section}>
              <Text>: {reception.fournisseur}</Text>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Receptionniste </Text>
            </View>
            <View style={styles.section}>
              <Text>: {reception.receptionniste}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section1}>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Date de livraison</Text>
            </View>
            <View style={styles.section}>
              <Text>
                :{" "}
                {new Date(reception.date_livraison).toLocaleDateString("fr-FR")}
              </Text>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.section}>
              <Text>Emplacement </Text>
            </View>
            <View style={styles.section}>
              <Text>: {reception.emplacement}</Text>
            </View>
          </View>
        </View>

        <View style={styles.details}>
          <Text>Details:</Text>
        </View>

        <Table
          data={article.map((data) => {
            var quantite_commande;
            commande.map((item) => {
              //console.log(item.id_article+" "+row.id_article+" "+item.id+" "+reception.id_commande)
              if (
                item.id_article == data.id_article &&
                item.id == reception.id_commande
              ) {
                quantite_commande = item.quantite_commande;
              }
            });
            return {
              id_article: data.id_article,
              description: data.description,
              quantite_demande: data.quantite_demande,
              quantite_commande: quantite_commande,
              quantite_recu: data.quantite_recu,
              prix_unitaire: data.prix_unitaire,
            };
          })}
        >
          <TableHeader>
            <TableCell style={styles.header}>Code</TableCell>
            <TableCell style={styles.header}>Description</TableCell>
            <TableCell style={styles.header}>Qté Demandé</TableCell>
            <TableCell style={styles.header}>Qté Commandé</TableCell>
            <TableCell style={styles.header}>Qté Réçue</TableCell>
            <TableCell style={styles.header}>Prix unitaire</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell
              style={styles.row}
              getContent={(r) => r.id_article}
            />
            <DataTableCell
              style={styles.rowLeft}
              getContent={(r) => r.description}
            />
            <DataTableCell
              style={styles.row}
              getContent={(r) => r.quantite_demande}
            />
            <DataTableCell
              style={styles.row}
              getContent={(r) => r.quantite_commande}
            />
            <DataTableCell style={styles.row} getContent={(r) => r.quantite_recu} />
            <DataTableCell
              style={styles.rowRight}
              getContent={(r) => r.prix_unitaire}
            />
          </TableBody>
        </Table>
        <View style={styles.signature}>
          <Text style={{ textAlign: "center" }}>Receptionniste</Text>
          <Image
            src={
              "http://127.0.0.1:8080/receptionniste/image/" +
              reception.id_receptionniste
            }
            style={{ marginVertical: 4, width: "50px" }}
          />
          <Text style={{ textAlign: "center" }}>
            {reception.receptionniste}
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
  signature: {
    position: "absolute",
    left: "75%",
    top: "80%",
    padding: 6,
    fontSize: "11pt",
    textAlign: "center",
  },
});
