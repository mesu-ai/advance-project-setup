import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '../../hooks/useAuth';
import { logoutAuth } from '../../store/slices/auth/authSlice';

const LogoutButton = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const callbackUrl = pathname + search;
    dispatch(logoutAuth());
    navigate(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  };
  return (
    <button
      className="cursor-pointer bg-red-500 text-white px-3 py-0.5"
      onClick={handleLogout}
      type="button"
    >
      logout
    </button>
  );
};

export default LogoutButton;
