import { Link } from 'react-router';

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* <div className="h-17 flex items-center border-b border-white-700">
        <Image src={logo} alt="brand-logo" height={35} width={190} />
      </div> */}
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/products/create">Create Product</Link>
    </div>
  );
};

export default Sidebar;
