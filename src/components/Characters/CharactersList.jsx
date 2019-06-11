import React, { Component } from "react";
import { Triple } from "react-preloading-component";
import PropTypes from "prop-types";

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
      error: "",
      searchValue: "",
      searchData: [],
      searchError: ""
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

    this.setState({ characters: results });
  }

  onSearchChange = e => {
    const searchValue = e.target.value;
    this.setState({ searchValue });

    if (searchValue.length === 0) {
      this.setState({ searchData: [], searchError: "" });
    }
  };

  handleSearch = async e => {
    e.preventDefault();

    this.setState({ searchData: [] });
    if (this.state.searchValue.length > 0) {
      let characterData = await fetch(
        `${baseUrl}/v1/public/characters?name=${
          this.state.searchValue
        }&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      );

      if (characterData.status !== 200) {
        return this.setState({
          error: `${characterData.statusText}, Please Try Again`
        });
      }

      characterData = await characterData.json();
      const results = characterData.data.results;

      if (results.length === 0) {
        return this.setState({
          searchError: "No Match Found For Search Criteria"
        });
      }
      this.setState({ searchData: results, searchValue: "", searchError: "" });
    }
  };

  render() {
    let SearchComponent = (
      <Search
        handleSearch={this.handleSearch}
        onSearchChange={this.onSearchChange}
      />
    );

    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }

    if (this.state.searchError) {
      return (
        <>
          {SearchComponent}
          <PreLoader>{this.state.searchError}</PreLoader>;
        </>
      );
    }
    if (this.state.characters.length === 0) {
      return (
        <PreLoader>
          <Triple color="#CC0000" size={80} />
        </PreLoader>
      );
    }

    let mapData = this.state.characters;
    if (this.state.searchData.length > 0) {
      mapData = this.state.searchData;
    }
    return (
      <>
        {SearchComponent}

        <H2>Characters</H2>
        <CardGroup>
          {mapData.map(character => {
            return <Character key={character.id} character={character} />;
          })}
        </CardGroup>
      </>
    );
  }
}

CharactersList.propTypes = {
  characters: PropTypes.number
};
