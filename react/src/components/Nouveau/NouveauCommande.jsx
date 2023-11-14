import { Add, ShoppingBag } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import NouveauFournisseur from "./NouveauFournisseur";
import Alerte from "../Dashboard/Alert/Alerte";
import Swal from "sweetalert2";

function NouveauCommande({ data, close }) {
  const id = sessionStorage.getItem("id");
  const champs = { description: "", prix: "", quantite: "" };
  const [date, setDate] = useState("");
  const [datePaiement, setDatePaiement] = useState("");
  const [idPaiement, setidPaiement] = useState("");
  const [idFournisseur, setIdFournisseur] = useState("");
  const [nbrPaiement, setNbrPaiement] = useState("");
  const [listeChamps, setListeChamps] = useState([]);
  const [dataPaiement, setDataPaiement] = useState([]);
  const [dataFournisseur, setDataFournisseur] = useState([]);
  const [demande, setDemande] = useState(0);

  const [open, setOpen] = useState(false);
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
          .get(`http://localhost:8080/paiement/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataPaiement(res.data);
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
          .get(`http://localhost:8080/fournisseur/getAll`, {
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
          .get(`http://localhost:8080/fournisseur/getAll`, {
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

  const searchArticle = (code) => {
    console.log(code);
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/article/getDemande/${code}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setListeChamps(res.data);
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

  const changer = (e, index) => {
    const newChamps = listeChamps.map((data, i) => {
      if (index === i) {
        return Object.assign(data, { [e.target.name]: e.target.value });
      } else {
        return data;
      }
    });
    setListeChamps(newChamps);
  };

  const creerCommande = () => {
    if (
      date != "" &&
      datePaiement != "" &&
      idFournisseur != "" &&
      idPaiement != "" &&
      demande != "" &&
      nbrPaiement != ""
    ) {
      axios
        .post(`http://localhost:8080/commande/create`, {
          id_user: id,
          date: date,
          date_paiement: datePaiement,
          id_paiement: idPaiement,
          id_fournisseur: idFournisseur,
          nbr_paiement: nbrPaiement,
          demande: demande,
        })
        .then((res) => {
          console.log(res.data);
          creerCommandeArticle(res.data.id);
          Swal.fire({
            title: "Enregistré avec succès !!",
            icon: "success",
            padding: "3em",
            width: "600",
            color: "#ff2525",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire({
        title: "Veuillez remplir les champs !!",
        icon: "error",
        padding: "3em",
        width: "600",
        color: "#ff2525",
      });
    }
  };

  const creerCommandeArticle = (idcommande) => {
    listeChamps.map((data) => {
      if (data.quantite_commande > 0) {
        axios
          .post(`http://localhost:8080/commande_article/create`, {
            article: { id: data.id },
            commande: { id: idcommande },
            quantite_commande: data.quantite_commande,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      close();
      Swal.fire({
        title: "Enregisté avec succès !!",
        icon: "success",
        padding: "3em",
        width: "600",
        color: "#ff2525",
      });
    });
  };

  return (
    <Box width={"900px"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "32%", marginX: "5px" }}>
          <InputLabel id="demo-simple-select-label">Code demande</InputLabel>
          <Select
            id="demo-simple-select-label"
            fullWidth
            onChange={(e) => {
              searchArticle(e.target.value);
              setDemande(e.target.value);
            }}
          >
            {data.map((data) => {
              if (data.budget && data.quantite) {
                return (
                  <MenuItem value={data.id} defaultChecked>
                    {data.id}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </Box>
        <Box sx={{ width: "32%", marginX: "5px" }}>
          <InputLabel id="demo-simple-select-label">
            {" "}
            Date de création
          </InputLabel>
          <TextField
            variant="outlined"
            type="Date"
            name="date"
            defaultValue={new Date().getDate()}
            margin="dense"
            fullWidth
            onChange={(e) => setDate(e.target.valueAsDate)}
          />
        </Box>
        <Box sx={{ width: "32%", marginX: "5px" }}>
          <InputLabel id="demo-simple-select-label">
            {" "}
            Début de paiement
          </InputLabel>
          <TextField
            variant="outlined"
            type="Date"
            name="paiement"
            defaultValue={new Date().getDate()}
            margin="dense"
            fullWidth
            onChange={(e) => setDatePaiement(e.target.valueAsDate)}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "32%" }}>
          <InputLabel id="demo-simple-select-label">
            {" "}
            Nombre de paiement
          </InputLabel>
          <TextField
            variant="outlined"
            type="number"
            name="date"
            margin="dense"
            fullWidth
            onChange={(e) => setNbrPaiement(e.target.value)}
          />
        </Box>

        <Box sx={{ width: "32%" }}>
          <InputLabel id="demo-simple-select-label">
            {" "}
            Type de paiement
          </InputLabel>
          <Select
            id="demo-simple-select-label"
            fullWidth
            onChange={(e) => setidPaiement(e.target.value)}
          >
            {dataPaiement.map((data) => {
              return (
                <MenuItem value={data.id} defaultChecked>
                  {data.type}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Box sx={{ width: "32%" }}>
          <InputLabel id="demo-simple-select-label">Fournisseur</InputLabel>
          <Select
            id="demo-simple-select-label"
            onChange={(e) => setIdFournisseur(e.target.value)}
            fullWidth
          >
            {dataFournisseur.map((data) => {
              return (
                <MenuItem value={data.id} defaultChecked>
                  {data.nom}
                </MenuItem>
              );
            })}
            <MenuItem onClick={handleClickOpen}>
              <Add sx={{ marginRight: 2 }} /> Nouveau
            </MenuItem>
          </Select>
        </Box>
      </Box>
      {listeChamps.length ? (
        <Divider>Listes des articles demandés</Divider>
      ) : null}
      {listeChamps.map((data, index) => (
        <Box
          key={index}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <TextField
            variant="outlined"
            name={`description`}
            size="small"
            sx={{ width: "20%" }}
            label="Description"
            type="text"
            margin="dense"
            value={data.description}
          />
          <TextField
            variant="outlined"
            name={`prix`}
            label="Prix unitaire"
            size="small"
            sx={{ width: "20%" }}
            value={data.prix_unitaire}
            type="text"
            margin="dense"
          />
          <TextField
            variant="outlined"
            label="Qte demandé"
            name={`quantite`}
            value={data.quantite_demande}
            size="small"
            sx={{ width: "20%" }}
            type="number"
            margin="dense"
          />
          <TextField
            variant="outlined"
            label="Qte Commandé"
            name={`quantite_commande`}
            onChange={(e) => changer(e, index)}
            size="small"
            sx={{ width: "20%" }}
            type="number"
            margin="dense"
          />
        </Box>
      ))}
      <Box
        sx={{ marginTop: 1, display: "flex", justifyContent: "space-between" }}
      >
        <Button variant="contained" onClick={close} color="error">
          Annuler
        </Button>
        <Button variant="contained" onClick={creerCommande}>
          Valider
        </Button>
      </Box>
      <Box>
        <Dialog open={open} fullWidth aria-labelledby="responsive-dialog-title">
          <DialogContent>
            <Box>
              <NouveauFournisseur
                setOpen={setOpen}
                dataFournisseur={dataFournisseur}
                setDataFournisseur={setDataFournisseur}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

export default NouveauCommande;
