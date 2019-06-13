import React from "react";
import { NotFound as StyledNotFound, Button } from "../../styles/Styles";
import { Link } from "react-router-dom";

import NotFoundImg from "../../assets/not-found.png";

export default function NotFound() {
  return (
    <StyledNotFound>
      <img src={NotFoundImg} alt="Not found" />
      <Link to="/">
        <Button className="text-center">Back To Home</Button>
      </Link>
    </StyledNotFound>
  );
}
