import { useAuth } from '@/hooks/useAuth';

const OrderPage = () => {
  const { user } = useAuth();

  return <div>Order Page {user?.name}</div>;
};

export default OrderPage;
