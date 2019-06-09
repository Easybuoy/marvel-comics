import React from "react";
import Character from "./Character";

export default function Characters({ characters }) {
  return (
    <div className="card-group">
      {characters.map(character => {
        return <Character key={character.id} character={character} />;
      })}
    </div>
  );
}
