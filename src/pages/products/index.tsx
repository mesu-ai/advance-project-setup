import { useAuth } from '../../hooks/useAuth';

const ProductPage = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button
        onClick={() => logout()}
        type="button"
        className="cursor-pointer bg-sky-400 text-white px-5 py-2"
      >
        Logout
      </button>{' '}
      Product Page
    </div>
  );
};

export default ProductPage;
