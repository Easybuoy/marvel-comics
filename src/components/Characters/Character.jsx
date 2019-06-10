import React from "react";
import { Link } from "react-router-dom";

import { trimWord, formImage } from "../../utils/utils";

export default function Character({ character, history }) {
  const { name, thumbnail } = character;

  const imageUrl = formImage(thumbnail.path, "", thumbnail.extension);
  const link = `/characters/${character.id}`;

  return (
    <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
      <div className="card ">
        <div className="view overlay">
          <img
            className="card-img-top"
            src={imageUrl}
            alt={name}
            style={{ height: "250px" }}
          />
          <a href="#!">
            <div className="mask rgba-white-slight" />
          </a>
        </div>

        <div className="card-body">
          <h4 className="card-title">{trimWord(name, 20, "Name")}</h4>

          <Link
            to={link}
            className="btn btn-outline-secondary waves-effect view-detail"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
