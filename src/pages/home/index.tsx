import { useAuth } from '../../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();
  console.log({ user });

  return <div>Home Page</div>;
};

export default HomePage;
