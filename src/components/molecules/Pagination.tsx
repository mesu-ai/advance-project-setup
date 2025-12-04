import ArrowsIcon from '@/assets/svg/ArrowsIcon';
import type { FC, MouseEvent, ReactNode } from 'react';

interface PaginationProps {
  currentPage?: number;
  setCurrentPage: (value: number | ((prev: number) => number)) => void;
  totalPage?: number;
  maxPagesToShow?: number;
  hadleCurrentPage?: (value: number) => void;
}

interface ButtonProps {
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
  action: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  className = '',
  isActive = false,
  disabled,
  action,
  children,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={action}
      type="button"
      className={`hover:not-disabled:cursor-pointer h-8 w-8 text-sm font-medium flex justify-center items-center text-neutral-300 hover:bg-secondary-50 hover:text-secondary-500 rounded-full disabled:text-neutral-200 disabled:bg-transparent  ${isActive ? 'bg-primary-50 text-primary-500' : 'bg-white'} ${className}`}
    >
      {children}
    </button>
  );
};

const Ellipsis = () => {
  return (
    <span className="h-8 w-8 font-medium flex justify-center items-center text-neutral-300">
      ...
    </span>
  );
};

const Pagination: FC<PaginationProps> = ({
  currentPage = 1,
  setCurrentPage,
  totalPage = 1,
  maxPagesToShow = 3,
  hadleCurrentPage,
}) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPage = 30;
  // const maxPagesToShow = 3;

  const renderButton = (key: number, value: number) => (
    <Button
      key={key}
      action={() => {
        setCurrentPage(value);
        if (typeof hadleCurrentPage === 'function') {
          hadleCurrentPage(value);
        }
      }}
      isActive={currentPage === value}
      className="mx-1.5"
    >
      {value}
    </Button>
  );

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPage <= maxPagesToShow) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(renderButton(i, i));
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPage, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        pages.push(renderButton(1, 1));
        if (startPage > 2) {
          pages.push(<Ellipsis key="ellipsis-start" />);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(renderButton(i, i));
      }

      if (endPage < totalPage) {
        if (endPage < totalPage - 1) {
          pages.push(<Ellipsis key="ellipsis-end" />);
        }
        pages.push(renderButton(totalPage, totalPage));
      }
    }

    return pages;
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Button
        disabled={currentPage === 1}
        action={() => {
          setCurrentPage((prev) => prev - 1);
          if (typeof hadleCurrentPage === 'function') {
            hadleCurrentPage(currentPage - 1);
          }
        }}
        className="mr-3 sm:mr-5"
      >
        <ArrowsIcon />
      </Button>

      {renderPageNumbers()}

      <Button
        disabled={currentPage === totalPage}
        action={() => {
          setCurrentPage((prev) => prev + 1);
          if (typeof hadleCurrentPage === 'function') {
            hadleCurrentPage(currentPage + 1);
          }
        }}
        className="ml-3 sm:ml-5"
      >
        <ArrowsIcon className="rotate-180" />
      </Button>
    </div>
  );
};

export default Pagination;
