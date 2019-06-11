import React, { useState } from "react";
import { Triple } from "react-preloading-component";

import ComicsList from "../Comics/ComicsList";
import { trimWord } from "../../utils/utils";
import { getUrlDetails } from "../../config/config";
import { PreLoader, Card, H3, H2 } from "../../styles/Styles";

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
      <PreLoader>
        <Triple color="#CC0000" size={80} />
      </PreLoader>
    );
  }

  let imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;

  return (
    <div className="col-lg-12 col-md-12 col-sm-12 text-center">
      <Card>
        <div className="card">
          <div className="card-body characterDetail">
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

            <H3 className="text-center mt-3">
              {trimWord(character.description, 0, "Description")}
            </H3>
          </div>
        </div>
      </Card>

      <H2>Character Comics</H2>
      <ComicsList characterId={character.id} />
    </div>
  );
}
