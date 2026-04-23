import type { FC, SVGProps } from 'react';

const RatingIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      // stroke="currentColor"
      // strokeWidth="2"
      // strokeLinecap="round"
      // strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path
        d="M11.5383 4.10996C11.7091 3.69932 12.2909 3.69932 12.4617 4.10996L14.2632 8.4415C14.3353 8.61462 14.4981 8.7329 14.685 8.74789L19.3612 9.12278C19.8045 9.15832 19.9843 9.71158 19.6465 10.0009L16.0837 13.0528C15.9413 13.1748 15.8791 13.3662 15.9226 13.5486L17.0111 18.1118C17.1143 18.5444 16.6437 18.8864 16.2642 18.6545L12.2606 16.2092C12.1006 16.1115 11.8994 16.1115 11.7394 16.2092L7.73584 18.6545C7.35629 18.8864 6.88567 18.5444 6.98886 18.1118L8.07736 13.5486C8.12086 13.3662 8.05868 13.1748 7.91628 13.0528L4.35347 10.0009C4.0157 9.71158 4.19546 9.15832 4.63879 9.12278L9.31505 8.74789C9.50194 8.7329 9.66475 8.61462 9.73675 8.4415L11.5383 4.10996Z"
        fill="url(#paint0_linear_13088_21636)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_13088_21636"
          x1="12"
          y1="3"
          x2="12"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F8951D" />
          <stop offset="1" stopColor="#F47920" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RatingIcon;
