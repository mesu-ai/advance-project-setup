import type { SvgIconT } from '@/types/svg';
import type { FC } from 'react';

const MenuCollapseIcon: FC<SvgIconT> = ({ className = '', width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      // fill="#ABABAB"
      xmlns="http://www.w3.org/2000/svg"
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
