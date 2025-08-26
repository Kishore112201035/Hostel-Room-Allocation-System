import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmailCheck() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      alert('Please enter an email');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycbyzLOP_lnGFkJUjZFzKDqk6uwzueS5PgQbCaK9PXpVZmcNFHiZZ_L_JlYs-M_aN7N1-fQ/exec";
      const response = await fetch(`${scriptURL}?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.length > 0) {
        setResult(data[0]); // already in object form
      } else {
        setResult('not-found');
      }
    } catch (error) {
      console.error(error);
      alert('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Check Your Allocation</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem', width: '250px' }}
        />
        <button
          type="submit"
          style={{
            padding: '0.6rem 1.5rem',
            backgroundColor: '#dc143c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Checking...' : 'Submit'}
        </button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        {result === 'not-found' && <p style={{ color: 'red' }}>Email not found ❌</p>}
        {result && result !== 'not-found' && (
          <div style={{ textAlign: 'left', display: 'inline-block' }}>
            <h3>Result:</h3>
            <p><b>Email:</b> {result.email}</p>
            <p><b>Hostel Name:</b> {result.hostelName}</p>
            <p><b>Room No:</b> {result.roomNo}</p>
            <p><b>Roommates:</b></p>
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

      <div style={{ marginTop: '2rem' }}>
        <button
          type="button"
          onClick={() => navigate("/first")}
          style={{
            padding: '0.6rem 1.5rem',
            backgroundColor: 'gray',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
