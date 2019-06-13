import React from "react";

export default function Footer() {
  return (
    <footer className="page-footer font-small danger-color-dark darken-3 mt-3 fixed-bottom">
      <div className="footer-copyright text-center py-3">
        Data provided by Marvel. © {new Date().getFullYear()}
        <a href="https://https://www.marvel.com/" className="font-weight-bold">
          {" "}
          MARVEL
        </a>
      </div>
    </footer>
  );
}
