import React from "react";
import { Link } from "react-router-dom";

import { Card } from "../../styles/Styles";
import { formImage, trimWord } from "../../utils/utils";

export default function Comic({ comic }) {
  const { thumbnail, title, urls } = comic;
  const url = urls[0].url.replace("http://", "");
  const ariaLabel = `Read more about ${title}`;
  const imageUrl = formImage(thumbnail.path, "", thumbnail.extension);
  return (
    <div className="col-lg-3 col-md-4 col-sm-12 mb-4 ">
      <Card hover transform="true">
        <div className="card">
          <div className="view overlay">
            <img className="card-img-top" src={imageUrl} alt={title} />

            <Link to={`//${url}`} target="_blank" aria-label={ariaLabel}>
              <div className="mask rgba-white-slight" />
            </Link>
          </div>

          <div className="card-body">
            <h4 className="card-title">{trimWord(title, 30, "Title")}</h4>
          </div>
        </div>
      </Card>
    </div>
  );
}
