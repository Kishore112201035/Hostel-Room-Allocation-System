import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/Store';
import img from "../Men/Plan.jpeg";
import "./Men.css";   // ✅ Import external CSS

export default function Home() {
  const navigate = useNavigate();
  const userEmail = useStore((state) => state.userEmail);

  const [floors, setFloors] = useState(['', '', '', '', '']);   // ✅ 5 floors
  const [preferences, setPreferences] = useState(['', '', '', '', '']); // ✅ 5 prefs
  const [selectedPreferenceIndex, setSelectedPreferenceIndex] = useState(0);
  const [presentRoom, setPresentRoom] = useState('');
  const [hostel, setHostel] = useState('');
  const [oldFloor, setOldFloor] = useState('');

  const rooms = [
    { number: 'SMS', top: '61%', left: '60%', width: '40px', height: '50px', borderRadius: '10px' },
    { number: 'SOS', top: '78%', left: '60%', width: '40px', height: '60px', borderRadius: '10px' },
    { number: 'SKS', top: '94%', left: '71%', width: '60px', height: '35px', borderRadius: '10%' },  
    { number: 'SAS', top: '78%', left: '87%', width: '40px', height: '65px', borderRadius: '10px' }, 
    { number: 'MF1S', top: '50%', left: '23%', width: '75px', height: '40px', borderRadius: '10px' },
    { number: 'MF2S', top: '77%', left: '4%', width: '40px', height: '50px', borderRadius: '10px' },
    { number: 'MBS', top: '94%', left: '19.5%', width: '130px', height: '37px', borderRadius: '10px'},
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

  // ✅ Random button logic
  function handleRandomFill() {
    const randomFloors = [];
    const randomPrefs = [];
    const roomNumbers = rooms.map(r => r.number);

    for (let i = 0; i < 5; i++) {
      const randFloor = Math.floor(Math.random() * 3) + 1; // floors 1–3
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

    const formBody = new URLSearchParams({
      Category: "Men",
      Email: userEmail,   // ✅ still sent but hidden
      PresentRoom: presentRoom,
      Hostel: hostel,
      OldFloor: oldFloor,
      Floor1: finalFloors[0], Pref1: finalPrefs[0],
      Floor2: finalFloors[1], Pref2: finalPrefs[1],
      Floor3: finalFloors[2], Pref3: finalPrefs[2],
      Floor4: finalFloors[3], Pref4: finalPrefs[3],
      Floor5: finalFloors[4], Pref5: finalPrefs[4],
    }).toString();

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
    <div className="men-container">
      <div className="men-card">
        <form onSubmit={handleSubmit} className="men-form">

          {/* Image + room selection */}
          <div className="men-image-wrapper">
            <img src={img} alt="Rooms" className="men-map" />
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
          <div className="form-row">
            {/* Replaced email input with Random button */}
            <button 
              type="button" 
              onClick={handleRandomFill} 
              className="btn random"
              style={{ minWidth: "150px" }}
            >
              Random
            </button>

            <input 
              type="text" 
              placeholder="Present Room No." 
              value={presentRoom} 
              onChange={(e) => setPresentRoom(e.target.value)} 
              className="input" 
            />

            <select 
              value={hostel} 
              onChange={(e) => setHostel(e.target.value)} 
              className="input"
            >
              <option value="">Old Hostel</option>
              <option value="Saveri Hostel">Saveri Hostel</option>
              <option value="Malhar Hostel">Malhar Hostel</option>
            </select>

            <select 
              value={oldFloor} 
              onChange={(e) => setOldFloor(e.target.value)} 
              className="input"
            >
              <option value="">Old Floor</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          {/* Preferences */}
          <div className="preferences">
            {floors.map((floor, idx) => (
              <div key={idx} className="pref-row">
                <select
                  value={floor}
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
                  className="input"
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
                  className={`input pref-input ${selectedPreferenceIndex === idx ? "active" : ""}`}
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="button-row">
            <button type="submit" className="btn submit">Submit</button>
            <button type="button" onClick={() => navigate("/first")} className="btn back">Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}
