import type { FC, SVGProps } from 'react';

const CloseIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" />
    </svg>
  );
};

export default CloseIcon;
