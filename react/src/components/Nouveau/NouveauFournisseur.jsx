import { Add, SettingsEthernetOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";

function NouveauFournisseur({setOpen, setDataFournisseur, dataFournisseur}) {
  var [nom, setNom]=useState("")
  var [email, setEmail]=useState("")
  var [adresse, setAdresse]=useState("")
  var [tel, setTel]=useState("")
  function add() {
      axios
        .post(`http://localhost:8080/fournisseur/create`, {
          nom:nom,
          email:email,
          adresse:adresse,
          tel:tel
        })
        .then((res) => {
          console.log(res.data);
          setDataFournisseur([...dataFournisseur,res.data])
          setOpen(false)
        })
        .catch((error) => {
          console.log(error);
        });
  }
  return (
    <>
      <FormGroup method="post" encType="multipart/form-data">
        <TextField
          variant="outlined"
          label="Nom de fournisseur"
          type="text"
          fullWidth
          margin="dense"
          onChange={e=>setNom(e.target.value)}
        />
        <TextField
          variant="outlined"
          type="text"
          fullWidth
          label="Adresse"
          margin="dense"
          onChange={e=>setAdresse(e.target.value)}
        />
        <TextField
          variant="outlined"
          type="phone"
          fullWidth
          label="N° Telephone"
          margin="dense"
          onChange={e=>setTel(e.target.value)}
        />
        <TextField
          variant="outlined"
          type="email"
          fullWidth
          label="Adresse email"
          margin="dense"
          onChange={e=>setEmail(e.target.value)}
        />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" onClick={()=>setOpen(false)} color="error">
            Annuler
          </Button>
          <Button variant="contained" onClick={add}>Valider</Button>
        </Box>
      </FormGroup>
    </>
  );
}

export default NouveauFournisseur;
