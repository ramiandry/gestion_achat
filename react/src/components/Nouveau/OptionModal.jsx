import { Add } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import FicheCommande from "./FicheCommande";
import NouveauArticle from "./NouveauArticle";
import NouveauFournisseur from "./NouveauFournisseur";
import NouveauAdmin from "./NouveauAdmin";
import NouveauDemande from "./NouveauDemande";
import NouveauCommande from "./NouveauCommande";
import NouveauReception from "./NouveauReception";
import NouveauFacture from "./NouveauFacture";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function OptionModal(props) {
  const role = sessionStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [titre, setTitre] = useState("Commande");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      {role != 4 ? (
        <Button
          variant="contained"
          color="error"
          onClick={handleClickOpen}
          sx={{ width: "90%", justifyContent: "left", fontWeight: "bolder" }}
        >
          <Add sx={{ marginRight: 2 }} /> Nouveau
        </Button>
      ) : null}
      <Dialog
        open={open}
        maxWidth="400px"
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .css-zw3mfo-MuiModal-root-MuiDialog-root": { zIndex: 200 },
          zIndex: 500,
        }}
      >
        <DialogContent>
          <Box sx={{ bgcolor: "background.paper" }}>
            <AppBar position="static" color="inherit" elevation={0}>
              {role == 6 ? (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Demande" {...a11yProps(0)} />
                  <Tab label="Commande" {...a11yProps(1)} />
                  <Tab label="Reception" {...a11yProps(2)} />
                  <Tab label="Facture" {...a11yProps(3)} />
                  <Tab label="Utilisateur" {...a11yProps(4)} />
                </Tabs>
              ) : null}
              {role == 3 ? (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Facture" {...a11yProps(0)} />
                </Tabs>
              ) : null}
              {role == 1 ? (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Demande" {...a11yProps(0)} />
                  <Tab label="Reception" {...a11yProps(1)} />
                </Tabs>
              ) : null}
              {role == 2 ? (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Commande" {...a11yProps(0)} />
                </Tabs>
              ) : null}
              {role == 5 ? (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Utilisateur" {...a11yProps(0)} />
                </Tabs>
              ) : null}
            </AppBar>
            {/*role == 6 ? (
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={4} dir={theme.direction}>
                  <NouveauDemande />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <NouveauCommande close={handleClose} data={props.data} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <NouveauReception close={handleClose} data={props.data} />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <NouveauFacture close={handleClose} />
                </TabPanel>
                {
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <NouveauAdmin
                      close={handleClose}
                      setDataUtilisateur={props.setDataUtilisateur}
                    />
                  </TabPanel>
                }
              </SwipeableViews>
              ) : null*/}
            {role == 3 ? (
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <NouveauFacture close={handleClose} />
                </TabPanel>
              </SwipeableViews>
            ) : null}
            {role == 2 ? (
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <NouveauCommande close={handleClose} data={props.data} />
                </TabPanel>
              </SwipeableViews>
            ) : null}
            {role == 1 ? (
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <NouveauDemande close={handleClose} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <NouveauReception close={handleClose} data={props.data} />
                </TabPanel>
              </SwipeableViews>
            ) : null}
            {role == 5 ? (
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <NouveauAdmin
                    close={handleClose}
                    setDataUtilisateur={props.setDataUtilisateur}
                  />
                </TabPanel>
              </SwipeableViews>
            ) : null}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default OptionModal;
