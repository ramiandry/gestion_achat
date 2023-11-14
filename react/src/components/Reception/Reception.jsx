import { Delete, Download, Edit, FileDownload } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Information from "./Information";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    table: {
      width: "100%",
    },
    tableContainer: {
      borderRadius: 15,
      margin: "10px",
    },
    tableCell: {
      color:
        theme.palette.getContrastText(theme.palette.error.dark) + " !important",
      backgroundColor: theme.palette.error.dark,
      fontWeight: "bolder" + " !important",
      textTransform: "capitalize",
    },
  };
});

export default function Reception() {
  const classes = useStyles();
  const [dataReception, setDataReception] = useState([]);
  const header = ["Code", "date", "saisie par", "Receptionniste", "Emplacement","Action"];
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/reception/getAll`, {
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
  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ width: "95%", margin: "auto" }}
        className={classes.tableContainer}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {header.map((data) => (
                <TableCell align="left" className={classes.tableCell}>
                  {data}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataReception.map((data) => {
              return (
                <TableRow>
                  <TableCell scope="row">
                    {data.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {new Date(data.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.nom}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {" "}
                    {data.receptionniste}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {" "}
                    {data.emplacement}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {/*<IconButton >
                      <Delete />
                    </IconButton>*/}
                    {<Information id={data.id} />}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
