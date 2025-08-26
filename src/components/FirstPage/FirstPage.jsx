// // src/components/FirstPage.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import useStore from "../store/Store";

// export default function FirstPage() {
//   const userEmail = useStore((state) => state.userEmail);
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div style={{ textAlign: "center", marginTop: "2rem" }}>
//       <h1>Welcome {userEmail} 🎉</h1>

//       {/* 3-line Menu Button */}
//       <button
//         onClick={() => setMenuOpen(!menuOpen)}
//         style={{
//           position: "absolute",
//           top: "20px",
//           left: "20px",
//           background: "transparent",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         <div style={{ width: "25px", height: "3px", background: "#dc143c", margin: "4px 0" }}></div>
//         <div style={{ width: "25px", height: "3px", background: "#dc143c", margin: "4px 0" }}></div>
//         <div style={{ width: "25px", height: "3px", background: "#dc143c", margin: "4px 0" }}></div>
//       </button>

//       {/* Menu */}
//       {menuOpen && (
//         <div
//           style={{
//             position: "absolute",
//             top: "60px",
//             left: "0",
//             width: "200px",
//             background: "#dc143c",
//             padding: "1rem",
//             borderRadius: "0 8px 8px 0",
//             color: "white",
//             textAlign: "left",
//           }}
//         >
//           <p>
//             <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
//               WOMEN
//             </Link>
//           </p>
//           <p>
//             <span style={{ color: "#ccc" }}>Empty</span>
//           </p>
//           <p>
//             <Link to="/emailcheck" style={{ color: "white", textDecoration: "none" }}>
//               Check
//             </Link>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }



// src/components/FirstPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../store/Store";

export default function FirstPage() {
  const userEmail = useStore((state) => state.userEmail);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleEnd() {
    // Try to close window
    window.open("about:blank", "_self"); 
    window.close();
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome {userEmail} 🎉</h1>

      {/* 3-line Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <div style={{ width: "25px", height: "3px", background: "#dc143c", margin: "4px 0" }}></div>
        <div style={{ width: "25px", height: "3px", background: "#dc143c", margin: "4px 0" }}></div>
        <div style={{ width: "25px", height: "3px", background: "#dc143c", margin: "4px 0" }}></div>
      </button>

      {/* Menu */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "0",
            width: "200px",
            background: "#dc143c",
            padding: "1rem",
            borderRadius: "0 8px 8px 0",
            color: "white",
            textAlign: "left",
          }}
        >
          <p>
            <Link to="/women" style={{ color: "white", textDecoration: "none" }}>
              WOMEN
            </Link>
          </p>
          <p>
            <Link to="/men" style={{ color: "white", textDecoration: "none" }}>
              MEN
            </Link>
          </p>
          <p>
            <Link to="/emailcheck" style={{ color: "white", textDecoration: "none" }}>
              Check
            </Link>
          </p>
        </div>
      )}

      {/* ✅ END Button */}
      <div style={{ marginTop: "3rem" }}>
        <button
          onClick={handleEnd}
          style={{
            padding: "0.7rem 2rem",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          END
        </button>
      </div>
    </div>
  );
}

