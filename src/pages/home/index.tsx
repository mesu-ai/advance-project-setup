import LogoutButton from '../../components/molecules/LogoutButton';
import { useAuth } from '../../hooks/useAuth';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  console.log({ user, isAuthenticated });

  return (
    <div>
      <p>Home Page {user?.name}</p>
      <LogoutButton />
    </div>
  );
};

export default HomePage;
