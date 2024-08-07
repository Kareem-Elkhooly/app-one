// Style File --------------------------------------------------
import "./css/footer.css";
// From React and Redux ----------------------------------------
import React from "react";
import { Link } from "react-router-dom";
// Bootstrap Components
import Container from "react-bootstrap/esm/Container";
// React Icons
import { CiFacebook } from "react-icons/ci";
import { PiInstagramLogo } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
// ##############################################################
export default function Footer() {
  const toTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="footer">
      <Container>
        <footer className="page-footer font-small blue pt-4">
          <div className="container-fluid text-start text-md-left">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <p className="footerTitle">RK Store</p>
                <p className="mb-0">
                  We hope you got your product, so come back to us again.
                </p>
                <p>Thanks for your visit in our Store.</p>
              </div>
              <hr className="clearfix w-100 d-md-none pb-0" />
              <div className="col-md-3 mb-md-0 mb-3">
                <p className="footerTitle">Contact US</p>
                <ul className="list-unstyled text-start">
                  <li>
                    <Link className="footerLink" onClick={toTop} to="/about">
                    About & Contact US
                    </Link>
                  </li>
                  <li>
                    <a
                      className="footerLink"
                      target="_blank"
                      href="www.facebook.com/kareem.elkhooly"
                    >
                      <CiFacebook className="footerLinkIcon" /> Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      className="footerLink"
                      target="_blank"
                      href="www.instagram.com/kareemelkhooly/"
                    >
                      <PiInstagramLogo className="footerLinkIcon" /> Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      className="footerLink"
                      target="_blank"
                      href="www.twitter.com/kareem.elkhooly"
                    >
                      <FaXTwitter className="footerLinkIcon" /> X
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 mb-md-0 mb-3">
                <p className="footerTitle">Categories</p>
                <ul className="list-unstyled text-start">
                  <li>
                    <Link className="footerLink" to="/categories/mensclothing" onClick={toTop}>
                      Men's Clothing
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="footerLink"
                      onClick={toTop}
                      to="/categories/womensclothing"
                    >
                      Women's Clothing
                    </Link>
                  </li>
                  <li>
                    <Link className="footerLink" to="/categories/jewelery" onClick={toTop}>
                      Jewelery
                    </Link>
                  </li>
                  <li>
                    <Link className="footerLink" to="/categories/electronics"onClick={toTop}>
                      Electronics
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </Container>
      <div className="footer-copyright">
        © 2024 Copyright: Made By Kareem-Elkhooly
      </div>
    </div>
  );
}
