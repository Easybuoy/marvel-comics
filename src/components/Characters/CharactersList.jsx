import React, { Component } from "react";
import { Triple } from "react-preloading-component";
import "./Characters.css";

import Character from "./Character";

import { getUrlDetails } from "../../config/config";

const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();

export default class CharactersList extends Component {
  constructor() {
    super();
    this.state = {
      characters: []
    };
  }

  async componentDidMount() {
    let characterData = await fetch(
      `${baseUrl}/v1/public/characters?offset=80&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    );
    characterData = await characterData.json();
    // console.log(characterData);
    const results = characterData.data.results;
    // console.log(results);
    this.setState({ characters: results });
  }

  render() {
    if (this.state.characters.length === 0) {
      return (
        <div className="preloader">
          <Triple color="#283693" size={80} />
        </div>
      );
    }
    return (
      <>
        <div class="d-flex flex-row-reverse md-form active-purple-2 mb-3 mr-3">
          <input type="text" placeholder="Search" aria-label="Search" />
        </div>
        <h1 className="text-center">Characters</h1>
        <div className="card-group mb-5">
          {this.state.characters.map(character => {
            return <Character key={character.id} character={character} />;
          })}
        </div>
      </>
    );
  }
}
