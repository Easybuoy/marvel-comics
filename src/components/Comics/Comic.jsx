import React from "react";

import { formImage, trimWord } from "../../utils/utils";

export default function Comic({ comic }) {
  //   console.log(comic);
  const { thumbnail, title } = comic;
  let imageUrl = formImage(thumbnail.path, "", thumbnail.extension);
  return (
    <div className="col-lg-3 col-md-4 col-sm-12 mb-4 ">
      <div className="card comic-card">
        <div className="view overlay">
          <img
            className="card-img-top"
            src={imageUrl}
            alt={title}
            style={{ height: "250px" }}
          />
          <a href="#!">
            <div className="mask rgba-white-slight" />
          </a>
        </div>

        <div className="card-body">
          <h4 className="card-title">{trimWord(title, 30, "Title")}</h4>
        </div>
      </div>
    </div>
  );
}
