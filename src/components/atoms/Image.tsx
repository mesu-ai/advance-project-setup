import React from 'react';

type ImageProps = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
};

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  className = '',
  fit = 'cover',
  loading = 'lazy',
  fallbackSrc = '/assets/images/fallback.png',
}) => {
  const [error, setError] = React.useState(false);

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      onError={() => setError(true)}
      className={`object-${fit} ${className}`}
    />
  );
};

export default Image;
