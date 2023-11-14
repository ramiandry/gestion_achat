import {
  Add,
  Close,
  CloseFullscreen,
  Fullscreen,
  Maximize,
  Minimize,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import FicheCommande from "./FicheCommande";

function NouveauModal({data, setData}) {
  var [fullscreen, setFullscreen] = useState(false);
  var [maximize, setMaximize] = useState(false);
  var [scale, setScale] = useState(0);
  var [style, setStyle] = useState({
    bottom: "100%",
    right: "100%",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Backdrop open={open} />
      <Button
        variant="contained"
        color="error"
        sx={{ width: "90%", justifyContent: "left", fontWeight: "bolder" }}
        onClick={() => {
          setScale(1);
          setStyle({
            height: "475px",
            bottom: "2%",
            right: "2%",
            width: "500px",
          });
        }}
      >
        <Add sx={{ marginRight: 2 }} /> Nouveau
      </Button>

      <motion.div
        style={{
          position: "fixed",
          width: "fit-content",
          height: "fit-content",
          zIndex: 3000,
        }}
        transition={{
          duration: 0.5,
        }}
        initial={{
          scale: 0.2,
          bottom: "95%",
          right: "95%",
        }}
        animate={{
          bottom: style.bottom,
          right: style.right,
          scale: scale,
        }}
      >
        <Box>
          <Paper
            elevation={3}
            sx={{
              maxHeight: style.height,
              height: style.height,
              width: style.width,
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                sx={{
                  overflow: "hidden",
                  width: "100%",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  display: "block",
                }}
              >
                Nouveau fiche de commande
              </Typography>
              <Box width="50%" display="flex" justifyContent="flex-end">
                {!maximize? (
                  <IconButton
                    onClick={() =>{
                      setStyle({
                        height: "30px",
                        bottom: "2%",
                        right: "2%",
                        width: "250px",
                      });
                      setMaximize(true)
                    }}
                    sx={{ borderRadius: "50px" }}
                  >
                    <Minimize />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() =>{
                      setStyle({
                        height: "475px",
                        bottom: "2%",
                        right: "2%",
                        width: "500px",
                      });
                      setMaximize(false)
                    }
                    }
                    sx={{ borderRadius: "50px" }}
                  >
                    <Maximize />
                  </IconButton>
                )}
                {!fullscreen? (
                  <IconButton
                    onClick={() =>{
                      setStyle({
                        height: "97vh",
                        bottom: 0,
                        right: 0,
                        width: "98vw",
                      });
                      setFullscreen(true)
                    }}
                  >
                    <Fullscreen />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() =>{
                      setStyle({
                        height: "475px",
                        bottom: "2%",
                        right: "2%",
                        width: "500px",
                      });
                      setFullscreen(false)
                    }
                    }
                  >
                    <CloseFullscreen />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => {
                    setScale(0);
                    setStyle({
                      bottom: "100%",
                      right: "100%",
                    });
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
            </Box>
            <Divider></Divider>
            <FicheCommande data={data} setData={setData}/>
          </Paper>
        </Box>
      </motion.div>
    </>
  );
}

export default NouveauModal;
