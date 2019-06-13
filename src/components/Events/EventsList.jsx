import React, { Component } from "react";
import { Triple } from "react-preloading-component";

import Search from "../Common/Search";
import Event from "./Event";

import { PreLoader, Button, CardGroup } from "../../styles/Styles";
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
      searchError: ""
    };
  }

  async componentDidMount() {
    let eventsData = await fetch(
      `${baseUrl}/v1/public/events?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    );
    if (eventsData.status !== 200) {
      return this.setState({
        error: `${eventsData.statusText}, Please Try Again`
      });
    }

    eventsData = await eventsData.json();
    let results = eventsData.data.results;

    this.setState({
      events: results,
      error: ""
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
      console.log(results);
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

  render() {
    const { events, error } = this.state;
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
