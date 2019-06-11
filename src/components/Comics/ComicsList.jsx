import React, { Component, Fragment } from "react";
import { Triple } from "react-preloading-component";
import PropTypes from "prop-types";

import { Button, LineLoader, CardGroup, PreLoader } from "../../styles/Styles";

import Comic from "./Comic";
import { getUrlDetails } from "../../config/config";
import Search from "../Common/Search";

const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();

export default class ComicsList extends Component {
  constructor() {
    super();
    this.state = {
      comics: [],
      characterId: 0,
      limit: 0,
      searchValue: "",
      searchData: [],
      searchError: ""
    };
  }

  async componentDidMount() {
    const { characterId } = this.props;
    let limit = 0;
    let data = await fetch(
      `${baseUrl}/v1/public/comics?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    );

    if (characterId) {
      data = await fetch(
        `${baseUrl}/v1/public/characters/${characterId}/comics?limit=4&offset=${this
          .state.limit + 4}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      );
      limit = this.state.limit + 4;
    }

    data = await data.json();
    let results = data.data.results;

    this.setState({
      comics: results,
      characterId: characterId,
      limit: limit
    });
  }

  handleMoreComics = async () => {
    const { characterId, comics } = this.state;

    let data = await fetch(
      `${baseUrl}/v1/public/characters/${characterId}/comics?limit=4&offset=${this
        .state.limit + 4}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    );

    data = await data.json();
    let results = data.data.results;

    let newComics = comics.concat(results);

    this.setState({
      comics: newComics,

      limit: this.state.limit + 4
    });
  };

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
    const { comics, characterId } = this.state;

    // If character id is present check if there is a comic for that character.
    if (characterId) {
      if (comics.length === 0) {
        return (
          <p className="text-center mt-5 mb-5 pb-5">
            No Comic Found for this Character.
          </p>
        );
      }

      return (
        <div className="card-group mb-5">
          {comics.map((comic, i) => {
            if (comics.length - 1 === i) {
              return (
                <Fragment key={`${comic.id}${i}`}>
                  <Comic comic={comic} />
                  <div className="mb-5" style={{ margin: "0 auto" }}>
                    <Button onClick={this.handleMoreComics}>Load More</Button>
                  </div>
                </Fragment>
              );
            } else {
              return <Comic key={`${comic.id}${i}`} comic={comic} />;
            }
          })}
        </div>
      );
    }

    if (comics.length === 0) {
      return (
        <div className="mt-5 mb-5">
          {this.props.characterId ? (
            <LineLoader />
          ) : (
            <Triple color="#CC0000" size={80} />
          )}
        </div>
      );
    }
    let SearchComponent = (
      <Search
        handleSearch={this.handleSearch}
        onSearchChange={this.onSearchChange}
      />
    );

    if (this.state.searchError) {
      return (
        <>
          {SearchComponent}
          <PreLoader>{this.state.searchError}</PreLoader>;
        </>
      );
    }

    let mapData = this.state.comics;
    if (this.state.searchData.length > 0) {
      mapData = this.state.searchData;
    }

    return (
      <>
        {SearchComponent}
        <h2 className="text-center mb-3">Comics</h2>
        <CardGroup>
          {mapData.map(comic => {
            return <Comic key={comic.id} comic={comic} />;
          })}
        </CardGroup>
      </>
    );
  }
}

ComicsList.propTypes = {
  characterId: PropTypes.number
};
