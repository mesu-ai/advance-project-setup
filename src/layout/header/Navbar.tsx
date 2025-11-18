import DarkIcon from '@/assets/svg/DarkIcon';
import MenuCollapseIcon from '@/assets/svg/MenuCollapseIcon';
import NotificationIcon from '@/assets/svg/NotificationIcon';
import SettingIcon from '@/assets/svg/SettingIcon';
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
        className="cursor-pointer fill-neutral-300 hover:fill-primary-500"
        onClick={onShowSidebar}
      >
        <MenuCollapseIcon className={`${!showLogo && '-rotate-180'}`} />
      </button>

      <div className="space-x-3">
        <button type="button" aria-label="theme-change-button">
          <DarkIcon />
        </button>
        <button type="button" aria-label="notification-button">
          <NotificationIcon />
        </button>
        <button type="button" aria-label="setting-button">
          <SettingIcon />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
