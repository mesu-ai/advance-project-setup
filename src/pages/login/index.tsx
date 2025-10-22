import { useAuth } from '../../hooks/useAuth';
import type { User } from '../../types/types';

const LoginPage = () => {
  // const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = () => {
    const userData: User = {
      id: 1,
      name: 'Momin',
      role: 'admin',
      permissions: ['products.read'],
    };

    login(userData);

    // localStorage.setItem('token', 'true');
    // navigate('/');
  };

  return (
    <div>
      <h1>Login page</h1>
      <button
        onClick={() => handleLogin()}
        type="button"
        className="bg-sky-400 text-white px-5 py-2"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
