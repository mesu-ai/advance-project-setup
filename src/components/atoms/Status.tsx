type StatusT = 'active' | 'inactive';

const Status = ({ status }: { status: StatusT }) => {
  const className: Record<StatusT, string> = {
    active: 'bg-success-50 text-success-500',
    inactive: 'bg-danger-50 text-danger-500',
  };

  return (
    <p
      className={`w-fit capitalize text-sm font-medium px-5 py-1.5 rounded-lg ${className[status]}`}
    >
      {status}
    </p>
  );
};

export default Status;
