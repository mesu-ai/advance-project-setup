//src/layout/RootLayout.tsx:

import { Outlet } from 'react-router';
import Navbar from './header/Navbar';
import Sidebar from './header/Sidebar';
import { useState } from 'react';

const RootLayout = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <div className="flex min-h-screen">
      <aside
        aria-hidden={!showSidebar}
        aria-label="primary-navigation"
        tabIndex={showSidebar ? 0 : -1}
        className={`fixed left-0 top-0 h-screen w-62 transform transition-transform duration-300  
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </aside>

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${showSidebar ? 'pl-62' : 'pl-0'}`}
      >
        <header className="sticky top-0 z-20 h-17 bg-surface border-b border-white-700">
          <Navbar showLogo={showSidebar} onShowSidebar={() => setShowSidebar((prev) => !prev)} />
        </header>

        <main className="flex-1 overflow-y-auto px-7.5 py-5">
          <Outlet />
        </main>

        <footer className="px-7.5 bg-red-500 text-center py-3.5 text-sm">
          © SaRa Lifestyle Ltd. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default RootLayout;
