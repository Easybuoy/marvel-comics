import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CharactersList from "./components/Characters/CharactersList";
import CharacterDetail from "./components/Characters/CharacterDetail";
import ComicList from "./components/Comics/ComicsList";
import EventsList from "./components/Events/EventsList";
import EventDetail from "./components/Events/EventDetail";
import NotFound from "./components/Common/NotFound";
// import Profile from "./components/Profile/Profile";

export default function App(props) {
  return (
    <Router>
      <Navbar location={props.location} />

      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/characters/:character_id" component={CharacterDetail} />
        <Route exact path="/characters" component={CharactersList} />
        <Route exact path="/comics" component={ComicList} />
        <Route exact path="/events" component={EventsList} />
        <Route exact path="/event/:event_id" component={EventDetail} />
        <Route path="*" component={NotFound} />
        {/* <Route exact path="/profile" component={Profile} /> */}
      </Switch>

      <Footer />
    </Router>
  );
}
