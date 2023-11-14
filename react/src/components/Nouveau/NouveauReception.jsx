import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import NouveauReceptionniste from "./NouveauReceptionniste";
import { Add } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function NouveauReception({ close }) {
  const id = sessionStorage.getItem("id");
  const [commande, setCommande] = useState(0);
  const [listeChamps, setListeChamps] = useState([]);
  const [data, setData] = useState([]);
  const [dataReceptionniste, setDataReceptionniste] = useState([]);
  const [date_livraison, setDate_livraison] = useState("");
  const [date_reception, setDate_reception] = useState("");
  const [status, setstatus] = useState("");
  const [emplacement, setEmplacement] = useState("");
  const [receptionist, setReceptionist] = useState("");
  var [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(open);
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changer = (e, index) => {
    const newChamps = listeChamps.map((data, i) => {
      if (index === i) {
        return Object.assign(data, { [e.target.name]: e.target.value });
      } else {
        return data;
      }
    });
    console.log(newChamps);
    setListeChamps(newChamps);
  };

  const searchArticle = (code) => {
    console.log(code);
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/commande_article/getByCommande/${code}`, {
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
    getReceptionniste();
    return () => {
      source.cancel();
    };
  }, []);

  function getReceptionniste() {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/receptionniste/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataReceptionniste(res.data);
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

  const creerLivraison = () => {
    if (
      date_livraison != "" &&
      date_reception != "" &&
      status != "" &&
      emplacement != "" &&
      commande != "" &&
      receptionist != ""
    ) {
      axios
        .post(`http://localhost:8080/livraison/create`, {
          commande: { id: commande },
          status: status,
          date: date_livraison,
        })
        .then((res) => {
          console.log(res.data);
          creerReception(res.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire({
        title: "Veuilez remplir les champs !!",
        icon: "error",
        padding: "3em",
        width: "600",
        color: "#ff2525",
      });
    }
  };

  const creerReceptionArticle = (code) => {
    console.log("test");
    listeChamps.map((data, key) => {
      axios
        .post(`http://localhost:8080/reception_article/create`, {
          article: { id: data.id_article },
          reception: { id: code },
          recu: data.quantite_recu,
        })
        .then((res) => {
          console.log(res.data);
          modifierArticle(data.id_article, data.quantite + data.quantite_recu);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    Swal.fire({
      title: "Enregistré avec succès !!",
      icon: "success",
      padding: "3em",
      width: "600",
      color: "#ff2525",
    });
    close();
  };

  const creerReception = (idlivraison) => {
    axios
      .post(`http://localhost:8080/reception/create`, {
        utilisateur: { id: id },
        livraison: { id: idlivraison },
        date: date_reception,
        emplacement: emplacement,
        receptionniste: { id: receptionist },
      })
      .then((res) => {
        console.log(res.data);
        creerReceptionArticle(res.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
    close();
  };

  const modifierArticle = (id, quantite) => {
    axios
      .post(`http://localhost:8080/article/editQuantite/${id}`, {
        quantite: quantite,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "32%" }}>
          <InputLabel id="demo-simple-select-label">
            Code de commande
          </InputLabel>
          <Select
            id="demo-simple-select-label"
            fullWidth
            onChange={(e) => {
              setCommande(e.target.value);
              searchArticle(e.target.value);
            }}
          >
            {data.map((data) => {
              return (
                <MenuItem value={data.id} defaultChecked>
                  {data.id}
                </MenuItem>
              );
            })}
          </Select>
        </Box>

        <Box sx={{ width: "32%" }}>
          <InputLabel id="demo-simple-select-label">
            {" "}
            Status de livraison
          </InputLabel>
          <Select
            id="demo-simple-select-label"
            onChange={(e) => setstatus(e.target.value)}
            fullWidth
          >
            <MenuItem value={"false"} selected>
              Partiel
            </MenuItem>
            <MenuItem value={"true"}>Total</MenuItem>
          </Select>
        </Box>
        <Box sx={{ width: "32%" }}>
          <InputLabel id="demo-simple-select-label">
            {" "}
            Date de livraison
          </InputLabel>
          <TextField
            variant="outlined"
            type="Date"
            name="date"
            defaultValue={new Date().getDate()}
            onChange={(e) => setDate_livraison(e.target.valueAsDate)}
            margin="dense"
            fullWidth
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
            Date de reception
          </InputLabel>
          <TextField
            variant="outlined"
            type="Date"
            name="paiement"
            defaultValue={new Date().getDate()}
            onChange={(e) => setDate_reception(e.target.valueAsDate)}
            margin="dense"
            fullWidth
          />
        </Box>
        <Box sx={{ width: "32%" }}>
          <InputLabel id="demo-simple-select-label">Receptionniste</InputLabel>
          <Select
            id="demo-simple-select-label"
            onChange={(e) => setReceptionist(e.target.value)}
            fullWidth
          >
            {dataReceptionniste.map((data) => (
              <MenuItem value={data.id}>{data.nom}</MenuItem>
            ))}
            <MenuItem onClick={handleClickOpen}>
              <Add sx={{ marginRight: 2 }} /> Nouveau
            </MenuItem>
          </Select>
          {/*<TextField
            variant="outlined"
            type="text"
            name="date"
            margin="dense"
            fullWidth
            onChange={e=>setReceptionist(e.target.value)}
      />*/}
        </Box>
        <Box sx={{ width: "32%" }}>
          <InputLabel id="demo-simple-select-label">Emplacement</InputLabel>
          <TextField
            variant="outlined"
            type="text"
            name="date"
            margin="dense"
            fullWidth
            onChange={(e) => setEmplacement(e.target.value)}
          />
        </Box>
      </Box>
      {listeChamps.length ? (
        <Divider>Listes des articles commandés</Divider>
      ) : null}
      {listeChamps.map((data, index) => (
        <>
          {" "}
          {data.quantite != data.quantite_commande ? (
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
                label="Qte Commandé"
                name={`quantite_commande`}
                size="small"
                sx={{ width: "20%" }}
                type="number"
                value={data.quantite_commande}
                margin="dense"
              />
              <TextField
                variant="outlined"
                label="Qte reçue"
                name={`quantite_recu`}
                size="small"
                sx={{ width: "20%" }}
                InputProps={{
                  inputProps: { min: 0, max: data.quantite_commande },
                }}
                onChange={(e) => changer(e, index)}
                type="number"
                margin="dense"
              />
            </Box>
          ) : null}
        </>
      ))}
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" onClick={close} color="error">
          Annuler
        </Button>
        <Button variant="contained" onClick={creerLivraison}>
          Valider
        </Button>
      </Box>
      <Box>
        <Dialog open={open} fullWidth aria-labelledby="responsive-dialog-title">
          <DialogContent>
            <Box>
              <NouveauReceptionniste
                setOpen={setOpen}
                dataReceptionniste={dataReceptionniste}
                getReceptionniste={getReceptionniste}
                setDataReceptionniste={setDataReceptionniste}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
}
