import type { FC, SVGProps } from 'react';

const SelectIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3345 2.75H7.66549C4.64449 2.75 2.75049 4.889 2.75049 7.916V16.084C2.75049 19.111 4.63549 21.25 7.66549 21.25H16.3335C19.3645 21.25 21.2505 19.111 21.2505 16.084V7.916C21.2505 4.889 19.3645 2.75 16.3345 2.75Z"
        fill="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        stroke="none"
        d="M12.866 16.5C12.4811 17.1667 11.5189 17.1667 11.134 16.5L7.66987 10.5C7.28497 9.83333 7.7661 9 8.5359 9L15.4641 9C16.2339 9 16.715 9.83333 16.3301 10.5L12.866 16.5Z"
      />
    </svg>
  );
};

export default SelectIcon;
