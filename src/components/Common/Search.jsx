import React from "react";
import PropTypes from "prop-types";

import { Search as StyledSearch, Button } from "../../styles/Styles";

export default function Search({ handleSearch, onSearchChange }) {
  return (
    <StyledSearch>
      <form>
        <input
          onChange={onSearchChange}
          type="text"
          placeholder="Search"
          aria-label="Search"
          required="required"
        />
        <Button onClick={handleSearch}>Search</Button>
      </form>
    </StyledSearch>
  );
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired
};
