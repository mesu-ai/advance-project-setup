import type { FC, SVGProps } from 'react';

const OrderIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path
        d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5L6 6.5"
        strokeLinecap="round"
      />
      <path
        d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2L2.5 2"
        strokeLinecap="round"
      />
      <path
        d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19L17.5 19"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10.5" cy="20.5" r="1.5" />
      <circle cx="17.5" cy="20.5" r="1.5" />
    </svg>
  );
};

export default OrderIcon;
