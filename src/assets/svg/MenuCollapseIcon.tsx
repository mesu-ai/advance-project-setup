import type { FC, SVGProps } from 'react';

const MenuCollapseIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className={className}
      // fill="#ABABAB"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12L9 18V13H22V11H9V6L2 12ZM11 18H22V16H11V18ZM11 8H22V6H11V8Z"
      />
    </svg>
  );
};

export default MenuCollapseIcon;
