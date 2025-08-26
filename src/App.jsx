
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignIn from './components/SignIN/SignIn';
// import Home from './components/Women/Women';
// import EmailCheck from './components/Check/EmailCheck';
// import FirstPage from './components/FirstPage/FirstPage';   // ✅ new page
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// const GoogleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// export default function App() {
//   return (
//     <GoogleOAuthProvider clientId={GoogleClientID}>
//       <Router>
//         <Routes>
//           {/* Sign in page */}
//           <Route path="/" element={<SignIn />} />

//           {/* Home Route */}
//           <Route
//             path="/home"
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />

//           {/* Email Check Route */}
//           <Route
//             path="/emailcheck"
//             element={
//               <ProtectedRoute>
//                 <EmailCheck />
//               </ProtectedRoute>
//             }
//           />

//           {/* ✅ First Page Route */}
//           <Route
//             path="/first"
//             element={
//               <ProtectedRoute>
//                 <FirstPage />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </GoogleOAuthProvider>
//   );
// }

import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIN/SignIn';
import Women from './components/Women/Women';        // ✅ Women page
import Men from './components/Men/Men';                  // ✅ Men page
import EmailCheck from './components/Check/EmailCheck';
import FirstPage from './components/FirstPage/FirstPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const GoogleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GoogleClientID}>
      <Router>
        <Routes>
          {/* Sign in page */}
          <Route path="/" element={<SignIn />} />

          {/* ✅ First Page Route (main after login) */}
          <Route
            path="/first"
            element={
              <ProtectedRoute>
                <FirstPage />
              </ProtectedRoute>
            }
          />

          {/* Women Route */}
          <Route
            path="/women"
            element={
              <ProtectedRoute>
                <Women />
              </ProtectedRoute>
            }
          />

          {/* Men Route */}
          <Route
            path="/men"
            element={
              <ProtectedRoute>
                <Men />
              </ProtectedRoute>
            }
          />

          {/* Email Check Route */}
          <Route
            path="/emailcheck"
            element={
              <ProtectedRoute>
                <EmailCheck />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}
