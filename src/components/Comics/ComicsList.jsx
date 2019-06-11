import React, { Component, Fragment } from "react";
import { Triple } from "react-preloading-component";

import { Button, LineLoader } from "../../styles/Styles";

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
      limit: 0
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
            <Triple color="#283693" size={80} />
          )}
        </div>
      );
    }

    return (
      <>
        <Search />
        <h2 className="text-center mb-3">Comics</h2>
        <div className="card-group mb-5">
          {comics.map(comic => {
            return <Comic key={comic.id} comic={comic} />;
          })}
        </div>
      </>
    );
  }
}
