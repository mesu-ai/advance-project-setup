import React, { type ImgHTMLAttributes } from 'react';

type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  width?: number | string;
  height?: number | string;
  fit?: ObjectFit;
  fallbackSrc?: string;
}

const Image = ({
  src,
  width = '100%',
  height = 'auto',
  className = '',
  fit = 'cover',
  loading = 'lazy',
  fallbackSrc = '/assets/images/fallback.png',
  ...props
}: ImageProps) => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <img
      width={width}
      height={height}
      loading={loading}
      onError={() => setHasError(true)}
      src={hasError ? fallbackSrc : src}
      className={`object-${fit} ${className}`}
      {...props}
    />
  );
};

export default Image;
