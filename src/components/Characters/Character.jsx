import React from "react";

export default function Characters({ character }) {
  const { name, thumbnail, description } = character;
  // console.log(character);
  let imageUrl = `${thumbnail.path}/detail.${thumbnail.extension}`;

  const trimWord = string => {
    if (!string) {
      return "No Description available for this character.";
    }

    return `${string.substring(0, 40)}...`;
  };
  return (
    <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
      <div className="card ">
        <div className="view overlay">
          <img
            className="card-img-top"
            src={imageUrl}
            alt={name}
            style={{ height: "300px" }}
          />
          <a href="#!">
            <div className="mask rgba-white-slight" />
          </a>
        </div>

        <div className="card-body">
          <h4 className="card-title">{name}</h4>

          <p className="card-text">{trimWord(description)}</p>

          <a href="##" className="btn btn-outline-secondary waves-effect">
            More
          </a>
        </div>
      </div>
    </div>
  );
}
