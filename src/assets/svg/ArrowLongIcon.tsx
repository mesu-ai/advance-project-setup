import type { FC, SVGProps } from 'react';

const ArrowLongIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5024 16.3755C16.1575 16.8069 16.2276 17.4362 16.659 17.781C17.0903 18.1259 17.7196 18.0558 18.0645 17.6244L21.5628 13.2489C22.1466 12.5186 22.1466 11.4813 21.5628 10.7511L18.0645 6.37552C17.7196 5.94415 17.0903 5.87404 16.659 6.21892C16.2276 6.5638 16.1575 7.19307 16.5024 7.62444L19.2012 11L2.99927 11C2.44698 11 1.99927 11.4477 1.99927 12C1.99927 12.5523 2.44698 13 2.99927 13L19.2012 13L16.5024 16.3755Z"
      />
    </svg>
  );
};

export default ArrowLongIcon;
