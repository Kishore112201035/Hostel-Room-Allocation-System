import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/Store';
import img from "../Women/plan.jpeg";
import "./Women.css";   // <-- CSS file

export default function Home() {
  const navigate = useNavigate();
  const userEmail = useStore((state) => state.userEmail);

  const [floors, setFloors] = useState(['', '', '']);
  const [preferences, setPreferences] = useState(['', '', '']);
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
      Category: "Women",
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
        "https://script.google.com/macros/s/AKfycbxS0dAeWtQFVcnmgozLOcaPjklISVHwUoX15eBZ_8EHJrGLcMYfq0J-k2nOp3ax0eA0/exec",
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
            <input type="text" value={userEmail} readOnly className="readonly-input" />
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
                  className="select-input"
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
                  className={`pref-input ${selectedPreferenceIndex === idx ? "active" : ""} ${floor === "same" ? "disabled" : ""}`}
                />
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
