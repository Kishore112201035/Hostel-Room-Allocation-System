// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import useStore from '../store/Store';

export default function ProtectedRoute({ children }) {
  const token = useStore((state) => state.token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
