import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useTheme, styled } from "@mui/material/styles";
import axios from "axios";
import DescriptionModal from "./DescriptionModal";
import { Block, CheckCircle, Unpublished } from "@mui/icons-material";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.error.main,
    color: "#FFF",
    fontWeight: "bolder",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Utilisateur() {
  const theme = useTheme();
  var [dataUtilisateur, setDataUtilisateur] = useState([]);

  const getData = () => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/utilisateur/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            setDataUtilisateur(res.data);
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
    getData();
  }, []);

  const editStatus = (id, res) => {
    Swal.fire({
      title: `Etes-vous sûre de ${res?"Bloquer":"Autoriser"} cette utilisateur?`,
      icon: "question",
      padding: "3em",
      width: "600",
      color: "#ff2525",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      denyButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:8080/utilisateur/editStatus/${id}`)
          .then((res) => {
            console.log(res.data);
            getData();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <Divider textAlign="left" className="divider" sx={{ marginBottom: 2 }}>
        <Typography variant="h4" color={theme.palette.error.main}>
          Listes des utilisateurs
        </Typography>
      </Divider>
      <TableContainer component={Paper} style={{ overflow: "hidden" }}>
        <Table
          style={{ minWidth: 400, width: "100%" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Avatar</StyledTableCell>
              <StyledTableCell align="left">Nom et Prénom</StyledTableCell>
              <StyledTableCell align="left">Role</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              {/*<StyledTableCell align="left">Mot de passe</StyledTableCell>*/}
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataUtilisateur.map((data) => {
              return (
                <StyledTableRow key={data.userId}>
                  <StyledTableCell align="left">
                    <Avatar
                      src={
                        "http://127.0.0.1:8080/utilisateur/image/" + data.userId
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {data.userUsername}
                  </StyledTableCell>
                  <StyledTableCell align="left">{data.type}</StyledTableCell>
                  <StyledTableCell align="left">
                    {data.userEmail}
                  </StyledTableCell>
                  {/*<StyledTableCell align="left">{data.userMdp}</StyledTableCell>*/}
                  <StyledTableCell align="left">
                    {data.userValide == 0 ? "Bloqué" : "Autorisé"}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <DescriptionModal id={data.userId} />

                    <IconButton onClick={() => editStatus(data.userId, data.userValide)}>
                      {data.userValide == 0 ? <CheckCircle /> : <Unpublished />}
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Utilisateur;
