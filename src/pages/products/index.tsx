import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '../../components/molecules/LogoutButton';
import { useGetProductsQuery } from '@/store/api/endpoints/productEndpoints';

interface ProductT {
  id: number;
  name: string;
  color: string;
}

const ProductPage = () => {
  const { user, isAuthenticated } = useAuth();
  console.log({ user, isAuthenticated });

  const { data: products, isLoading, isSuccess } = useGetProductsQuery('products');

  console.log(products, isLoading, isSuccess);

  // useEffect(() => {
  //   const products = fetch('');
  //   console.log(products);
  // }, []);

  return (
    <div>
      <h2>Show Products List</h2>
      {products &&
        products?.data.map((item: ProductT) => (
          <li key={item.id} className="p-2 bg-amber-500 text-white my-1">
            {item.name}
          </li>
        ))}
      <LogoutButton />
      Product Page
    </div>
  );
};

export default ProductPage;
