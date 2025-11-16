import type { SvgIconT } from '@/types/svg';
import type { FC } from 'react';

const AAAA: FC<SvgIconT> = ({ className = '', width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  );
};

export default AAAA;
