import LogoutButton from '@/components/molecules/LogoutButton';
import { useAppSelector, useAuth } from '@/hooks/useAuth';
import { decodeJwt } from '@/utils/decodeJwt';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const token = useAppSelector((state) => state.auth.accessToken);

  console.log({ user, isAuthenticated });

  if (token) decodeJwt(token);

  return (
    <div>
      <p>Home Page {user?.name}</p>
      <LogoutButton />
    </div>
  );
};

export default HomePage;
