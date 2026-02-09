import type { FC, SVGProps } from 'react';

const PlusIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path
        d="M0.75 9.75H9.75M9.75 9.75H18.75M9.75 9.75V18.75M9.75 9.75V0.75"
        // stroke="#ABABAB"
        // stroke-width="1.5"
        // stroke-linecap="round"
        // stroke-linejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
