import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AvailableRooms.css";

export default function Rooms() {
  const [rooms, setRooms] = useState({});
  const [choice, setChoice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!choice) return;

    fetch(`http://127.0.0.1:5000/rooms?choice=${choice}`)
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, [choice]);

  function handleReset() {
    setChoice("");
    setRooms({});
  }

  function handleExit() {
    navigate("/first");
  }

  return (
    <div className="rooms-container">
      {/* Wrap everything inside one card */}
      <div className="rooms-card">
        <h1 className="rooms-title">ROOM ALLOCATION STATUS</h1>

        <div className="dropdown-container">
          <label className="dropdown-label">Show: </label>
          <select
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
            className="dropdown-select"
          >
            <option value="">-- Select Option --</option>
            <option value="1">Allocated & Unallocated</option>
            <option value="2">Only Allocated</option>
            <option value="3">Only Unallocated</option>
          </select>
        </div>

        {/* Results only if selected */}
        {choice && (
          <>
            <div className="results-box">
              {Object.entries(rooms).map(([blockName, floors]) => (
                <div key={blockName} className="block-section">
                  <h2 className="block-title">{blockName}</h2>
                  {floors.map((floor, idx) => (
                    <div key={idx} className="floor-section">
                      <p className="floor-label">Floor {idx}</p>
                      {floor.allocated && (
                        <p>Allocated: {floor.allocated.join(", ") || "None"}</p>
                      )}
                      {floor.unallocated && (
                        <p>
                          Unallocated: {floor.unallocated.join(", ") || "None"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="button-group">
              <button onClick={handleReset} className="blue-btn">
                Re-select Option
              </button>
              <button onClick={handleExit} className="blue-btn">
                Exit to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
