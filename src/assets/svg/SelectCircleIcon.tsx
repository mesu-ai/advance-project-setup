import type { FC, SVGProps } from 'react';

const SelectCircleIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => {
  return (
    <svg width={16} height={24} viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <circle cx="8" cy="8" r="7.5" fill="white" stroke="#1F5DA0" />
      <circle cx="7.9987" cy="7.99847" r="4.16667" fill="#1F5DA0" stroke="#1F5DA0" />
    </svg>
  );
};

export default SelectCircleIcon;
