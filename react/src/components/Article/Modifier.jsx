import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function Modifier({ selected, setData }) {
  var [article, setArticle] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemDel, setItemDel] = useState(selected.length - 1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changer = (e, index) => {
    const newChamps = article.map((data, i) => {
      if (index === i) {
        return Object.assign(data, { [e.target.name]: e.target.value });
      } else {
        return data;
      }
    });
    setArticle(newChamps);
  };

  const addArticle = (setDonne) => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/article/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDonne(res.data);
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
  };

  function editArticle() {
    article.map((data) => {
      var drag = false;
      selected.map((item) => (item == data.id ? (drag = true) : null));
      if (drag) {
        console.log(data.id);
        axios
          .post(`http://127.0.0.1:8080/article/edit/${data.id}`, {
            description: data.description,
            prix_unitaire: data.prix_unitaire,
            quantite_demande: data.quantite_demande,
          })
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  const supprimer = (index) => {
    const filtreChamps = [...article];
    filtreChamps.splice(index, 1);
    setArticle(filtreChamps);
    setItemDel(itemDel - 1);
    console.log(itemDel);
    if (itemDel == 0) {
      handleClose();
    }
  };

  return (
    <>
      <IconButton
        onClick={() => {
          addArticle(setArticle);
          handleClickOpen();
          setItemDel(selected.length - 1);
        }}
      >
        <Edit />
      </IconButton>
      <Dialog
        open={open}
        maxWidth="400px"
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>Modification des articles</DialogTitle>
        <DialogContent>
          {article.map((data, index) => {
            var drag = false;
            selected.map((item) => (item == data.id ? (drag = true) : null));
            if (drag) {
              return (
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
                    name={`prix_unitaire`}
                    label="Prix unitaire"
                    size="small"
                    sx={{ width: "25%" }}
                    value={data.prix_unitaire}
                    type="text"
                    margin="dense"
                    onChange={(e) => changer(e, index)}
                  />
                  <TextField
                    variant="outlined"
                    label="Qte demandé"
                    name={`quantite_demande`}
                    value={data.quantite_demande}
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
              );
            }
          })}
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                setData()
              }}
              color="error"
            >
              Annuler
            </Button>
            <Button variant="contained" onClick={editArticle}>
              Valider
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Modifier;
