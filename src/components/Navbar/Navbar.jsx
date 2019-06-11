import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navbar(props) {
  const { pathname } = props.location;
  let homeClassName = "nav-item";
  let charactersClassName = "nav-item";
  let comicsClassName = "nav-item";
  if (pathname === "/") {
    homeClassName = "nav-item active";
    charactersClassName = "nav-item";
    comicsClassName = "nav-item";
  } else if (pathname === "/characters") {
    homeClassName = "nav-item";
    charactersClassName = "nav-item active";
    comicsClassName = "nav-item";
  } else if (pathname === "/comics") {
    homeClassName = "nav-item";
    charactersClassName = "nav-item";
    comicsClassName = "nav-item active";
  } else {
    homeClassName = "nav-item";
    charactersClassName = "nav-item";
    comicsClassName = "nav-item";
  }
  return (
    <div>
      <nav className="mb-1 navbar navbar-expand-lg navbar-dark indigo lighten-1">
        <Link className="navbar-brand" to="/">
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
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent-555"
        >
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
          </ul>
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <li className="nav-item avatar">
              <a className="nav-link p-0" href="##">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
                  className="rounded-circle z-depth-0"
                  alt="avatar"
                  height="35"
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
