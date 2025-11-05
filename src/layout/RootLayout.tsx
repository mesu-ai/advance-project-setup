//src/layout/RootLayout.tsx:

import { Link, Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div>
      <header>
        <nav className="space-x-5">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/products/create">Create Product</Link>
        </nav>
      </header>
      <main>
        {/* <Suspense fallback={<div>loading</div>}> */}
        <Outlet />
        {/* </Suspense> */}
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default RootLayout;
