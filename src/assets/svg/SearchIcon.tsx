import type { FC, SVGProps } from 'react';

const SearchIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      {...props}
    >
      <circle cx="10.9985" cy="10.7888" r="8.03854" />
      <path d="M16.4872 16.7083L21.0407 21.25" />
    </svg>
  );
};

export default SearchIcon;
