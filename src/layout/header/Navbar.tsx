import MenuCollapseIcon from '@/assets/svg/MenuCollapseIcon';
import NotificationIcon from '@/assets/svg/NotificationIcon';
import SettingIcon from '@/assets/svg/SettingIcon';
import ThemeToggle from '@/components/molecules/ThemeToggle';
import type { FC } from 'react';

type NavbarT = {
  onShowSidebar: () => void;
  showLogo: boolean;
};

const Navbar: FC<NavbarT> = ({ onShowSidebar, showLogo }) => {
  return (
    <nav className="h-full flex items-center justify-between px-7.5">
      <button
        type="button"
        aria-label="hamberger-menu-button"
        className="cursor-pointer fill-neutral-300 hover:fill-primary-500 text-neutral-300 hover:text-primary-500 bg-background hover:bg-primary-50 p-[8px] rounded-full"
        onClick={onShowSidebar}
      >
        <MenuCollapseIcon className={`${!showLogo && '-rotate-180'}`} />
      </button>

      <div className="space-x-3">
        <ThemeToggle />
        <button
          type="button"
          aria-label="notification-button"
          className="text-neutral-300 hover:text-primary-500 cursor-pointer bg-background hover:bg-primary-50 p-[8px] rounded-full"
        >
          <NotificationIcon />
        </button>
        <button
          type="button"
          aria-label="setting-button"
          className="text-neutral-300 hover:text-primary-500 cursor-pointer bg-background hover:bg-primary-50 p-[8px] rounded-full"
        >
          <SettingIcon />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
