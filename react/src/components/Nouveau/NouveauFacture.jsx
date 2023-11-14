import {
  Box,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function NouveauFacture({ close }) {
  var [data, setData] = useState([]);
  var [dataReception, setDataReception] = useState([]);
  var [prix_tva, setPrixTva] = useState(0);
  var [commande, setCommande] = useState("");
  var [reception, setReception] = useState("");
  var [date, setDate] = useState("");
  var [filterData, setFilterData] = useState([]);
  const [listeChamps, setListeChamps] = useState([]);

  const changer = (e, index) => {
    const newChamps = listeChamps.map((data, i) => {
      if (index === i) {
        return Object.assign(data, { [e.target.name]: e.target.value });
      } else {
        return data;
      }
    });
    setListeChamps(newChamps);
  };

  const changerPrixTva = (value, index) => {
    const newChamps = listeChamps.map((data, i) => {
      if (index === i) {
        return Object.assign(data, { avec_tva: value });
      } else {
        return data;
      }
    });
    console.log(newChamps);
    setListeChamps(newChamps);
    setPrixTva(
      listeChamps
        .map((data) => data.avec_tva)
        .reduce((prev, curr) => prev + curr, 0)
    );
  };

  const filtrer = (key) => {
    setFilterData(dataReception.filter((data) => data.id_commande == key));
  };

  const searchArticle = (code) => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(
            `http://127.0.0.1:8080/reception_article/getByReception/${code}`,
            {
              cancelToken: source.token,
            }
          )
          .then((res) => {
            setListeChamps(res.data);
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
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/commande/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setData(res.data);
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

  //chercher reception
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8080/reception/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataReception(res.data);
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

  const creerFacture = () => {
    if (date != "" && commande != "" && reception != "") {
      axios
        .post(`http://localhost:8080/facture/create`, {
          utilisateur: { id: sessionStorage.getItem("id") },
          date: date,
          reception: { id: reception },
          commande: { id: commande },
        })
        .then((res) => {
          console.log(res.data);
          creerFactureArticle(res.data.id);
          Swal.fire({
            title: "Enregistré avec succès !!",
            icon: "success",
            padding: "3em",
            width: "600",
            color: "#ff2525",
          });
          close()
        })
        .catch((error) => {
          console.log(error);
        });
    }else {
      Swal.fire({
        title: "Veuillez remplir les champs !!",
        icon: "error",
        padding: "3em",
        width: "600",
        color: "#ff2525",
      });
    }
  };

  const creerFactureArticle = (idfacture) => {
    listeChamps.map((data) => {
      console.log(data.id);
      axios
        .post(`http://127.0.0.1:8080/facture_article/create`, {
          article: {
            id: data.id_article,
          },
          facturation: {
            id: idfacture,
          },
          tva: data.tva,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    close()
  };

  return (
    <Box width={"900px"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "32%", marginX: "5px" }}>
          <InputLabel id="demo-simple-select-label">Code commande</InputLabel>
          <Select
            id="demo-simple-select-label"
            fullWidth
            onChange={(e) => {
              setCommande(e.target.value);
              filtrer(e.target.value);
            }}
          >
            {data.map((data) => {
              return (
                <MenuItem value={data.id} defaultChecked>
                  {data.id}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Box sx={{ width: "32%", marginX: "5px" }}>
          <InputLabel id="demo-simple-select-label">Code Reception</InputLabel>
          <Select
            id="demo-simple-select-label"
            onChange={(e) => {
              searchArticle(e.target.value);
              setReception(e.target.value);
            }}
            fullWidth
          >
            {filterData.map((data) => {
              return <MenuItem value={data.id}>{data.id}</MenuItem>;
            })}
          </Select>
        </Box>
        <Box sx={{ width: "32%", marginX: "5px" }}>
          <InputLabel id="demo-simple-select-label">
            {" "}
            Date de creation
          </InputLabel>
          <TextField
            variant="outlined"
            type="Date"
            name="paiement"
            defaultValue={new Date().getDate()}
            onChange={(e) => setDate(e.target.valueAsDate)}
            margin="dense"
            fullWidth
          />
        </Box>
      </Box>

      {listeChamps.length ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "32%", marginX: "5px" }}>
              <InputLabel id="demo-simple-select-label">Fournisseur</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                name="paiement"
                value={listeChamps[0].fournisseur}
                margin="dense"
                fullWidth
              />
            </Box>
            <Box sx={{ width: "32%", marginX: "5px" }}>
              <InputLabel id="demo-simple-select-label">
                Date de livraison
              </InputLabel>
              <TextField
                variant="outlined"
                type="text"
                name="livraison"
                value={new Date(
                  listeChamps[0].date_livraison
                ).toLocaleDateString("en-gb")}
                margin="dense"
                fullWidth
              />
            </Box>
            <Box sx={{ width: "32%", marginX: "5px" }}>
              <InputLabel id="demo-simple-select-label">
                {" "}
                Nom du receptionniste
              </InputLabel>
              <TextField
                variant="outlined"
                type="text"
                name="receptionniste"
                value={listeChamps[0].receptionniste}
                margin="dense"
                fullWidth
              />
            </Box>
          </Box>
          <Divider>Listes des articles reçue</Divider>
        </>
      ) : null}
      {listeChamps.map((data, index) => (
        <Box
          key={index}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <TextField
            variant="outlined"
            name={`description`}
            size="small"
            sx={{ width: "15%" }}
            label="Description"
            type="text"
            margin="dense"
            value={data.description}
          />
          <TextField
            variant="outlined"
            name={`prix`}
            label="Prix unitaire"
            size="small"
            sx={{ width: "15%" }}
            value={data.prix_unitaire}
            type="text"
            margin="dense"
          />
          <TextField
            variant="outlined"
            label="Qte reçu"
            name={`quantite`}
            value={data.quantite_recu}
            size="small"
            sx={{ width: "15%" }}
            type="number"
            margin="dense"
          />
          <TextField
            variant="outlined"
            label="TVA"
            name={`tva`}
            onChange={(e) => {
              changer(e, index);
              changerPrixTva(
                (data.prix_unitaire + data.prix_unitaire / data.tva) *
                  data.quantite_recu,
                index
              );
            }}
            size="small"
            sx={{ width: "15%" }}
            type="text"
            margin="dense"
          />

          <TextField
            variant="outlined"
            label="Hors TVA"
            name={`hors_tva`}
            value={data.quantite_recu * data.prix_unitaire}
            size="small"
            sx={{ width: "15%" }}
            type="text"
            margin="dense"
          />

          <TextField
            variant="outlined"
            label="Avec TVA"
            name={`avec_tva`}
            value={
              data.tva == "" || data.tav
                ? "0"
                : (
                    (data.prix_unitaire + data.prix_unitaire / data.tva) *
                    data.quantite_recu
                  ).toFixed()
            }
            size="small"
            sx={{ width: "15%" }}
            onChange={(e) => changer(e, index)}
            type="text"
            margin="dense"
          />
        </Box>
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            width: "45%",
            marginX: "5px",
          }}
        >
          <Typography>Total hors taxe: </Typography>
          <TextField
            variant="outlined"
            type="text"
            name="paiement"
            value={listeChamps
              .map((item) => item.quantite_recu * item.prix_unitaire)
              .reduce((prev, curr) => prev + curr, 0)}
            margin="dense"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            width: "45%",
            marginX: "5px",
          }}
        >
          <Typography>Total avec taxe: </Typography>
          <TextField
            variant="outlined"
            type="text"
            name="paiement"
            value={prix_tva}
            margin="dense"
          />
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" color="error" onClick={close}>
          Annuler
        </Button>
        <Button variant="contained" onClick={creerFacture}>
          Valider
        </Button>
      </Box>
    </Box>
  );
}

export default NouveauFacture;
