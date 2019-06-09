import React, { Component } from "react";
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
    return (
      <div className="App">
        <Navbar />
        <h1>Marvel Comics</h1>

        <CharactersList characters={this.state.characters} />
        <Footer />
      </div>
    );
  }
}

// import New from "./New";
