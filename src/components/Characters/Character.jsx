import React from "react";

export default function Characters({ character }) {
  const { name, thumbnail, description } = character;
  console.log(character);
  let imageUrl = `${thumbnail.path}/detail.${thumbnail.extension}`;

  return (
    <div className="col-lg-3 col-md-3 col-sm-12 mb-4">
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

          <p className="card-text">{description}</p>

          <a href="##" className="btn btn-outline-secondary waves-effect">
            More
          </a>
        </div>
      </div>
    </div>
  );
}
