import { Close, Edit, Info } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const option={
    month:"long", year:"numeric", day:"numeric"
}

function Information({ id }) {
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState([]);
  const [demande, setDemande] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/article/getDemande/${id}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setArticle(res.data);
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/demande/getById/${id}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDemande(res.data);
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
  return (
    <>
      <IconButton
        onClick={() => {
          handleClickOpen();
        }}
      >
        <Info />
      </IconButton>
      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle align="center" >Information</DialogTitle>
        <DialogContent>
          <Box>
            <Box sx={{display:"flex", justifyContent:"left", alignItems:"center"}}>
              <Typography sx={{width:"30%"}} variant="h6">Code de demande </Typography>
              <Typography>: {id}</Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent:"left", alignItems:"center"}}>
              <Typography sx={{width:"30%"}} variant="h6">Date de création </Typography>
              <Typography>: {new Date(demande.date).toLocaleDateString("en-gb", option)}</Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent:"left", alignItems:"center"}}>
              <Typography sx={{width:"30%"}} variant="h6">Saisie par </Typography>
              <Typography>: {demande.username}</Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent:"left", alignItems:"center"}}>
              <Typography sx={{width:"30%"}} variant="h6">Validation de budget </Typography>
             <Typography>: {demande.budget
                ? "validé"
                : demande.budget == false
                ? "Réfusé"
                : "Pas de répone"}</Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent:"left", alignItems:"center"}}>
              <Typography sx={{width:"30%"}} variant="h6">Validation de quantité </Typography>
              <Typography>: {demande.quantite
                ? "validé"
                : demande.quantite == false
                ? "Réfusé"
                : "Pas de répone"}</Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent:"left", alignItems:"center"}}>
              <Typography sx={{width:"30%"}} variant="h6">Remarque </Typography>
              <Typography>: {demande.description}</Typography>
            </Box>
          </Box>
          <Divider><Typography variant="h5" align="left">Listes d'articles demandés</Typography></Divider>
          <Box>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="medium"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bolder" }}>Code</TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }} align="right">
                      Description
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }} align="right">
                      Qté Demandé
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }} align="right">
                      Prix Unitaire
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {article.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell scope="row">{row.id}</TableCell>
                      <TableCell component="th" align="right">
                        {row.description}
                      </TableCell>
                      <TableCell align="right">
                        {row.quantite_demande}
                      </TableCell>
                      <TableCell align="right">{row.prix_unitaire}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" color="error" onClick={handleClose}>
            <Close/> Fermer 
            </Button>
            {}
            <Button variant="contained">Validé</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Information;
