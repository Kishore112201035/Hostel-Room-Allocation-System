

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/Store';
import img from "../Women/plan.jpeg";

export default function Home() {
  const navigate = useNavigate();
  const userEmail = useStore((state) => state.userEmail);

  // floor selections and room selections
  const [floors, setFloors] = useState(['', '', '']);
  const [preferences, setPreferences] = useState(['', '', '']);
  const [selectedPreferenceIndex, setSelectedPreferenceIndex] = useState(0);

  const [presentRoom, setPresentRoom] = useState('');
  const [hostel, setHostel] = useState('');
  const [oldFloor, setOldFloor] = useState(''); // new state for Old Floor

  const rooms = [
    { number: 'MF', top: '37%', left: '8%' },
    { number: 'AF', top: '25%', left: '91%' },
    //{ number: 'HF', top: '20%', left: '50%' }, // new button
    //{ number: 'FF', top: '75%', left: '50%' }, // new button
  ];

  function handleRoomClick(roomNum) {
    const newPrefs = [...preferences];
    newPrefs[selectedPreferenceIndex] = roomNum;
    setPreferences(newPrefs);

    if (!presentRoom) setPresentRoom(roomNum);
  }

  function handlePreferenceClick(index) {
    setSelectedPreferenceIndex(index);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!presentRoom || !hostel || !oldFloor) {
      alert('Please enter Present Room, Old Hostel and Old Floor');
      return;
    }
    if (floors.some(f => !f) || preferences.some(p => !p)) {
      alert('Please fill all preferences (floor + room)');
      return;
    }

    // prepare final values to save in sheet
    const finalFloors = [...floors];
    const finalPrefs = [...preferences];

    floors.forEach((f, idx) => {
      if (f === "same") {
        finalFloors[idx] = oldFloor;       // replace with Old Floor in sheet
        finalPrefs[idx] = presentRoom;     // replace with Old Room (PresentRoom field)
      }
    });

    const formBody = new URLSearchParams({
      Email: userEmail,
      PresentRoom: presentRoom,
      Hostel: hostel,
      OldFloor: oldFloor,
      Floor1: finalFloors[0], Pref1: finalPrefs[0],
      Floor2: finalFloors[1], Pref2: finalPrefs[1],
      Floor3: finalFloors[2], Pref3: finalPrefs[2],
    }).toString();

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwpZCK5FfNLYHzhxuhgmacy1GvB56WVe0slBJ-gqavi097GMLWfbgQhub1-9c-CYNbO_w/exec",
        {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formBody
        }
      );

      const text = await response.text();
      alert(text);
      navigate("/first");

    } catch (error) {
      alert('Network error');
      console.error(error);
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>WOMEN</h1>

      <form onSubmit={handleSubmit}>
        {/* Image + room selection */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
          <img
            src={img}
            alt="Rooms"
            style={{ width: '800px', height: 'auto', border: '1px solid #ccc' }}
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
                backgroundColor: 'rgba(202, 193, 194, 0.36)',
                border: preferences[selectedPreferenceIndex] === room.number
                  ? '2px solid #fff'
                  : 'none',
                borderRadius: '0px',
                width: '45px',
                height: '110px',
                color: 'white',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {room.number}
            </button>
          ))}
        </div>

        {/* User info */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={userEmail}
            readOnly
            style={{ marginRight: '1rem', padding: '0.5rem', backgroundColor: '#eee' }}
          />
          <input
            type="text"
            placeholder="Present Room No."
            value={presentRoom}
            onChange={(e) => setPresentRoom(e.target.value)}
            style={{ marginRight: '1rem', padding: '0.5rem' }}
          />

          {/* Old Hostel */}
          <select
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            style={{ padding: '0.5rem', marginRight: '1rem' }}
          >
            <option value="">Old Hostel</option>
            <option value="Saveri Hostel">Saveri Hostel</option>
            <option value="Malhar Hostel">Malhar Hostel</option>
          </select>

          {/* Old Floor */}
          <select
            value={oldFloor}
            onChange={(e) => setOldFloor(e.target.value)}
            style={{ padding: '0.5rem' }}
          >
            <option value="">Old Floor</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        {/* Preferences (floor + room side-by-side) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "1rem",
            alignItems: "center",
          }}
        >
          {floors.map((floor, idx) => (
            <div key={idx} style={{ display: "flex", gap: "0.5rem" }}>
              <select
                value={floor}
                onChange={(e) => {
                  const newFloors = [...floors];
                  const newPrefs = [...preferences];
                  newFloors[idx] = e.target.value;

                  if (e.target.value === "same") {
                    newPrefs[idx] = presentRoom; // frontend shows PresentRoom
                  } else {
                    if (newPrefs[idx] === presentRoom) newPrefs[idx] = "";
                  }

                  setFloors(newFloors);
                  setPreferences(newPrefs);
                }}
                style={{ padding: "0.5rem" }}
              >
                <option value="">Select Floor</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="same">Same Room</option>
              </select>

              <input
                type="text"
                readOnly
                value={preferences[idx]}
                placeholder={`Preference ${idx + 1}`}
                onClick={() => floor !== "same" ? handlePreferenceClick(idx) : null}
                disabled={floor === "same"}
                style={{
                  width: "120px",
                  padding: "0.5rem",
                  cursor: floor === "same" ? "not-allowed" : "pointer",
                  border:
                    selectedPreferenceIndex === idx
                      ? "2px solid crimson"
                      : "1px solid #ccc",
                  textAlign: "center",
                  backgroundColor: floor === "same" ? "#f0f0f0" : "#fff",
                }}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
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
              fontWeight: 'bold'
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
              fontWeight: 'bold'
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
