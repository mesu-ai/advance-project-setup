import { useAuth } from '@/hooks/useAuth';

const OrderPage = () => {
  const { user, isAuthenticated } = useAuth();
  console.log({ user, isAuthenticated });

  return <div>Order Page</div>;
};

export default OrderPage;
