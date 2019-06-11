import React from "react";

export default function Footer() {
  return (
    <footer className="page-footer font-small danger-color-dark darken-3 mt-3 fixed-bottom">
      {/* <div className="container">
        <div className="row">
          <div className="col-md-12 py-5">
            <div className="mb-5 flex-center">
              <a href="##" className="fb-ic">
                <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>

              <a href="##" className="tw-ic">
                <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>

              <a href="##" className="gplus-ic">
                <i className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>

              <a href="##" className="li-ic">
                <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>

              <a href="##" className="ins-ic">
                <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>

              <a href="##" className="pin-ic">
                <i className="fab fa-pinterest fa-lg white-text fa-2x"> </i>
              </a>
            </div>
          </div>
        </div>
      </div> */}

      <div className="footer-copyright text-center py-3">
        © {new Date().getFullYear()}
        <a href="https://https://www.marvel.com/" className="font-weight-bold">
          {" "}
          MARVEL
        </a>
      </div>
    </footer>
  );
}
