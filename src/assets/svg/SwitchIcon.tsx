import type { FC, SVGProps } from 'react';

type SwitchIconPropsT = SVGProps<SVGSVGElement> & { isEnabled?: boolean };

const SwitchIcon: FC<SwitchIconPropsT> = ({ className = '', isEnabled = false, ...props }) => {
  return (
    <svg
      width={40}
      height={16}
      viewBox="0 0 40 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {isEnabled ? (
        <path d="M8 16H32C36.3887 16 40 12.3887 40 8C40 3.61133 36.3887 0 32 0H8C3.61133 0 0 3.61133 0 8C0 12.3887 3.61133 16 8 16ZM31.3333 3.33333C33.9067 3.33333 36 5.42667 36 8C36 10.5733 33.9067 12.6667 31.3333 12.6667C28.76 12.6667 26.6667 10.5733 26.6667 8C26.6667 5.42667 28.76 3.33333 31.3333 3.33333Z" />
      ) : (
        <path d="M32 0H8C3.61133 0 0 3.61133 0 8C0 12.3887 3.61133 16 8 16H32C36.3887 16 40 12.3887 40 8C40 3.61133 36.3887 0 32 0ZM8.66667 12.6667C6.09333 12.6667 4 10.5733 4 8C4 5.42667 6.09333 3.33333 8.66667 3.33333C11.24 3.33333 13.3333 5.42667 13.3333 8C13.3333 10.5733 11.24 12.6667 8.66667 12.6667Z" />
      )}
    </svg>
  );
};

export default SwitchIcon;
