import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/Dashboard/index";
import Demande from "./components/Demande/Demande";
import Facture from "./components/Facture/Facture";
import Commande from "./components/Commande/Commande";
import axios from "axios";
import { useEffect } from "react";
import Analyse from "./components/Analyse/Analyse";
import Article from "./components/Article/Article";
import Utilisateur from "./components/Utilisateur/Utilisateur";
import Reception from "./components/Reception/Reception";
import Fournisseur from "./components/Fournisseur/Fournisseur";

function App() {
  var [data, setData] = useState([]);
  var [dataCommande, setDataCommande] = useState([]);
  var [dataArticle, setDataArticle] = useState([]);
  var [dataUtilisateur, setDataUtilisateur] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/demande/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
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

  useEffect(() => {
    var token = sessionStorage.getItem("token");
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:8080/article/getAll`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataArticle(res.data);
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
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Dashboard
                data={data}
                setData={setData}
                dataUtilisateur={dataUtilisateur}
                setDataUtilisateur={setDataUtilisateur}
              />
            }
          >
            <Route path="/" element={<Analyse data={data} />} />
            <Route
              path="/demande"
              element={<Demande data={data} setData={setData} />}
            />
            <Route
              path="/commande"
              element={
                <Commande data={dataCommande} setData={setDataCommande} />
              }
            />
            <Route path="/facture" element={<Facture />} />
            <Route path="/reception" element={<Reception />} />
            <Route path="/fournisseur" element={<Fournisseur />} />
            <Route
              path="/article"
              element={<Article data={dataArticle} setData={setDataArticle} />}
            />
            <Route
              path="/utilisateur"
              element={<Utilisateur />}
              dataUtilisateur={dataUtilisateur}
              setDataUtilisateur={setDataUtilisateur}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
