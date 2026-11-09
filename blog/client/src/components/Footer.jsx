import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section>
      <footer>
        <div className="container">
          <div className="row g-5">
            <div className="col-12 col-md-4">
              <h3 className="footer-heading">About me</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                ab, perspiciatis beatae autem deleniti voluptate nulla a
                dolores, exercitationem eveniet libero laudantium recusandae
                officiis qui aliquid blanditiis omnis quae. Explicabo?
              </p>{" "}
              <div className="position-relative">
                <a href="#" className="mx-2">
                  <span className="bi-facebook"></span>
                </a>
                <a href="#" className="mx-2">
                  <span className="bi-twitter"></span>
                </a>
                <a href="#" className="mx-2">
                  <span className="bi-instagram"></span>
                </a>

                <a href="#" className="mx-2 js-search-open">
                  <span className="bi-search"></span>
                </a>
                <i className="bi bi-list mobile-nav-toggle"></i>
              </div>{" "}
              <p>
                <Link href="about.html" className="footer-link-more">
                  Learn More
                </Link>
              </p>
            </div>
            <div className="col-12 col-md-4">
              <h3 className="footer-heading">Navigation</h3>
              <ul className="footer-links list-unstyled ">
                <li>
                  <Link to="/">
                    <i className="bi bi-chevron-right"></i> Blog
                  </Link>
                </li>

                <li>
                  <Link to="/write">
                    <i className="bi bi-chevron-right"></i> Write
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-4">
              <h3 className="footer-heading">Categories</h3>
              <ul className="footer-links list-unstyled">
                <li>
                  <Link to="/?cat=business">
                    <i className="bi bi-chevron-right"></i> Business
                  </Link>
                </li>
                <li>
                  <Link to="/?cat=culture">
                    <i className="bi bi-chevron-right"></i> Culture
                  </Link>
                </li>

                <li>
                  <Link to="/?cat=technology">
                    <i className="bi bi-chevron-right"></i> Technology
                  </Link>
                </li>
                <li>
                  <Link to="/?cat=quotidian">
                    <i className="bi bi-chevron-right"></i> Quotidian
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
