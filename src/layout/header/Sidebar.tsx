import Image from '@/components/atoms/Image';
import { Link } from 'react-router';
import logo from '@/assets/images/logo.png';
import { useCallback, useState } from 'react';
import { sidebarRoutes } from '@/routes/sidebar.routes';
import ArrowIcon from '@/assets/svg/ArrowIcon';
import type { SidebarRouteT } from '@/types';

type ExpandState = { key: string | null; isExpand: boolean };

interface SidebarMenuItemPropsT {
  menu: SidebarRouteT;
  onExpand: () => void;
  isExpand: boolean;
}

const SidebarMenuItem = ({ menu, onExpand, isExpand }: SidebarMenuItemPropsT) => {
  const children = menu.children ?? [];
  const hasChildren = children.length > 0;

  return (
    <div>
      {hasChildren ? (
        <button
          type="button"
          aria-expanded={isExpand}
          aria-label={`${isExpand ? 'Collapse' : 'Expand'} ${menu.title} menu`}
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
          <Link className="flex gap-2" to={menu.path}>
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
                  key={child.path + c_Idx}
                  className="text-sm flex gap-2 text-neutral-300 hover:text-primary-500"
                  to={`${menu.path}/${child.path}`}
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
    key: null,
    isExpand: false,
  });

  const handleExpand = useCallback((key: string | null) => {
    setExpand((prev) => ({
      key,
      isExpand: prev.key === key ? !prev.isExpand : true,
    }));
  }, []);

  return (
    <nav className="h-full bg-surface" aria-label="primary-sidebar">
      <div className="h-17 border-b border-white-700 dark:border-black-300 flex justify-center items-center">
        <Image src={logo} alt="brand-logo" height={35} width={190} />
      </div>
      <div className="px-5 space-y-5 mt-5">
        {sidebarRoutes.map((group) => (
          <div key={group.title} className="flex flex-col gap-2 font-medium">
            <p className="text-sm text-neutral-100">{group.title}</p>

            {group.routes.map((route) => {
              const routeKey = `${group.title}-${route.path}`;

              return (
                <SidebarMenuItem
                  key={routeKey}
                  menu={route}
                  isExpand={expand.key === routeKey && expand.isExpand}
                  onExpand={() => handleExpand(routeKey)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
