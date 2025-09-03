import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useStore from "../store/Store";
import "./FirstPage.css";

export default function FirstPage() {
  const userEmail = useStore((state) => state.userEmail);

  const images = [
    "/HostelSahyadri.jpg",
    "/plan.jpeg",
    "/PlanM.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const trackRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsTransitioning(true);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === images.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 800);
      return () => clearTimeout(timeout);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, images.length]);

  function handleEnd() {
    window.open("about:blank", "_self");
    window.close();
  }

  return (
    <div className="firstpage-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <span className="navbar-brand">My App</span>
          </div>
          <ul className="navbar-links">
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/emailcheck">Check</Link></li>
            <li><Link to="/rooms">Available Rooms</Link></li>
          </ul>
        </div>
      </nav>

      {/* Content */}
      <div className="page-content">
        <div className="peach-wrapper">
          
          {/* Slideshow with dots INSIDE */}
          <div className="slideshow">
            <div
              ref={trackRef}
              className="slideshow-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: isTransitioning ? "transform 0.8s ease-in-out" : "none"
              }}
            >
              {images.map((src, i) => (
                <img key={i} src={src} alt={`Slide ${i}`} />
              ))}
              {/* clone first image for smooth loop */}
              <img src={images[0]} alt="Clone first" />
            </div>

            {/* ✅ Dots inside slideshow */}
            <div className="slideshow-dots">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${currentIndex % images.length === i ? "active" : ""}`}
                ></span>
              ))}
            </div>
          </div>

          {/* Welcome box */}
          <div className="page-box">
            <h1>Allocate Your Hostel</h1>
            <button className="end-btn" onClick={handleEnd}>
              END
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
