import React, { Component, Fragment } from "react";
import { Triple } from "react-preloading-component";
import PropTypes from "prop-types";

import { Button, LineLoader, CardGroup, PreLoader } from "../../styles/Styles";

import Comic from "./Comic";
import Search from "../Common/Search";
import { reload } from "../../utils/utils";
import { getUrlDetails } from "../../config/config";

const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();

export default class ComicsList extends Component {
  constructor() {
    super();
    this.state = {
      comics: [],
      characterId: 0,
      eventId: 0,
      limit: 0,
      searchValue: "",
      searchData: [],
      searchError: "",
      error: ""
    };
  }

  async componentDidMount() {
    const { characterId, eventId } = this.props;
    let limit = 0;
    let dataUrl = `${baseUrl}/v1/public/comics?limit=100&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
    if (characterId) {
      dataUrl = `${baseUrl}/v1/public/characters/${characterId}/comics?limit=4&offset=${this
        .state.limit + 4}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

      limit = this.state.limit + 4;
    }

    let data = await fetch(dataUrl);

    if (eventId) {
      data = await fetch(
        `${baseUrl}/v1/public/events/${eventId}/comics?limit=4&offset=${this
          .state.limit + 4}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      );
      limit = this.state.limit + 4;
    }

    if (data.status !== 200) {
      return this.setState({
        error: "Error Loading Comics, Please Try Again"
      });
    }

    data = await data.json();
    let results = data.data.results;

    this.setState({
      comics: results,
      characterId: characterId,
      limit: limit,
      eventId: eventId
    });
  }

  handleMoreComics = async () => {
    const { characterId, comics, eventId } = this.state;

    let data = "";
    if (characterId) {
      data = await fetch(
        `${baseUrl}/v1/public/characters/${characterId}/comics?limit=4&offset=${this
          .state.limit + 4}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      );
    }

    if (eventId) {
      data = await fetch(
        `${baseUrl}/v1/public/events/${eventId}/comics?limit=4&offset=${this
          .state.limit + 4}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      );
    }

    data = await data.json();
    let results = data.data.results;

    let newComics = comics.concat(results);

    this.setState({
      comics: newComics,
      error: "",
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
      let comicData = await fetch(
        `${baseUrl}/v1/public/characters?name=${
          this.state.searchValue
        }&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      );

      if (comicData.status !== 200) {
        return this.setState({
          error: `${comicData.statusText}, Please Try Again`
        });
      }

      comicData = await comicData.json();
      const results = comicData.data.results;

      if (results.length === 0) {
        return this.setState({
          searchError: "No Match Found For Search Criteria",
          error: ""
        });
      }
      this.setState({
        searchData: results,
        searchValue: "",
        searchError: "",
        error: ""
      });
    }
  };

  render() {
    const { comics, characterId, eventId } = this.state;

    if (this.state.error) {
      return (
        <PreLoader>
          {this.state.error} <br />
          <Button onClick={reload}>Reload</Button>
        </PreLoader>
      );
    }

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
        <CardGroup>
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
        </CardGroup>
      );
    }

    // If event id is present check if there is a comic for that event.
    if (eventId) {
      if (comics.length === 0) {
        return (
          <p className="text-center mt-5 mb-5 pb-5">
            No Comic Found for this Event.
          </p>
        );
      }

      return (
        <CardGroup>
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
        </CardGroup>
      );
    }

    let Loader = <LineLoader />;
    if (comics.length === 0) {
      if (!this.props.characterId && !this.props.eventId) {
        Loader = <Triple color="#CC0000" size={80} />;
      }
      return <div className="mt-5 mb-5">{Loader}</div>;
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
