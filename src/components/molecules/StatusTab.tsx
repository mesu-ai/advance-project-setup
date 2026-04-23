import { Link, useSearchParams } from 'react-router';

export type StatusTabOptionT = { name: string; status: string; count?: string };

interface StatusTabProps {
  options: StatusTabOptionT[];
  initialStatus?: string;
  isShowCount?: boolean;
  queryKey?: string;
  onTabChange?: (status: string) => void;
}

const StatusTab = ({
  options,
  initialStatus = 'approved',
  isShowCount,
  queryKey = 'approvalStatus',
  onTabChange,
}: StatusTabProps) => {
  const [searchParams] = useSearchParams();

  const activeStatus = searchParams.get(queryKey) ?? initialStatus;

  const buildTabUrl = (status: string) => {
    const next = new URLSearchParams();
    next.set(queryKey, status);
    // reset page on tab change
    return `?${next.toString()}`;
  };

  return (
    <div className="px-5 pt-8 pb-4 border-b border-border flex gap-8 text-sm font-medium">
      {options.map((s) => {
        const isActive = activeStatus === s.status;

        return (
          <Link
            key={s.status}
            to={buildTabUrl(s.status)}
            className={`relative group transition-all duration-300 ease-linear ${
              isActive
                ? 'text-primary-500 after:absolute after:top-full after:left-0 after:bg-primary-500 after:h-[2px] after:content-[""] after:w-6'
                : 'text-neutral-300 hover:text-secondary-500'
            }`}
            onClick={() => onTabChange?.(s.status)}
          >
            {s.name}
            {isShowCount && (
              <sup
                className={`ms-1 transition-colors duration-300 ease-linear text-sm text-white rounded-lg px-1.5  
                  ${isActive ? 'bg-danger-500' : 'group-hover:bg-secondary-500 bg-neutral-300'}`}
              >
                {s.count}
              </sup>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default StatusTab;
