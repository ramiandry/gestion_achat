import {
  Add,
  Article,
  Dashboard,
  Euro,
  Notes,
  ShoppingBasket,
  AccountCircle,
  ContentPaste
} from "@mui/icons-material";
import { Box, Button, Drawer, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import ButtonLink from "./ButtonLink";
import ButtonTitle from "./ButtonTitle";
import { Person } from "@material-ui/icons";
import OptionModal from "../../Nouveau/OptionModal";

function Sidebar(props) {
  const role = sessionStorage.getItem("role");
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const container = undefined;
  var [nouveau, setNouveau] = useState(0);
  useEffect(() => {
    console.log(Navbar.prototype.sidebar);
  }, [Navbar.prototype.sidebar]);
  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? 260 : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={Navbar.prototype.sidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            zIndex:200,
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              top: "88px",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <Box paddingLeft="20px">
          <OptionModal data={props.data} setData={props.setData} setDataUtilisateur={props.setDataUtilisateur}/>
          <ButtonTitle
            titre="Analyste"
            content={
              <ButtonLink titre="Dashboard" icon={<Dashboard />} path="/" />
            }
          />
          <ButtonTitle
            titre="Menu"
            content={
              <>
                <ButtonLink titre="Article" icon={<Article />} path="/article"/>
                <ButtonLink titre="Demande" icon={<Notes />} path="/demande"/>
                <ButtonLink titre="Commande" icon={<ShoppingBasket/>} path="/commande"/>
                <ButtonLink titre="Facture" icon={<Euro/>} path="/facture"/>
                <ButtonLink titre="Reception" icon={<ContentPaste/>} path="/reception"/>
                <ButtonLink titre="Fournisseur" icon={<Person/>} path="/fournisseur"/>
              </>
            }
          />
          {role==5?
          <ButtonTitle
            titre="Parametre Utilisateur"
            content={
              <>
                <ButtonLink titre="Utilisateur" icon={<AccountCircle/>} path="/utilisateur"/>
              </>
            }
          />:null}
        </Box>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
