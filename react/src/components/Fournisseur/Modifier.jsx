import { Edit } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, FormGroup, IconButton, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";

function Modifier({ fournisseur, setData }) {
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState(fournisseur.nom);
  const [email, setEmail] = useState(fournisseur.email);
  const [tel, setTel] = useState(fournisseur.tel);
  const [adresse, setAdresse] = useState(fournisseur.adresse);
  //const [fournisseur, setFournisseur] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function update() {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/fournisseur/getAll`, {
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
  }

  function edit() {
    if (nom != "" && tel != "" && email != "" && adresse != "") {
      axios
        .post(`http://localhost:8080/fournisseur/edit/${fournisseur.id}`, {
          nom: nom,
          email: email,
          adresse: adresse,
          tel: tel,
        })
        .then((res) => {
          console.log(res.data);
          setOpen(false);
          update();
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
  }

  return (
    <>
      <IconButton
        onClick={() => {
          handleClickOpen();
        }}
      >
        <Edit />
      </IconButton>
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle align="center">Modifier</DialogTitle>
        <DialogContent>
          <FormGroup method="post" encType="multipart/form-data">
            <TextField
              variant="outlined"
              label="Nom de fournisseur"
              type="text"
              fullWidth
              defaultValue={fournisseur.nom}
              margin="dense"
              onChange={(e) => setNom(e.target.value)}
            />
            <TextField
              variant="outlined"
              type="text"
              fullWidth
              defaultValue={fournisseur.adresse}
              label="Adresse"
              margin="dense"
              onChange={(e) => setAdresse(e.target.value)}
            />
            <TextField
              variant="outlined"
              type="phone"
              fullWidth
              label="N° Telephone"
              defaultValue={fournisseur.tel}
              margin="dense"
              onChange={(e) => setTel(e.target.value)}
            />
            <TextField
              variant="outlined"
              type="email"
              fullWidth
              label="Adresse email"
              defaultValue={fournisseur.email}
              margin="dense"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box
              style={{
                marginTop: 1,
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setOpen(false)}
                color="error"
              >
                Annuler
              </Button>
              <Button variant="contained" color="primary" onClick={edit}>
                Valider
              </Button>
            </Box>
          </FormGroup>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Modifier;
