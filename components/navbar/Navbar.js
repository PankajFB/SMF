import React from "react";
import Link from "next/link"

function Navbar() {
  return (
    <div className="m-4  p-1">
      <nav className="navbar navbar-expand-lg  navbar-light bg-light">
        <div className="container-fluid">
          <Link
            className="nav-link active navbar-brand"
            aria-current="page"
            href="/"
          >
            Webapp
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* our link will be here */}
                <Link className="nav-link active" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <button type="button" className="btn btn-primary">
              <Link
                className="nav-link active navbar-brand"
                aria-current="page"
                href="/login"
              >
                Login
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
