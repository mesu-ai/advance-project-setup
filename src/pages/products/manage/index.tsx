import LogoutButton from '@/components/molecules/LogoutButton';
import { useAuth } from '@/hooks/useAuth';
import { useGetProductsQuery } from '@/store/api/endpoints/productEndpoints';

const ManageProductPage = () => {
  const { user } = useAuth();

  const { data: products } = useGetProductsQuery();

  return (
    <div>
      <h2>Show Products List</h2>
      <h3>Name: {user?.name}</h3>
      {products &&
        products?.data?.map((item) => (
          <li key={item.id} className="p-2 bg-amber-500 text-white my-1">
            {item.name}
          </li>
        ))}
      <LogoutButton />
      Product Page
    </div>
  );
};

export default ManageProductPage;
