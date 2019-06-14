import React, { Component, Fragment } from "react";
import { Triple } from "react-preloading-component";

import Search from "../Common/Search";
import Event from "./Event";

import { PreLoader, Button, CardGroup, LineLoader } from "../../styles/Styles";
import { reload } from "../../utils/utils";
import { getUrlDetails } from "../../config/config";

const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();

export default class EventsList extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      error: "",
      searchValue: "",
      searchData: [],
      searchError: "",
      limit: 0,
      characterId: 0
    };
  }

  async componentDidMount() {
    const { characterId } = this.props;

    let limit = 0;
    let dataUrl = `${baseUrl}/v1/public/events?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    if (characterId) {
      dataUrl = `${baseUrl}/v1/public/events/${characterId}/characters?limit=4&offset=${this
        .state.limit + 4}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

      limit = this.state.limit + 4;
    }

    let eventsData = await fetch(dataUrl);

    if (eventsData.status !== 200) {
      return this.setState({
        error: "Error Loading Events, Please Try Again"
      });
    }

    eventsData = await eventsData.json();
    let results = eventsData.data.results;

    this.setState({
      events: results,
      error: "",
      limit: limit,
      characterId: characterId
    });
  }

  handleSearch = async e => {
    e.preventDefault();

    this.setState({ searchData: [] });
    if (this.state.searchValue.length > 0) {
      let eventsData = await fetch(
        `${baseUrl}/v1/public/events?name=${
          this.state.searchValue
        }&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      );

      if (eventsData.status !== 200) {
        return this.setState({
          error: `${eventsData.statusText}, Please Try Again`
        });
      }

      eventsData = await eventsData.json();
      const results = eventsData.data.results;

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

  onSearchChange = e => {
    const searchValue = e.target.value;
    this.setState({ searchValue });

    if (searchValue.length === 0) {
      this.setState({ searchData: [], searchError: "", error: "" });
    }
  };


  handleMoreEvents = async () => {
    const { events, characterId } = this.state;

    let data = "";

    if (characterId) {
      data = await fetch(
        `${baseUrl}/v1/public/events/${characterId}/characters?limit=4&offset=${this
          .state.limit + 4}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      );
    }

    data = await data.json();
    let results = data.data.results;

    let newEvents = events.concat(results);

    this.setState({
      characters: newEvents,
      error: "",
      limit: this.state.limit + 4
    });
  };

  render() {
    const { events, error, characterId } = this.state;
    let SearchComponent = (
      <Search
        handleSearch={this.handleSearch}
        onSearchChange={this.onSearchChange}
      />
    );

    if (error) {
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

    // If character id is present check if there is a event for that character.
    if (characterId) {
      if (events.length === 0) {
        return (
          <p className="text-center mt-5 mb-5 pb-5">
            No Character Found for this Event.
          </p>
        );
      }

      return (
        <CardGroup>
          {events.map((event, i) => {
            if (events.length - 1 === i) {
              return (
                <Fragment key={`${event.id}${i}`}>
                  <Event event={event} />
                  <div className="mb-5" style={{ margin: "0 auto" }}>
                    <Button onClick={this.handleMoreEvents}>
                      Load More
                    </Button>
                  </div>
                </Fragment>
              );
            } else {
              return <Event key={`${event.id}${i}`} event={event} />;
            }
          })}
        </CardGroup>
      );
    }

    let Loader = <LineLoader />;
    if (events.length === 0) {
      if (!this.props.characterId) {
        Loader = <Triple color="#CC0000" size={80} />;
      }
      return <div className="mt-5 mb-5">{Loader}</div>;
    }

    if (events.length === 0) {
      return (
        <div className="mt-5 mb-5">
          <Triple color="#CC0000" size={80} />
        </div>
      );
    }

    let mapData = this.state.events;
    if (this.state.searchData.length > 0) {
      mapData = this.state.searchData;
    }

    return (
      <>
        {SearchComponent}

        <CardGroup>
          {mapData.map(event => (
            <Event key={event.id} event={event} />
          ))}
        </CardGroup>
      </>
    );
  }
}
