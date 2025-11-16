//src/layout/RootLayout.tsx:

import { Outlet } from 'react-router';
import Navbar from './header/Navbar';
import Sidebar from './header/Sidebar';
import { useState } from 'react';

const RootLayout = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <div className="container mx-auto">
      <header>
        <Navbar showLogo={showSidebar} onShowSidebar={() => setShowSidebar((prev) => !prev)} />
      </header>

      <div className="flex h-[calc(100vh-68px)]">
        <aside className={`w-62 flex-none border-r border-white-700 ${!showSidebar && 'hidden'}`}>
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {/* <footer className="h-12 border-t border-white-700">Footer</footer> */}
    </div>
  );
};

export default RootLayout;
