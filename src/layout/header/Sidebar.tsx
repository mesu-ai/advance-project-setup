import Image from '@/components/atoms/Image';
import { Link } from 'react-router';
import logo from '@/assets/images/logo.png';
import { useCallback, useState, type FC } from 'react';
import { sidebarGenRoutes, sidebarUserRoutes } from '@/routes/sidebar.routes';
import ArrowIcon from '@/assets/svg/ArrowIcon';
import type { SideRouteProps } from '@/types';

type ExpandState = { index: number; isExpand: boolean };

interface SidebarMenuItemPropsT {
  menu: SideRouteProps;
  onExpand: () => void;
  isExpand: boolean;
}

const SidebarMenuItem: FC<SidebarMenuItemPropsT> = ({ menu, onExpand, isExpand }) => {
  const children = menu.children ?? [];
  const hasChildren = children.length > 0;

  return (
    <div>
      {hasChildren ? (
        <button
          type="button"
          aria-label="child-menu-collapse"
          className="w-full cursor-pointer p-1.5 flex justify-between items-center text-neutral-300 hover:text-primary-500 hover:bg-primary-50 rounded-lg"
          onClick={onExpand}
        >
          <span className="flex gap-2">
            {menu.icon && <menu.icon />} {menu.title}
          </span>
          <ArrowIcon
            className={`w-5 h-5 transition-transform ${isExpand ? 'rotate-0' : 'rotate-180'}`}
          />
        </button>
      ) : (
        <div className="p-1.5 text-neutral-300 hover:text-primary-500 hover:bg-primary-50 rounded-lg">
          <Link className="flex gap-2" to={menu?.path}>
            {menu.icon && <menu.icon />} {menu.title}
          </Link>
        </div>
      )}
      {hasChildren && (
        <div
          className={`ms-9 grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpand ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="overflow-hidden">
            <div className="space-y-2 py-2">
              {children.map((child, c_Idx) => (
                <Link
                  key={child?.path + c_Idx}
                  className="text-sm flex gap-2 text-neutral-300 hover:text-primary-500"
                  to={`${menu.path}/${child?.path}`}
                >
                  {child.icon && <child.icon />} {child.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [expand, setExpand] = useState<ExpandState>({
    index: -1,
    isExpand: false,
  });

  const handleExpand = useCallback((idx: number) => {
    setExpand((prev) => ({
      index: idx,
      isExpand: prev.index === idx ? !prev.isExpand : true,
    }));
  }, []);

  return (
    <nav className="h-full bg-surface" aria-label="primary-sidebar">
      <div className="h-17 border-b border-white-700 dark:border-black-300 flex justify-center items-center">
        <Image src={logo} alt="brand-logo" height={35} width={190} />
      </div>
      <div className="px-5 space-y-5 mt-5">
        <div className="flex flex-col gap-2 font-medium">
          <p className="text-sm text-neutral-100">GENERAL</p>
          {sidebarGenRoutes.map((route, idx) => (
            <SidebarMenuItem
              key={idx}
              menu={route}
              isExpand={expand.index === idx && expand.isExpand}
              onExpand={() => handleExpand(idx)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 font-medium">
          <p className="text-sm text-neutral-100">USERS</p>
          {sidebarUserRoutes.map((route, idx) => (
            <SidebarMenuItem
              key={idx}
              menu={route}
              isExpand={expand.index === idx && expand.isExpand}
              onExpand={() => handleExpand(idx)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
