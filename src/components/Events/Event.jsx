import React from "react";
import { Link } from "react-router-dom";

import { Card, Button } from "../../styles/Styles";
import { formImage, trimWord } from "../../utils/utils";

export default function Event({ event }) {
  const { title, thumbnail } = event;

  const imageUrl = formImage(thumbnail.path, "", thumbnail.extension);
  const link = `/event/${event.id}`;
  const ariaLabel = `Read more about ${title}`;

  return (
    <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
      <Card transform="true">
        <div className="card ">
          <div className="view overlay">
            <img className="card-img-top" src={imageUrl} alt={title} />
            <Link to={link} aria-label={ariaLabel}>
              <div className="mask rgba-white-slight" />
            </Link>
          </div>

          <div className="card-body">
            <h4 className="card-title">{trimWord(title, 20, "Name")}</h4>

            <Link to={link} aria-label={ariaLabel}>
              <Button>View</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
