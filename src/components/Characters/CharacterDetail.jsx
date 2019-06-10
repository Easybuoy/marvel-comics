import React, { useState } from "react";
import { Triple } from "react-preloading-component";

import ComicsList from "../Comics/ComicsList";
import { trimWord } from "../../utils/utils";
import { getUrlDetails } from "../../config/config";

const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();

export default function CharacterDetail(props) {
  const [character, setCharacter] = useState([]);

  async function fetDetail() {
    let data = await fetch(
      `${baseUrl}/v1/public/characters/${
        props.match.params.character_id
      }?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    );
    data = await data.json();

    setCharacter(data.data.results[0]);
  }

  if (character.length === 0) {
    fetDetail();

    return (
      <div className="preloader">
        <Triple color="#283693" size={80} />
      </div>
    );
  }

  let imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;

  return (
    <div className="col-lg-12 col-md-12 col-sm-12 text-center">
      <div className="card">
        <div
          className="card-body"
          style={{
            flexWrap: "wrap",
            backgroundColor: "#202a76",
            color: "#ffffff"
          }}
        >
          <div className="card-img" style={{ textAlign: "center" }}>
            <p
              className="text-center mt-3"
              style={{
                width: "100%",
                fontSize: "1.5rem",

                fontWeight: "bolder"
              }}
            >
              {trimWord(character.name, 0, "Name")}
            </p>
            <img
              src={imageUrl}
              style={{
                width: "300px",
                height: "300px",
                margin: "0 auto",
                borderRadius: "50%"
              }}
              alt={character.name}
            />
          </div>

          <p
            className="text-center mt-3"
            style={{ width: "100%", fontSize: "1.2rem" }}
          >
            {trimWord(character.description, 0, "Description")}
          </p>
        </div>
      </div>

      <h1 className="text-center mt-5 mb-5">Character Comics</h1>
      <ComicsList characterId={character.id} />
    </div>
  );
}
