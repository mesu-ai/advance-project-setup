import LogoutButton from '@/components/molecules/LogoutButton';
import { useAuth } from '@/hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <p>Home Page {user?.name}</p>
      <LogoutButton />
    </div>
  );
};

export default HomePage;
