import {
  Box,
  Button,
  OutlinedInput,
  TextareaAutosize,
  TextField,
  FormGroup,
} from "@mui/material";
import { shouldForwardProp } from "@mui/system";
import { useTheme, styled } from "@mui/material/styles";
import React, { useState } from "react";
import { Send } from "@mui/icons-material";
import axios from "axios";

function FicheCommande({data, setData}) {
  var [titre, setTitre] = useState("");
  var [description, setDescription] = useState("");
  var [fiche, setFiche] = useState("");
  const theme = useTheme;
  const source = axios.CancelToken.source();
  console.log(data);
  function create() {
    var formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    formData.append("fiche", "fiche");
    formData.append("file", fiche);
    formData.append("estValide", 1);
    console.log(fiche);
    axios
      .post(`http://localhost:8080/demande/create`, formData, {
        cancelToken: source.token,
      })
      .then((res) => {
        setData([...data,res.data])
       // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      source.cancel();
    };
  }
  return (
    <Box>
      <FormGroup method="post" encType="multipart/form-data">
        <TextField
          variant="standard"
          label="Titre"
          type="text"
          fullWidth
          margin="dense"
          onChange={(e) => setTitre(e.target.value)}
        />
        <TextareaAutosize
          fullWidth
          aria-label="Votre texte"
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "98%",
            height: "270px",
            border: "none",
            resize: "none",
            padding: "5px",
            "& textarea:focus": {
              border: "none",
            },
          }}
          placeholder="Votre texte ici..."
        />
        <TextField
          type="file"
          accept="application/pdf"
          margin="dense"
          onChange={(e) => setFiche(e.target.files[0])}
        />
        <Box>
          <Button variant="contained" onClick={create}>
            Envoyer
            <Send sx={{ marginLeft: "10px" }} />
          </Button>
        </Box>
      </FormGroup>
    </Box>
  );
}

export default FicheCommande;
