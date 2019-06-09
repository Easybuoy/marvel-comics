import React, { Component } from "react";

import { getUrlDetails } from "./config/config";

const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();
export default class New extends Component {
  constructor() {
    super();
    this.state = {
      imgUrl: ""
    };
  }
  async componentDidMount() {
    // let me = await fetch(
    //   `${baseUrl}/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    // );
    // const data = await me.json();
    // const results = data.data.results;
    // console.log(results);
    // let imgUrl = `${results[0].thumbnail.path}/detail.${
    //   results[0].thumbnail.extension
    // }`;
    // this.setState({ imgUrl });
    //   .then(res => res.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        

        <h1>Marvel Comics</h1>
        {/* <img src={this.state.imgUrl} alt="a" /> */}
      </div>
    );
  }
}
