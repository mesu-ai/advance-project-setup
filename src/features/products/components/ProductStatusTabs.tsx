import { Link, useSearchParams } from 'react-router';

const productApprovalStatus = [
  { name: 'Approved', status: 'approved', count: '1.2k' },
  { name: 'Pending', status: 'pending', count: '300' },
  { name: 'Rejected', status: 'rejected', count: '100' },
  { name: 'Low Stock', status: 'lowstock', count: '09' },
  { name: 'Draft', status: 'draft', count: '50' },
  { name: 'All', status: 'all', count: '10580' },
];

const ProductStatusTabs = () => {
  const [searchParams] = useSearchParams();

  const activeApprovalStatus = searchParams.get('approvalStatus') ?? 'approved';

  return (
    <div className="px-5 pt-8 pb-4 border-b border-border flex gap-8 text-sm font-medium">
      {productApprovalStatus.map((s) => {
        const isActive = activeApprovalStatus === s.status;

        return (
          <Link
            key={s.status}
            to={`?approvalStatus=${s.status}`}
            className={`relative group transition-all duration-300 ease-linear ${
              isActive
                ? 'text-secondary-500 after:absolute after:top-full after:left-0 after:bg-primary-500 after:h-[2px] after:content-[""] after:w-6'
                : 'text-neutral-300 hover:text-secondary-500'
            }`}
          >
            {s.name}
            <sup
              className={`ms-1 transition-colors duration-300 ease-linear text-sm text-white rounded-lg px-1.5  
                ${isActive ? 'bg-danger-500' : 'group-hover:bg-secondary-500 bg-neutral-300'}`}
            >
              {s.count}
            </sup>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductStatusTabs;
