import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  FormGroup,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Login() {
  const theme = useTheme();
  var [email, setEmail] = useState("");
  var [mot_de_passe, setMot_de_passe] = useState("");
  let navigate = useNavigate();

  const loginAdmin = async (e) => {
    if (email != "" && mot_de_passe != "") {
      try {
        await axios
          .post("http://localhost:8080/api/v1/auth/authenticate", {
            email: email,
            mot_de_passe: mot_de_passe,
          })
          .then((res) => {
            if(res.error){
              Swal.fire({
                title: 'Mot de passe ou email incorrect !!',
                icon:"error",
                padding: '3em',
                width:"600",
                color: '#ff2525',
              })
            }
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("id", res.data.id);
            navigate("/");
          });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Erreur de connexion !!',
          icon:"error",
          padding: '3em',
          width:"600",
          color: '#ff2525',
        })
      }
    }else{
      Swal.fire({
        title: 'Veuillez remplir les champs !!',
        icon:"error",
        padding: '3em',
        width:"600",
        color: '#ff2525',
      })
    }
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box width="700px" height="400px">
        <Paper
          elevation={7}
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            height: "100%",
            borderRadius: 3,
            border: "1px solid " + theme.palette.error.main,
          }}
        >
          <Box
            width="50%"
            height="100%"
            flexDirection="column"
            borderRight={"1px solid " + theme.palette.error.light}
            justifyContent="center"
            display="flex"
            alignItems="center"
          >
            <img
              src="icon.png"
              alt=""
              width="60%"
              id="cem-logo"
              style={{ marginBottom: "10px" }}
            />
            <img src="LOGO-CEM.png" alt="" width="90%" />
          </Box>
          <Box width="50%">
            <Typography
              variant="h4"
              textAlign="center"
              color={theme.palette.error.main}
            >
              Se connecter
            </Typography>
            <FormGroup
              sx={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box width="90%" marginY="20px">
                <InputLabel>Email : </InputLabel>
                <TextField
                  type="email"
                  sx={{ width: "100%" }}
                  placeholder="email@example.com"
                  margin="dense"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box width="90%" marginBottom="20px">
                <InputLabel>Mot de passe : </InputLabel>
                <TextField
                  type="password"
                  sx={{ width: "100%" }}
                  placeholder="password"
                  margin="dense"
                  onChange={(e) => setMot_de_passe(e.target.value)}
                />
              </Box>
              <Box>
                <Button variant="contained" color="error" onClick={loginAdmin}>
                  Connexion
                </Button>
              </Box>
            </FormGroup>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
