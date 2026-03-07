import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router';

// Registration guard: checks localStorage for registration
export default function ProtectedLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const registered = localStorage.getItem('registered');
    if (!registered) {
      navigate('/registration');
    }
  }, [navigate]);
  return <Outlet />;
}
