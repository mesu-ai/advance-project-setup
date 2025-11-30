import Image from '@/components/atoms/Image';
import { Link } from 'react-router';
import logo from '@/assets/images/logo.png';
import { useState, type FC } from 'react';
import { sidebarRoutes } from '@/routes/sidebar.routes';
import RoleIcon from '@/assets/svg/RoleIcon';
import ArrowIcon from '@/assets/svg/ArrowIcon';

type SidebarT = {
  exp?: string;
};

const Sidebar: FC<SidebarT> = () => {
  const [expand, setExpand] = useState<{ index: number; isExpand: boolean }>({
    index: 0,
    isExpand: false,
  });

  console.log({ expand });

  return (
    <nav className="h-full bg-surface" aria-label="primary">
      <div className="h-17 border-b border-white-700 flex justify-center items-center">
        <Image src={logo} alt="brand-logo" height={35} width={190} />
      </div>
      <div className="px-5 space-y-5 mt-5">
        <div className="flex flex-col gap-2 font-medium">
          <p className="text-sm text-neutral-100">GENERAL</p>

          {sidebarRoutes.map((route, idx) => (
            <div key={idx}>
              {route?.children ? (
                <button
                  type="button"
                  aria-label="child-menu-collapse"
                  className="w-full cursor-pointer p-1.5 flex justify-between items-center text-neutral-300 hover:text-primary-500 hover:bg-primary-50 rounded-lg"
                  onClick={() =>
                    setExpand((prev) => ({
                      index: idx,
                      isExpand: prev.index === idx ? !prev.isExpand : true,
                    }))
                  }
                >
                  <span className="flex gap-2">
                    {route.icon && <route.icon />} {route.title}
                  </span>
                  <ArrowIcon
                    className={`w-5 h-5 ${expand.index === idx && expand.isExpand && 'rotate-180'}`}
                  />
                </button>
              ) : (
                <div className="p-1.5 text-neutral-300 hover:text-primary-500 hover:bg-primary-50 rounded-lg">
                  <Link className="flex gap-2" to={route?.path}>
                    {route.icon && <route.icon />} {route.title}
                  </Link>
                </div>
              )}

              {route?.children && (
                <div
                  className={`ms-9 grid transition-[grid-template-rows] duration-300 ease-in-out ${expand.index === idx && expand.isExpand ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-2 py-2">
                      {route.children.map((child, c_Idx) => (
                        <Link
                          key={child?.path + c_Idx}
                          className="text-sm flex gap-2 text-neutral-300 hover:text-primary-500"
                          to={`${route.path}/${child?.path}`}
                        >
                          {child.icon && <child.icon />} {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-neutral-100">USERS</p>
          <Link
            className="flex gap-2 text-neutral-300 hover:text-primary-500 font-medium p-1.5"
            to="/orders"
          >
            <RoleIcon /> Role
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
