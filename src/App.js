import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CharactersList from "./components/Characters/CharactersList";
import CharacterDetail from "./components/Characters/CharacterDetail";
import ComicList from "./components/Comics/ComicsList";
export default function App(props) {
  return (
    <Router>
      <Navbar location={props.location} />

      <Route exact path="/" component={Dashboard} />
      <Route path="/characters/:character_id" component={CharacterDetail} />
      <Route exact path="/characters" component={CharactersList} />
      <Route exact path="/comics" component={ComicList} />

      <Footer />
    </Router>
  );
}
