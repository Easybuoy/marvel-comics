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
      characters: [],
      limit: 0,
      offset: 0
    };
  }

  async componentDidMount() {
    let characterData = await fetch(
      `${baseUrl}/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
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
        <div className="input-group md-form form-sm form-1 pl-5 pr-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
          />
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
