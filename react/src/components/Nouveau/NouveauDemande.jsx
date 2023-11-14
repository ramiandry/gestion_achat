import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  TextField,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

function NouveauDemande({ close }) {
  const id = sessionStorage.getItem("id");
  const champs = { description: "", prix: "", quantite: "" };
  const [listeChamps, setListeChamps] = useState([]);
  var [date, setDate] = useState("");
  var [remarque, setRemarque] = useState("");
  var [idArticle, setIdArticle] = useState([]);
  //var [idDemande, setIdDemande] = useState(0);
  const creerChamp = () => {
    setListeChamps([...listeChamps, champs]);
  };
  useEffect(() => {
    return () => {
      creerChamp();
    };
  }, []);
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

  const supprimer = (index) => {
    const filtreChamps = [...listeChamps];
    filtreChamps.splice(index, 1);
    setListeChamps(filtreChamps);
  };

  //ajouter demande et des article
  const ajouter = () => {
    if ((date != "", remarque != "")) {
      axios
        .post(`http://localhost:8080/demande/create/${id}`, {
          date: date,
          description: remarque,
        })
        .then((res) => {
          console.log(res.data);
          // setIdDemande(res.data.id);
          addArticle(res.data.id);
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

  function addArticle(idDemande) {
    var i = 0;
    listeChamps.map((data) => {
      axios
        .post(`http://localhost:8080/article/create/${idDemande}`, {
          description: data.description,
          prix_unitaire: data.prix,
          quantite_demande: data.quantite,
          quantite: 0,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    close();
    Swal.fire({
      title: "Enregisté avec succès !!",
      icon: "success",
      padding: "3em",
      width: "600",
      color: "#ff2525",
    });
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "48%" }}>
          <InputLabel id="demo-simple-select-label">
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
        <Box sx={{ width: "48%" }}>
          <InputLabel id="demo-simple-select-label">Remarque</InputLabel>
          <TextareaAutosize
            fullWidth
            aria-label="Votre texte"
            style={{
              width: "100%",
              height: "45px",
              resize: "none",
              padding: "5px",
            }}
            placeholder="Votre remarque ici..."
            onChange={(e) => setRemarque(e.target.value)}
          />
        </Box>
      </Box>

      <Box marginY={2}>
        <Button variant="contained" color="primary" onClick={creerChamp}>
          <Add /> colonne
        </Button>
      </Box>
      {listeChamps.map((data, index) => (
        <Box
          key={index}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <TextField
            variant="outlined"
            name={`description`}
            size="small"
            sx={{ width: "25%" }}
            label="Description"
            type="text"
            margin="dense"
            value={data.description}
            onChange={(e) => changer(e, index)}
          />
          <TextField
            variant="outlined"
            name={`prix`}
            label="Prix unitaire"
            size="small"
            sx={{ width: "25%" }}
            value={data.prix}
            type="text"
            margin="dense"
            onChange={(e) => changer(e, index)}
          />
          <TextField
            variant="outlined"
            label="Qte demandé"
            name={`quantite`}
            value={data.quantite}
            size="small"
            sx={{ width: "25%" }}
            type="number"
            margin="dense"
            onChange={(e) => changer(e, index)}
          />
          <Tooltip title="Supprimer">
            <IconButton color="error" onClick={() => supprimer(index)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="contained" color="error" onClick={close}>
          Annuler
        </Button>
        <Button variant="contained" onClick={ajouter}>
          Valider
        </Button>
      </Box>
    </Box>
  );
}

export default NouveauDemande;
