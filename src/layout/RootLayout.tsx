import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div>
      <header>
        <nav>navbar</nav>
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
