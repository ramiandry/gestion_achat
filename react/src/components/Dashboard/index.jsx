import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Dashboard(props) {
  const theme = useTheme();
  var [user, setUser] = useState({});
  var [autoriser, setAutoriser] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    var token = sessionStorage.getItem("token");
    var id = sessionStorage.getItem("id");
    if (id == undefined) {
      navigate("/login");
    }
    axios
      .get(`http://localhost:8080/utilisateur/getById/${id}`)
      .then((response) => {
        if (!response.data.userValide) {
          navigate("/login");
        }else{
          setAutoriser(true);
          setUser(response.data);
          sessionStorage.setItem("role", response.data.id_role);
        }
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  return (
    <>
      {autoriser ? (
        <>
          <Navbar user={user} />
          <Sidebar
            data={props.data}
            setData={props.setData}
            setDataUtilisateur={props.setDataUtilisateur}
          />
          <Box
            sx={{
              bgcolor: theme.palette.grey[200],
              position: "absolute",
              top: "100px",
              left: "280px",
              minHeight: "89vh",
              maxWidth: "78vw",
              width: "78vw",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <Outlet />
          </Box>
        </>
      ) : null}
    </>
  );
}

export default Dashboard;
