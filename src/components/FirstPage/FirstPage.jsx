import React from "react";
import { Link } from "react-router-dom";
import useStore from "../store/Store";
import "./FirstPage.css";
// import iitpkdLogo from "../assets/iitpkdLogo.jpeg"; // ✅ make sure logo is in src/assets/

export default function FirstPage() {
  const userEmail = useStore((state) => state.userEmail);

  function handleEnd() {
    window.open("about:blank", "_self");
    window.close();
  }

  return (
    <div className="firstpage-container">
      {/* 🔹 Top Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Left side: logo + brand */}
          <div className="navbar-left">
            {/* <img src={iitpkdLogo} alt="Logo" className="navbar-logo" /> */}
            <span className="navbar-brand">My App</span>
          </div>

          {/* Right side: menu links */}
          <ul className="navbar-links">
            <li>
              <Link to="/women">Women</Link>
            </li>
            <li>
              <Link to="/men">Men</Link>
            </li>
            <li>
              <Link to="/emailcheck">Check</Link>
            </li>
            <li>
              <Link to="/rooms">Available Rooms</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 🔹 Centered Page Content */}
      <div className="page-content">
        <div className="page-box">
          <h1>Welcome {userEmail} 🎉</h1>
          <button className="end-btn" onClick={handleEnd}>
            END
          </button>
        </div>
      </div>
    </div>
  );
}
