import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation

export default function Rooms() {
  const [rooms, setRooms] = useState({});
  const [choice, setChoice] = useState(""); // start with empty
  const navigate = useNavigate(); // ✅ hook for navigation

  useEffect(() => {
    if (!choice) return; // don't fetch until a choice is made

    fetch(`http://127.0.0.1:5000/rooms?choice=${choice}`)
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, [choice]);

  // ✅ Reset choice (re-click option)
  function handleReset() {
    setChoice("");
    setRooms({});
  }

  // ✅ Exit back to first page
  function handleExit() {
    navigate("/first");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Room Allocation Status</h1>

      {/* Dropdown to choose filter */}
      <div className="mb-4">
        <label className="mr-2">Show: </label>
        <select value={choice} onChange={(e) => setChoice(e.target.value)}>
          <option value="">-- Select Option --</option>
          <option value="1">Allocated & Unallocated</option>
          <option value="2">Only Allocated</option>
          <option value="3">Only Unallocated</option>
        </select>
      </div>

      {/* Show message until user selects */}
      {!choice && <p>Please select an option to view rooms.</p>}

      {/* Render data only if rooms exist */}
      {choice &&
        Object.entries(rooms).map(([blockName, floors]) => (
          <div key={blockName} className="mb-6">
            <h2 className="text-xl font-semibold">{blockName}</h2>
            {floors.map((floor, idx) => (
              <div key={idx} className="ml-4">
                <p className="font-medium">Floor {idx}</p>
                {floor.allocated && (
                  <p>Allocated: {floor.allocated.join(", ") || "None"}</p>
                )}
                {floor.unallocated && (
                  <p>Unallocated: {floor.unallocated.join(", ") || "None"}</p>
                )}
              </div>
            ))}
          </div>
        ))}

      {/* ✅ Action Buttons */}
      <div className="mt-6 space-x-4">
        {choice && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Re-select Option
          </button>
        )}
        <button
          onClick={handleExit}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Exit to Home
        </button>
      </div>
    </div>
  );
}
