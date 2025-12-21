import type { FC, SVGProps } from 'react';

type SwitchIconPropsT = SVGProps<SVGSVGElement> & { isEnabled?: boolean };

const SwitchIcon: FC<SwitchIconPropsT> = ({ className = '', isEnabled = false, ...props }) => {
  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {isEnabled ? (
        <path d="M8 28H32C36.3887 28 40 24.3887 40 20C40 15.6113 36.3887 12 32 12H8C3.61133 12 0 15.6113 0 20C0 24.3887 3.61133 28 8 28ZM31.3333 15.3333C33.9067 15.3333 36 17.4267 36 20C36 22.5733 33.9067 24.6667 31.3333 24.6667C28.76 24.6667 26.6667 22.5733 26.6667 20C26.6667 17.4267 28.76 15.3333 31.3333 15.3333Z" />
      ) : (
        <path d="M32 12H8C3.61133 12 0 15.6113 0 20C0 24.3887 3.61133 28 8 28H32C36.3887 28 40 24.3887 40 20C40 15.6113 36.3887 12 32 12ZM8.66667 24.6667C6.09333 24.6667 4 22.5733 4 20C4 17.4267 6.09333 15.3333 8.66667 15.3333C11.24 15.3333 13.3333 17.4267 13.3333 20C13.3333 22.5733 11.24 24.6667 8.66667 24.6667Z" />
      )}
    </svg>
  );
};

export default SwitchIcon;
