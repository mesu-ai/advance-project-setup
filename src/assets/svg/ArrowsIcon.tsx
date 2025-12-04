import type { FC, SVGProps } from 'react';

const ArrowsIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M17 16L13 12L17 8M11 16L7 12L11 8" />
    </svg>
  );
};

export default ArrowsIcon;
