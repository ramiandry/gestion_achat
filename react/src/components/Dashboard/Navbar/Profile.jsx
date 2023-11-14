import {
  AdminPanelSettingsRounded,
  LogoutRounded,
  Profiles,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  ClickAwayListener,
  Divider,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Profile({ user }) {
  let navigate = useNavigate();
  const theme = useTheme();
  var [anchorEl, setAnchorEl] = useState(null);
  const anchorRef = useRef(null);

  const handleClickOpen = () => {
    setAnchorEl(true);
  };

  const handleClickClose = () => {
    setAnchorEl(false);
  };

  var [user, setUser] = useState({});
  useEffect(() => {
    var token = sessionStorage.getItem("token");
    var id = sessionStorage.getItem("id");
    console.log(token);
    axios
      .get(`http://localhost:8080/utilisateur/getById/${id}`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((err) => {});
  }, []);

  const deconnexion = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Chip
        sx={{
          height: "45px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.error.light,
          backgroundColor: theme.palette.error.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.error.dark,
            background: `${theme.palette.error.dark}!important`,
            color: theme.palette.error.light,
            "& svg": {
              stroke: theme.palette.error.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={"http://127.0.0.1:8080/utilisateur/image/" + user.userId}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
              width: "30px",
              height: "30px",
            }}
            ref={anchorRef}
            aria-controls={anchorEl ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <Settings
            stroke={1.5}
            size="1.5rem"
            sx={{
              color: theme.palette.grey[200],
            }}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={anchorEl ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleClickOpen}
        color="primary"
      />

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl}
        onClose={handleClickClose}
        sx={{
          position: "absolute",
          left: "85%",
          top: "7%",
          width:"250px",
          "& .css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper": {
            width: "350px",
            height: "auto",
            paddingX: "40px",
          },
        }}
      >
        <Box sx={{ color: "black" }}>
          <Typography variant="h5">
            {new Date().getHours() >= 0 && new Date().getHours() < 18
              ? "Bonjour"
              : "Bonsoir"}
            , {user.userUsername}
          </Typography>
        </Box>
        <Divider sx={{ marginY: 1 }}></Divider>
        <MenuItem onClick={handleClickClose}>
          <AdminPanelSettingsRounded
            sx={{ marginRight: "10px", fontWeight: "bolder" }}
          />
          Parametres
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickClose();
            deconnexion();
          }}
        >
          <LogoutRounded sx={{ marginRight: "10px", fontWeight: "bolder" }} />
          Deconnexion
        </MenuItem>
      </Menu>
      {/*
       <Button
        aria-controls="Profile-menu"
        aria-haspopup="true"
        onClick={handleClickOpen}
        sx={{
          borderRadius: "50%",
          transition: "all .2s ease-in-out",
          background: theme.palette.grey[200],
          "&:hover": {
            background: theme.palette.error.dark,
            color: theme.palette.grey,
          },
        }}
      >
        <Avatar src="logo192.png" sizes="small" wi />

        <Settings />
      </Button>
      */}
    </>
  );
}

export default Profile;
