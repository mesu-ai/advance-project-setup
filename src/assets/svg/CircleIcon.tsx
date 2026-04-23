import type { FC, SVGProps } from 'react';

const CircleIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => {
  return (
    <svg width={16} height={24} viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <circle cx="8" cy="8" r="7.5" fill="white" stroke="white" />
      <circle cx="7.9987" cy="7.99847" r="4.16667" fill="#D8D8D8" stroke="#D8D8D8" />
    </svg>
  );
};

export default CircleIcon;
