import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  FormGroup,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { elGR } from "@mui/material/locale";
import React, { useState } from "react";

function NouveauArticle() {
  var [champ, setChamp]=useState({
    titre:"",
    quantite:"",
    prix_unitaire:"",
    qte_commande:""
  })
  var [field, setField] = useState([champ]);

  function addField() {
    setField([...field, champ]);
  }


  return (
    <Box>
      <Box>
        <Button variant="contained" color="primary" onClick={addField}>
          <Add /> colonne
        </Button>
      </Box>
      <Box>

        {field.map((elt,index) => {
          return (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                variant="outlined"
                name={`titre`}
                size="small"
                sx={{ width: "20%" }}
                label="Titre"
                type="text"
                margin="dense"

              />
              <TextField
                variant="outlined"
                size="small"
                sx={{ width: "20%" }}
                name={`quantite`}
                label="Quantité"
                type="number"
                margin="dense"
              />
              <TextField
                variant="outlined"
                name={`prix_unitaire`}
                label="Prix unitaire"
                size="small"
                sx={{ width: "20%" }}
                type="text"
                margin="dense"
              />
              <TextField
                variant="outlined"
                label="Qte commande"
                name={`qte_commande`}
                size="small"
                sx={{ width: "20%" }}
                type="number"
                margin="dense"
              />
              <Tooltip title="Supprimer">
                <IconButton
                  onClick={() => {
                    console.log(index);
                    setField((field) => field.filter((elt,key) => index !== key));
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )
        })}

        <Button variant="contained">Ajouter</Button>

      </Box>
    </Box>
  );
}

export default NouveauArticle;
