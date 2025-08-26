// src/components/Men.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/Store';
import img from "../Men/plan.jpeg";   // ✅ keep a plan.jpeg inside /Men folder

export default function Men() {
  const navigate = useNavigate();
  const userEmail = useStore((state) => state.userEmail);
  const [preferences, setPreferences] = useState(['', '', '', '']);
  const [selectedPreferenceIndex, setSelectedPreferenceIndex] = useState(0);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const rooms = [
    { number: '201', top: '20%', left: '30%' },
    { number: '202', top: '20%', left: '50%' },
    { number: '203', top: '50%', left: '30%' },
    { number: '204', top: '50%', left: '50%' },
  ];

  function handleRoomClick(roomNum) {
    const newPrefs = [...preferences];
    newPrefs[selectedPreferenceIndex] = roomNum;
    setPreferences(newPrefs);
  }

  function handlePreferenceClick(index) {
    setSelectedPreferenceIndex(index);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !year) {
      alert('Please enter Name and Year');
      return;
    }
    if (preferences.some(p => !p)) {
      alert('Please fill all preferences');
      return;
    }

    const formBody = new URLSearchParams({
      Name: name,
      Year: year,
      Pref1: preferences[0],
      Pref2: preferences[1],
      Pref3: preferences[2],
      Pref4: preferences[3]
    }).toString();

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzBmy0PDv-CfKCmXrNDVrm0s2vzzRLY-4vr3LlXnvr04mMYeuOkv7DH12SVl0OFPNs7/exec",
        {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formBody
        }
      );

      const text = await response.text();
      alert(text);

      navigate("/first");   // ✅ go back after submit
    } catch (error) {
      alert('Network error');
      console.error(error);
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Welcome {userEmail} 🎉</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
          <img
            src={img}
            alt="Rooms"
            style={{ width: '400px', height: 'auto', border: '1px solid #ccc' }}
          />
          {rooms.map((room) => (
            <button
              type="button"
              key={room.number}
              onClick={() => handleRoomClick(room.number)}
              style={{
                position: 'absolute',
                top: room.top,
                left: room.left,
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(220, 20, 60, 0.7)',
                border:
                  preferences[selectedPreferenceIndex] === room.number
                    ? '2px solid #fff'
                    : 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                color: 'white',
                cursor: 'pointer',
                userSelect: 'none',
              }}
              title={`Room ${room.number}`}
            >
              {room.number}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginRight: '1rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ padding: '0.5rem' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          {preferences.map((pref, idx) => (
            <input
              key={idx}
              type="text"
              readOnly
              value={pref}
              placeholder={`Preference ${idx + 1}`}
              onClick={() => handlePreferenceClick(idx)}
              style={{
                width: '120px',
                padding: '0.5rem',
                cursor: 'pointer',
                border: selectedPreferenceIndex === idx ? '2px solid crimson' : '1px solid #ccc',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            />
          ))}
        </div>

        {/* ✅ Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            type="submit"
            style={{
              padding: '0.7rem 2rem',
              backgroundColor: '#dc143c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => navigate("/first")}
            style={{
              padding: '0.7rem 2rem',
              backgroundColor: 'gray',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
