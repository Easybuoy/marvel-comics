import React, { Component, Fragment } from "react";
import { Triple } from "react-preloading-component";
import PropTypes from "prop-types";

import Character from "./Character";
import Search from "../Common/Search";
import { getUrlDetails } from "../../config/config";
import { reload } from "../../utils/utils";
import {
  PreLoader,
  H2,
  CardGroup,
  Button,
  LineLoader
} from "../../styles/Styles";

const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();

export default class CharactersList extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      limit: 0,
      error: "",
      searchValue: "",
      searchData: [],
      searchError: "",
      eventId: 0
    };
  }

  async componentDidMount() {
    const { eventId } = this.props;

    let limit = 0;
    let dataUrl = `${baseUrl}/v1/public/characters?limit=100&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    if (eventId) {
      dataUrl = `${baseUrl}/v1/public/events/${eventId}/characters?limit=4&offset=${this
        .state.limit + 4}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

      limit = this.state.limit + 4;
    }

    let characterData = await fetch(dataUrl);
    if (characterData.status !== 200) {
      return this.setState({
        error: "Error Loading Characters, Please Try Again"
      });
    }

    characterData = await characterData.json();
    const results = characterData.data.results;

    this.setState({
      characters: results,
      error: "",
      eventId: eventId,
      limit: limit
    });
  }

  onSearchChange = e => {
    const searchValue = e.target.value;
    this.setState({ searchValue, error: "" });

    if (searchValue.length === 0) {
      this.setState({ searchData: [], searchError: "", error: "" });
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

  handleMoreCharacters = async () => {
    const { characters, eventId } = this.state;

    let data = "";

    if (eventId) {
      data = await fetch(
        `${baseUrl}/v1/public/events/${eventId}/characters?limit=4&offset=${this
          .state.limit + 4}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      );
    }

    data = await data.json();
    let results = data.data.results;

    let newCharacters = characters.concat(results);

    this.setState({
      characters: newCharacters,
      error: "",
      limit: this.state.limit + 4
    });
  };

  render() {
    const { characters, eventId } = this.state;

    let SearchComponent = (
      <Search
        handleSearch={this.handleSearch}
        onSearchChange={this.onSearchChange}
      />
    );

    if (this.state.error) {
      return (
        <PreLoader>
          {this.state.error} <br />
          <Button onClick={reload}>Reload</Button>
        </PreLoader>
      );
    }

    if (this.state.searchError) {
      return (
        <>
          {SearchComponent}
          <PreLoader>{this.state.searchError}</PreLoader>;
        </>
      );
    }

    // If character id is present check if there is a comic for that character.
    if (eventId) {
      if (characters.length === 0) {
        return (
          <p className="text-center mt-5 mb-5 pb-5">
            No Character Found for this Event.
          </p>
        );
      }

      return (
        <CardGroup>
          {characters.map((character, i) => {
            if (characters.length - 1 === i) {
              return (
                <Fragment key={`${character.id}${i}`}>
                  <Character character={character} />
                  <div className="mb-5" style={{ margin: "0 auto" }}>
                    <Button onClick={this.handleMoreCharacters}>
                      Load More
                    </Button>
                  </div>
                </Fragment>
              );
            } else {
              return (
                <Character key={`${character.id}${i}`} character={character} />
              );
            }
          })}
        </CardGroup>
      );
    }

    let Loader = <LineLoader />;
    if (characters.length === 0) {
      if (!this.props.characterId && !this.props.eventId) {
        Loader = <Triple color="#CC0000" size={80} />;
      }
      return <div className="mt-5 mb-5">{Loader}</div>;
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
