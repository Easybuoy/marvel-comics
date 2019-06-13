import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

function Navbar(props) {
  const { pathname } = props.location;
  let homeClassName = "nav-item";
  let charactersClassName = "nav-item";
  let comicsClassName = "nav-item";
  let eventsClassName = "nav-item";

  if (pathname === "/") {
    homeClassName = "nav-item active";
    charactersClassName = "nav-item";
    comicsClassName = "nav-item";
    eventsClassName = "nav-item";
  } else if (pathname === "/characters") {
    homeClassName = "nav-item";
    charactersClassName = "nav-item active";
    comicsClassName = "nav-item";
    eventsClassName = "nav-item";
  } else if (pathname === "/comics") {
    homeClassName = "nav-item";
    charactersClassName = "nav-item";
    comicsClassName = "nav-item active";
    eventsClassName = "nav-item";
  } else if (pathname === "/events") {
    homeClassName = "nav-item";
    charactersClassName = "nav-item";
    comicsClassName = "nav-item";
    eventsClassName = "nav-item active";
  } else {
    homeClassName = "nav-item";
    charactersClassName = "nav-item";
    comicsClassName = "nav-item";
    eventsClassName = "nav-item";
  }
  return (
    <nav className="mb-1 navbar navbar-expand-lg navbar-dark danger-color lighten-1">
      <Link className="navbar-brand font-weight-bold" to="/">
        Marvel Comics
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent-555"
        aria-controls="navbarSupportedContent-555"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
        <ul className="navbar-nav mr-auto">
          <li className={homeClassName}>
            <Link className="nav-link" to="/">
              Home
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className={charactersClassName}>
            <Link className="nav-link" to="/characters">
              Characters
            </Link>
          </li>
          <li className={comicsClassName}>
            <Link className="nav-link" to="/comics">
              Comics
            </Link>
          </li>
          <li className={eventsClassName}>
            <Link className="nav-link" to="/events">
              Events
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto nav-flex-icons">
          <li className="nav-item avatar">
            <Link
              className="nav-link p-0"
              to="//github.com/Easybuoy/"
              target="_blank"
            >
              <i className="fab fa-github fa-lg white-text mr-md-5 mr-3"> </i>
            </Link>
          </li>
          <li className="nav-item avatar">
            <Link
              className="nav-link p-0"
              to="//twitter.com/Easybuoy/"
              target="_blank"
            >
              <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3"> </i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);

Navbar.propTypes = {
  location: PropTypes.object.isRequired
};
