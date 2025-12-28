type StatusT = string | 'Y' | 'N' | 'active' | 'inactive' | 'pending';

const Status = ({ status }: { status: StatusT }) => {
  const className: Record<StatusT, string> = {
    Y: 'bg-success-50 text-success-500',
    N: 'bg-danger-50 text-danger-500',
    active: 'bg-success-50 text-success-500',
    inactive: 'bg-danger-50 text-danger-500',
    pending: 'bg-orange-50 text-orange-500',
  };

  const showStatus = status === 'Y' ? 'Active' : status === 'N' ? 'Inactive' : status;

  return (
    <p
      className={`w-fit capitalize text-sm font-medium px-3 py-0.5 rounded-md ${className[status]}`}
    >
      {showStatus}
    </p>
  );
};

export default Status;
