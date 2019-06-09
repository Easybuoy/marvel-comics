import React from "react";
import CharacterList from "../Characters/CharactersList";

export default function Dashboard({ characters }) {
  return (
    <>
      <CharacterList characters={characters} />
    </>
  );
}
