import type { FC, ReactNode } from 'react';

const PageSection: FC<{ title?: string; className?: string; children: ReactNode }> = ({
  title = '',
  className = '',
  children,
}) => {
  return (
    <div>
      <h2 className="heading-2">{title}</h2>
      <div className={`bg-surface mt-3 rounded-xl border border-border ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default PageSection;
