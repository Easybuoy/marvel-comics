import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CharactersList from "./components/Characters/CharactersList";
import CharacterDetail from "./components/Characters/CharacterDetail";

// import './App.css';
// import { getUrlDetails } from "./config/config";

// const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();
export default class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     characters: []
  //   };
  // }

  // async componentDidMount() {
  //   let characterData = await fetch(
  //     `${baseUrl}/v1/public/characters?offset=80&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
  //   );
  //   characterData = await characterData.json();
  //   console.log(characterData);
  //   const results = characterData.data.results;
  //   console.log(results);
  //   this.setState({ characters: results });
  // }
  render() {
    return (
      <Router>
        <Navbar location={this.props.location} />

        <Route exact path="/" component={Dashboard} />
        <Route path="/characters/:character_id" component={CharacterDetail} />
        <Route exact path="/characters" component={CharactersList} />

        <Footer />
      </Router>
    );
  }
}

// import New from "./New";
