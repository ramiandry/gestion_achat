import {
  Box,
  Button,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function NouveauAdmin(props) {
  var [dataRole, setDataRole] = useState([]);
  var [dataDepartement, setDataDepartement] = useState([]);
  var [username, setUsername] = useState("");
  var [tel, setTel] = useState("");
  var [email, setEmail] = useState("");
  var [avatar, setAvatar] = useState("");
  var [mdp, setMdp] = useState("");
  var [email, setEmail] = useState("");
  var [path, setPath] = useState("user.png");
  var [departement, setDepartement] = useState("");
  var [role, setRole] = useState("");

  //Chercher les roles et departement
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchDataDepartement = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/departement/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setDataDepartement(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };
    fetchDataDepartement();
    const fetchDataRole = async () => {
      try {
        await axios
          .get(`http://localhost:8080/admin/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setDataRole(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };
    fetchDataRole();

    return () => {
      source.cancel();
    };
  }, []);

  const ajouterAdmin = () => {
    var formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("mot_de_passe", mdp);
    formData.append("tel", tel);
    formData.append("role", role);
    formData.append("departement", departement);
    if (
      (avatar != "",
      username != "",
      email != "",
      mdp != "",
      tel != "",
      role != "",
      departement != "")
    ) {
      axios
        .post(`http://localhost:8080/utilisateur/create`, formData)
        .then((res) => {
          console.log(res.data);
          props.setDataUtilisateur(res.data);
          props.close();
          Swal.fire({
            title: "Enregistré avec succès!!",
            icon: "success",
            padding: "2em",
            width: "600",
            color: "#ff2525",
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Veuillez remplir les champs!!",
            icon: "error",
            padding: "2em",
            width: "600",
            color: "#ff2525",
          });
        });
    } else {
      Swal.fire({
        title: "Veuillez remplir les champs!!",
        icon: "error",
        padding: "2em",
        width: "600",
        color: "#ff2525",
      });
    }
  };

  return (
    <Box>
      <FormGroup method="post" encType="multipart/form-data">
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <img
            src={path}
            width="100px"
            height="100px"
            style={{
              border: "3px solid gray",
              borderRadius: "5px",
              marginRight: "5px",
            }}
          />
          <TextField
            type="file"
            variant="standard"
            accept="*/Image"
            onChange={(e) => {
              setPath(URL.createObjectURL(e.target.files[0]));
              setAvatar(e.target.files[0]);
            }}
            required={true}
          />
        </Box>
        <TextField
          variant="outlined"
          label="Nom d'utilisateur"
          type="text"
          fullWidth
          margin="dense"
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <TextField
          variant="outlined"
          type="email"
          fullWidth
          label="Email"
          margin="dense"
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <TextField
          variant="outlined"
          type="text"
          fullWidth
          label="N° Telephone"
          margin="dense"
          onChange={(e) => setTel(e.target.value.trim())}
        />
        <TextField
          variant="outlined"
          type="text"
          fullWidth
          label="Mot de passe"
          margin="dense"
          onChange={(e) => setMdp(e.target.value.trim())}
        />
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <Box width="47%">
            <InputLabel id="demo-simple-select-label">
              SELECTIONNER UN ROLE
            </InputLabel>
            <Select
              id="demo-simple-select-label"
              fullWidth
              onChange={(e) => setRole(e.target.value)}
            >
              {dataRole.map((data) => {
                return (
                  <MenuItem value={data.id} defaultChecked>
                    {data.type}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Box width="47%">
            <InputLabel id="demo-simple-select-label">
              SELECTIONNER UN DEPARTEMENT
            </InputLabel>
            <Select
              id="demo-simple-select-label"
              fullWidth
              onChange={(e) => setDepartement(e.target.value)}
            >
              {dataDepartement.map((data) => {
                return (
                  <MenuItem value={data.id} defaultChecked>
                    {data.departement}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Button variant="contained" color="error" onClick={props.close}>
              Annuler
            </Button>
          </Box>
          <Box>
            <Button variant="contained" onClick={ajouterAdmin}>
              Ajouter
            </Button>
          </Box>
        </Box>
      </FormGroup>
    </Box>
  );
}

export default NouveauAdmin;
