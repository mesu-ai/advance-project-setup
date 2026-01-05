import type { FC, ReactNode } from 'react';

const PageSection: FC<{ title?: string; className?: string; children: ReactNode }> = ({
  title = '',
  className = '',
  children,
}) => {
  return (
    <div>
      <h1 className="heading-1">{title}</h1>
      <div className={`bg-surface mt-3 rounded-xl border border-border ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default PageSection;
