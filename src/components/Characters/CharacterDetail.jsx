import React, { useState } from "react";
import { Triple } from "react-preloading-component";

import { trimWord } from "../../utils/utils";
import { getUrlDetails } from "../../config/config";

const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();
console.log(baseUrl);
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

  console.log(character);
  console.log(imageUrl);

  return (
    // <div
    //   style={{
    //     backgroundImage: imageStyle,
    //     height: "100vh",
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center"
    //   }}
    // > </div>
    // <div class="card">
    //   <div class="card-body">
    //     <img
    //       src="http://i.annihil.us/u/prod/marvel/i/mg/b/03/52740e4619f54.jpg"
    //       style={{ width: "100%" }}
    //       alt="a"
    //     />
    //     This is some text within a panel body.
    //   </div>
    // </div>
    <div className="mb-5">
      <div className="card">
        <div className="card-body" style={{ flexWrap: "wrap" }}>
          <div
            className="card-img"
            style={{ width: "100%", textAlign: "center" }}
          >
            <img
              src={imageUrl}
              style={{
                width: "300px",
                height: "300px",
                margin: "0 auto",
                borderRadius: "50%"
              }}
              alt="a"
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

      <h1>Comics</h1>
    </div>
  );
}
