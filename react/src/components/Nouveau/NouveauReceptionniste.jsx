import { Box, Button, FormGroup, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from "./styles.modules.css";
import SignaturePad from "react-signature-canvas";

function NouveauReceptionniste({
  setOpen,
  setDataReceptionniste,
  dataReceptionniste,
  getReceptionniste,
}) {
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const [sigPad, setSigPad] = useState({});
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [prenom, setPrenom] = useState("");

  const convertDataURIToFile = (dataURI) => {
    var imageData = dataURI.split(",")[1];
    var byteString = atob(imageData);
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var byteArray = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    var file = new File([arrayBuffer], "test.png", { type: "image/png" });

    return file;
  };

  const clear = () => {
    sigPad.clear();
  };

  const addReceptionniste = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL("image/png"));
    var form = new FormData();
    form.append("nom", nom);
    form.append("email", email);
    form.append("tel", tel);
    form.append(
      "file",
      convertDataURIToFile(sigPad.getTrimmedCanvas().toDataURL("image/png"))
    );
    if (nom != "" && tel != "" && email != "") {
      axios
        .post("http://localhost:8080/receptionniste/create", form)
        .then((res) => {
          console.log(res.data);
          getReceptionniste();
          setOpen(false);
          Swal.fire({
            title: "Ajouter avec success !!",
            icon: "success",
            padding: "3em",
            width: "600",
            color: "#ff2525",
          });
        })
        .catch((err) => console.log(err));
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

  return (
    <FormGroup method="post" encType="multipart/form-data">
      <TextField
        variant="outlined"
        label="Nom de receptionniste"
        type="text"
        fullWidth
        margin="dense"
        onChange={(e) => setNom(e.target.value)}
      />
      <TextField
        variant="outlined"
        type="phone"
        fullWidth
        label="N° Telephone"
        margin="dense"
        onChange={(e) => setTel(e.target.value)}
      />
      <TextField
        variant="outlined"
        type="email"
        fullWidth
        label="Adresse email"
        margin="dense"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Box className={styles.container}>
        <InputLabel id="demo-simple-select-label">
          Signature numérique
        </InputLabel>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent="center"
          alignItems="center"
        >
          <SignaturePad
            canvasProps={{
              className: styles.sigPad,
              style: {
                width: "100%",
                border: "1px solid grey",
                borderRadius: "5px",
              },
            }}
            ref={(ref) => {
              setSigPad(ref);
            }}
          />
        </Box>
        <div>
          <Button onClick={clear}>Clear</Button>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width:"100%",
          alignItems: "center",
        }}
      >
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(false)}
          >
            Annuler
          </Button>
        </Box>
        <Box>
          <Button type="submit" variant="contained" onClick={addReceptionniste}>
            Ajouter
          </Button>
        </Box>
      </Box>

    </FormGroup>
  );
}

export default NouveauReceptionniste;
