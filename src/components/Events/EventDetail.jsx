import React, { useState } from "react";
import { Triple } from "react-preloading-component";

import ComicsList from "../Comics/ComicsList";
import { trimWord } from "../../utils/utils";
import { getUrlDetails } from "../../config/config";
import { PreLoader, Card, H3, H2 } from "../../styles/Styles";

const { baseUrl, timeStamp, publicKey, hash } = getUrlDetails();

export default function EventDetail(props) {
  const [event, setEvent] = useState([]);

  async function fetDetail() {
    let data = await fetch(
      `${baseUrl}/v1/public/events/${
        props.match.params.event_id
      }?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    );
    data = await data.json();

    // let datacharacters = await fetch(
    //   `${baseUrl}/v1/public/events/${
    //     props.match.params.event_id
    //   }/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    // );

    // datacharacters = await datacharacters.json();
    //   console.log(datacharacters)

    setEvent(data.data.results[0]);
  }

  if (event.length === 0) {
    fetDetail();

    return (
      <PreLoader>
        <Triple color="#CC0000" size={80} />
      </PreLoader>
    );
  }

  let imageUrl = `${event.thumbnail.path}.${event.thumbnail.extension}`;

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
                {trimWord(event.title, 0, "Name")}
              </p>
              <img
                src={imageUrl}
                style={{
                  width: "300px",
                  height: "300px",
                  margin: "0 auto",
                  borderRadius: "50%"
                }}
                alt={event.name}
              />
            </div>

            <H3 className="text-center mt-3">
              {trimWord(event.description, 0, "Description")}
            </H3>
          </div>
        </div>
      </Card>

      <H2>Event Comics</H2>
      <ComicsList eventId={event.id} />
    </div>
  );
}
