import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/Store';
import img from "../Women/plan.jpeg";
import "./Women.css";

export default function Home() {
  const navigate = useNavigate();
  const userEmail = useStore((state) => state.userEmail);

  const [floors, setFloors] = useState(Array(12).fill(""));       // ✅ now 12 floors
  const [preferences, setPreferences] = useState(Array(12).fill("")); // ✅ now 12 prefs
  const [selectedPreferenceIndex, setSelectedPreferenceIndex] = useState(0);

  const [presentRoom, setPresentRoom] = useState('');
  const [hostel, setHostel] = useState('');
  const [oldFloor, setOldFloor] = useState('');

  const rooms = [
    { number: 'MF', top: '31%', left: '46%', width: '50px', height: '190px', borderRadius: '10px' },
    { number: 'AF', top: '23%', left: '92%', width: '50px', height: '80px', borderRadius: '10px' },
    { number: 'HF', top: '90%', left: '25%', width: '200px', height: '50px', borderRadius: '10%' },
    { number: 'FF', top: '20%', left: '20%', width: '100px', height: '50px', borderRadius: '10px' },
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

  function handleRandomFill() {
    const randomFloors = [];
    const randomPrefs = [];
    const roomNumbers = rooms.map(r => r.number);

    for (let i = 0; i < 12; i++) {
      const randFloor = Math.floor(Math.random() * 3) + 1; 
      const randRoom = roomNumbers[Math.floor(Math.random() * roomNumbers.length)];
      randomFloors.push(String(randFloor));
      randomPrefs.push(randRoom);
    }

    setFloors(randomFloors);
    setPreferences(randomPrefs);
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

    const finalFloors = [...floors];
    const finalPrefs = [...preferences];

    floors.forEach((f, idx) => {
      if (f === "same") {
        finalFloors[idx] = oldFloor;
        finalPrefs[idx] = presentRoom;
      }
    });

    const formData = {
      Category: "Women",
      Email: userEmail,
      PresentRoom: presentRoom,
      Hostel: hostel,
      OldFloor: oldFloor,
    };

    // Add all 12 prefs
    for (let i = 0; i < 12; i++) {
      formData[`Floor${i + 1}`] = finalFloors[i];
      formData[`Pref${i + 1}`] = finalPrefs[i];
    }

    const formBody = new URLSearchParams(formData).toString();

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz4YopyVrst8t54wmCd_xNSlxu73hI46uOWxp5XBvQQW6NS7N6eOr9YTfeNgTcNbQsW/exec",
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
    <div className="home-container">
      <div className="home-card">
        <h1 className="title">WOMEN</h1>

        <form onSubmit={handleSubmit}>
          {/* Image + room selection */}
          <div className="image-container">
            <img src={img} alt="Rooms" className="room-image" />
            {rooms.map((room) => (
              <button
                type="button"
                key={room.number}
                onClick={() => handleRoomClick(room.number)}
                className={`room-btn ${preferences[selectedPreferenceIndex] === room.number ? "selected" : ""}`}
                style={{
                  top: room.top,
                  left: room.left,
                  width: room.width,
                  height: room.height,
                  borderRadius: room.borderRadius
                }}
              >
                {room.number}
              </button>
            ))}
          </div>

          {/* User info */}
          <div className="input-row">
            <button 
              type="button" 
              onClick={handleRandomFill} 
              className="random-btn"
              style={{ minWidth: "150px" }}
            >
              Random
            </button>

            <input
              type="text"
              placeholder="Present Room No."
              value={presentRoom}
              onChange={(e) => setPresentRoom(e.target.value)}
              className="text-input"
            />

            <select value={hostel} onChange={(e) => setHostel(e.target.value)} className="select-input">
              <option value="">Old Hostel</option>
              <option value="Saveri Hostel">Saveri Hostel</option>
              <option value="Malhar Hostel">Malhar Hostel</option>
            </select>

            <select value={oldFloor} onChange={(e) => setOldFloor(e.target.value)} className="select-input">
              <option value="">Old Floor</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          {/* Preferences (3 rows × 4) */}
          <div className="preferences">
            {Array.from({ length: 3 }).map((_, rowIdx) => (
              <div key={rowIdx} className="pref-row">
                {Array.from({ length: 4 }).map((_, colIdx) => {
                  const idx = rowIdx * 4 + colIdx;
                  return (
                    <div key={idx} className="pref-box">
                      <select
                        value={floors[idx]}
                        onChange={(e) => {
                          const newFloors = [...floors];
                          const newPrefs = [...preferences];
                          newFloors[idx] = e.target.value;

                          if (e.target.value === "same") {
                            newPrefs[idx] = presentRoom;
                          } else {
                            if (newPrefs[idx] === presentRoom) newPrefs[idx] = "";
                          }

                          setFloors(newFloors);
                          setPreferences(newPrefs);
                        }}
                        className="select-input"
                      >
                        <option value="">Floor</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="same">Same Room</option>
                      </select>

                      <input
                        type="text"
                        readOnly
                        value={preferences[idx]}
                        placeholder={`Pref ${idx + 1}`}
                        onClick={() => floors[idx] !== "same" ? handlePreferenceClick(idx) : null}
                        disabled={floors[idx] === "same"}
                        className={`pref-input ${selectedPreferenceIndex === idx ? "active" : ""} ${floors[idx] === "same" ? "disabled" : ""}`}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="button-row">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" onClick={() => navigate("/first")} className="back-btn">Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}
