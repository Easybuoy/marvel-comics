import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CharactersList from "./components/Characters/CharactersList";

// import './App.css';
import { getUrlDetails } from "./config/config";

const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: []
    };
  }

  async componentDidMount() {
    let characterData = await fetch(
      `${baseUrl}/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    );
    characterData = await characterData.json();
    console.log(characterData);
    const results = characterData.data.results;
    console.log(results);
    this.setState({ characters: results });
  }
  render() {
    if (this.state.characters.length === 0) {
    }
    // let CharactersListComponent = (
    //   <CharactersList characters={this.state.characters} />
    // );
    return (
      <Router>
        <Navbar />

        <Route
          exact
          path="/"
          render={() => <Dashboard characters={this.state.characters} />}
        />
        <Route
          exact
          path="/characters"
          render={() => <CharactersList characters={this.state.characters} />}
        />

        <Footer />
      </Router>
    );
  }
}

// import New from "./New";
