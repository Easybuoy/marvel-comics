import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav className="mb-1 navbar navbar-expand-lg navbar-dark indigo lighten-1">
        <a className="navbar-brand" href="##">
          Marvel Comics
        </a>
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
            <li className="nav-item active">
              <a className="nav-link" href="##">
                Home
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="##">
                Characters
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="##">
                Comics
              </a>
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
