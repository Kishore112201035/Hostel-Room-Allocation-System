import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmailCheck.css"; // ✅ Import CSS file

export default function EmailCheck() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      alert("Please enter an email");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbyzLOP_lnGFkJUjZFzKDqk6uwzueS5PgQbCaK9PXpVZmcNFHiZZ_L_JlYs-M_aN7N1-fQ/exec";
      const response = await fetch(
        `${scriptURL}?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setResult(data[0]);
      } else {
        setResult("not-found");
      }
    } catch (error) {
      console.error(error);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="emailcheck-container">
      <div className="emailcheck-box">
        <h1 className="emailcheck-title">Check Your Allocation</h1>

        <form onSubmit={handleSubmit} className="emailcheck-form">
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
          />
          <button type="submit" className="submit-btn">
            {loading ? "Checking..." : "Submit"}
          </button>
        </form>

        <div className="emailcheck-result">
          {result === "not-found" && (
            <p className="error-text">Email not found ❌</p>
          )}
          {result && result !== "not-found" && (
            <div className="result-box">
              <h3>Result:</h3>
              <p>
                <b>Email:</b> {result.email}
              </p>
              <p>
                <b>Hostel Name:</b> {result.hostelName}
              </p>
              <p>
                <b>Room No:</b> {result.roomNo}
              </p>
              <p>
                <b>Roommates:</b>
              </p>
              <ul>
                {result.roommates.length > 0 ? (
                  result.roommates.map((mate, i) => <li key={i}>{mate}</li>)
                ) : (
                  <li>No roommates listed</li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={() => navigate("/first")}
            className="back-btn"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
