import { ManageAccounts, Shower } from "@mui/icons-material";
import {
  InputLabel,
  Box,
  Button,
  Dialog,
  DialogContent,
  FormGroup,
  IconButton,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

function DescriptionModal({ id }) {
  var [dataRole, setDataRole] = useState([]);
  var [dataDepartement, setDataDepartement] = useState([]);
  var [username, setUsername] = useState("");
  var [tel, setTel] = useState("");
  var [email, setEmail] = useState("");
  var [avatar, setAvatar] = useState("");
  var [mdp, setMdp] = useState("");
  var [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  var [departement, setDepartement] = useState("");
  var [role, setRole] = useState("");
  var [path, setPath] = useState(
    "http://127.0.0.1:8080/utilisateur/image/" + id
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/utilisateur/getById/${id}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setData(res.data);
            setUsername(res.data.nom_utilisateur);
            setEmail(res.data.email);
            setTel(res.data.tel);
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

  const modifierAdmin = () => {
    var formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("mot_de_passe", mdp);
    formData.append("tel", tel);
    formData.append("role", role);
    formData.append("departement", departement);
    if (username != "" && email != "" && tel != "") {
      axios
        .post(`http://localhost:8080/utilisateur/edit/${id}`, formData)
        .then((res) => {
          console.log(res.data);
          handleClose();
          Swal.fire({
            title: "Modifier avec succès!!",
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
    <>
      <IconButton variant="contained" color="error" onClick={handleClickOpen}>
        <ManageAccounts sx={{ marginRight: 2 }} />
      </IconButton>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <Box>
            <FormGroup method="post" encType="multipart/form-data">
              <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
              >
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
                defaultValue={data.userUsername}
                fullWidth
                margin="dense"
                onChange={(e) => setUsername(e.target.value.trim())}
              />
              <TextField
                variant="outlined"
                type="email"
                fullWidth
                label="Email"
                defaultValue={data.userEmail}
                margin="dense"
                onChange={(e) => setEmail(e.target.value.trim())}
              />
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                defaultValue={data.userTel}
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
              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom={2}
              >
                <Box width="47%">
                  <InputLabel id="demo-simple-select-label">
                    SELECTIONNER UN ROLE
                  </InputLabel>
                  <Select
                    id="demo-simple-select-label"
                    fullWidth
                    onChange={(e) => setRole(e.target.value)}
                    value={data.type}
                  >
                    {dataRole.map((data) => {
                      return <MenuItem value={data.id}>{data.type}</MenuItem>;
                    })}
                  </Select>
                </Box>
                <Box width="47%">
                  <InputLabel id="demo-simple-select-label">
                    {" "}
                    SELECTIONNER UN DEPARTEMENT
                  </InputLabel>
                  <Select
                    id="demo-simple-select-label"
                    fullWidth
                    value={data.departement}
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
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button variant="contained" color="error" onClick={handleClose}>
                  Annuler
                </Button>
                <Button variant="contained" onClick={modifierAdmin}>Modifier</Button>
              </Box>
            </FormGroup>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DescriptionModal;
