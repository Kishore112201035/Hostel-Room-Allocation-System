// // src/components/SignIn.jsx
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import useStore from '../store/Store';
// import './SignIn.css';

// export default function SignIn() {
//   const navigate = useNavigate();
//   const setToken = useStore((state) => state.setToken);
//   const setUserEmail = useStore((state) => state.setUserEmail);
//   const [error, setError] = useState('');

//   const handleSuccess = (credentialResponse) => {
//     try {
//       const decoded = jwtDecode(credentialResponse.credential);
//       const email = decoded.email || '';

//       if (email.endsWith('@smail.iitpkd.ac.in')) {
//         setToken(true);
//         setUserEmail(email);
//         setError('');
//         navigate('/first');
//       } else {
//         setError('Please sign in with your IITPKD email.');
//       }
//     } catch (err) {
//       console.error('Decoding failed', err);
//       setError('Sign-in failed. Try again.');
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '5rem' }}>
//       <h1>Sign In</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <GoogleLogin
//         onSuccess={handleSuccess}
//         onError={() => setError('Google sign-in failed. Try again.')}
//       />
//     </div>
//   );
// }


// src/components/SignIn.jsx
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useStore from '../store/Store';
import './SignIn.css';
import hostelBg from '../SignIN/HostelSahyadri.jpg'; // adjust path if needed

export default function SignIn() {
  const navigate = useNavigate();
  const setToken = useStore((state) => state.setToken);
  const setUserEmail = useStore((state) => state.setUserEmail);
  const [error, setError] = useState('');

  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const email = decoded.email || '';

      if (email.endsWith('@smail.iitpkd.ac.in')) {
        setToken(true);
        setUserEmail(email);
        setError('');
        navigate('/first');
      } else {
        setError('Please sign in with your IITPKD email.');
      }
    } catch (err) {
      console.error('Decoding failed', err);
      setError('Sign-in failed. Try again.');
    }
  };

  return (
    <div
      className="signin-page"
      style={{ backgroundImage: `url(${hostelBg})` }}
    >
      <div className="signin-overlay">
        <h1 className="signin-title">Sign In</h1>
        <p className="signin-subtitle">Use your IITPKD email to continue</p>

        {error && <p className="signin-error">{error}</p>}

        <div className="google-button-wrapper">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => setError('Google sign-in failed. Try again.')}
            theme="filled_blue"
            size="large"
            width="280"
          />
        </div>
      </div>
    </div>
  );
}
