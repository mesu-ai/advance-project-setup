import DarkIcon from '@/assets/svg/DarkIcon';
import MenuCollapseIcon from '@/assets/svg/MenuCollapseIcon';
import NotificationIcon from '@/assets/svg/NotificationIcon';
import SettingIcon from '@/assets/svg/SettingIcon';
import Image from '@/components/atoms/Image';
import logo from '@/assets/images/logo.png';
import type { FC } from 'react';

type NavbarT = {
  onShowSidebar: () => void;
  showLogo: boolean;
};

const Navbar: FC<NavbarT> = ({ onShowSidebar, showLogo }) => {
  return (
    <nav className="h-17 border-b border-white-700 flex">
      <div className={`w-62 my-auto flex-none ${!showLogo && 'hidden'}`}>
        <Image src={logo} alt="brand-logo" height={35} width={190} />
      </div>

      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          aria-label="hamberger-menu-button"
          className="cursor-pointer fill-neutral-300 hover:fill-primary-500"
          onClick={onShowSidebar}
        >
          <MenuCollapseIcon />
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
      </div>
    </nav>
  );
};

export default Navbar;
