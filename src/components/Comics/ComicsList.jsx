import React, { Component, Fragment } from "react";

import "./Comic.css";

import Comic from "./Comic";
import { getUrlDetails } from "../../config/config";

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
    let data = "";
    if (characterId) {
      data = await fetch(
        `${baseUrl}/v1/public/characters/${characterId}/comics?limit=4&offset=${this
          .state.limit + 4}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      );
    }

    data = await data.json();
    let results = data.data.results;

    this.setState({
      comics: results,
      characterId,
      limit: this.state.limit + 4
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
    console.log(results);
    let newComics = comics.concat(results);

    console.log(newComics);
    this.setState({
      comics: newComics,

      limit: this.state.limit + 4
    });
  };

  render() {
    const { comics } = this.state;
    if (comics.length === 0) {
      return (
        <div className="mt-5 mb-5">
          <div className="line-loader pt-5 pb-5" />
        </div>
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
                  <button
                    className="btn btn-secondary"
                    onClick={this.handleMoreComics}
                  >
                    Load More
                  </button>
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
}
