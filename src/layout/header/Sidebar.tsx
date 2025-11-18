import Image from '@/components/atoms/Image';
import { Link } from 'react-router';
import logo from '@/assets/images/logo.png';
import type { FC } from 'react';

type SidebarT = {
  exp?: string;
};

const Sidebar: FC<SidebarT> = () => {
  return (
    <nav className="h-full bg-surface" aria-label="primary">
      <div className="h-17 border-b border-white-700 flex justify-center items-center">
        <Image src={logo} alt="brand-logo" height={35} width={190} />
      </div>

      <div className="px-5 flex flex-col gap-4">
        <p className="text-sm font-medium text-neutral-100">GENERAL</p>

        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/products/create">Create Product</Link>
      </div>
    </nav>
  );
};

export default Sidebar;
