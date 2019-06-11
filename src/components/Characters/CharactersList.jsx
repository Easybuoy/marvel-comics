import React, { Component } from "react";
import { Triple } from "react-preloading-component";

import Character from "./Character";
import Search from "../Common/Search";
import { getUrlDetails } from "../../config/config";
import { PreLoader, H2, CardGroup } from "../../styles/Styles";

const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();

export default class CharactersList extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      limit: 0,
      offset: 0,
      error: ""
    };
  }

  async componentDidMount() {
    let characterData = await fetch(
      `${baseUrl}/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    );

    if (characterData.status !== 200) {
      return this.setState({
        error: `${characterData.statusText}, Please Try Again`
      });
    }

    characterData = await characterData.json();
    const results = characterData.data.results;
    // console.log(results);
    this.setState({ characters: results });
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }

    if (this.state.characters.length === 0) {
      return (
        <PreLoader>
          <Triple color="#CC0000" size={80} />
        </PreLoader>
      );
    }
    return (
      <>
        <Search />

        <H2>Characters</H2>
        <CardGroup>
          {this.state.characters.map(character => {
            return <Character key={character.id} character={character} />;
          })}
        </CardGroup>
      </>
    );
  }
}
