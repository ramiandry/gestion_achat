import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import React, { useState } from "react";

function Modifier({ id }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        onClick={() => {
          handleClickOpen();
        }}
      >
        <Edit />
      </IconButton>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>Modification de demande N° {id}</DialogTitle>
        <DialogContent sx={{width:"600px"}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              variant="outlined"
              label="Date de depot"
              type="Date"
              name="date"
              defaultValue={new Date().getDate()}
              margin="dense"
              sx={{ width: "48%" }}
            />
            <TextareaAutosize
              fullWidth
              aria-label="Votre texte"
              style={{
                width: "48%",
                height: "45px",
                resize: "none",
                padding: "5px",
              }}
              placeholder="Votre remarque ici..."
            />
          </Box>
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
              }}
              color="error"
            >
              Annuler
            </Button>
            <Button variant="contained">Valider</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Modifier;
