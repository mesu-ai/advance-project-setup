import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '../../hooks/useAuth';
import { loggedOut } from '@/store/slices/auth/authSlice';
import { baseApi } from '@/store/api/baseApi';

const LogoutButton = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const callbackUrl = pathname + search;
    dispatch(loggedOut());
    // Clear RTK Query cache to remove any stale data
    dispatch(baseApi.util.resetApiState());
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
