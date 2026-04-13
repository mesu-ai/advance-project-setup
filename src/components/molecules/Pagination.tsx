import ArrowsIcon from '@/assets/svg/ArrowsIcon';
import type { ChangeEvent, MouseEvent, ReactNode } from 'react';
import Select from '../atoms/Select';
import { useSearchParams } from 'react-router';
import { cleanQueryParams } from '@/utils/cleanQueryParams';

interface PaginationProps {
  totalPages?: number;
  totalItems?: number;
  // currentPage?: number;
  maxPagesToShow?: number;
  // setCurrentPage: (value: number | ((prev: number) => number)) => void;
  // onCurrentPage?: (value: number) => void;
}

interface ButtonProps {
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
  action: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

const Button = ({ className = '', isActive = false, disabled, action, children }: ButtonProps) => {
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

const Pagination = ({ totalPages = 1, totalItems = 1, maxPagesToShow = 3 }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQueryParams = Object.fromEntries(searchParams.entries());

  const currentPage = Number(searchParams.get('page') ?? 1);
  const itemsPerPage = Number(searchParams.get('itemsPerPage') ?? 15);
  const startProducts = (currentPage - 1) * itemsPerPage + 1;
  const endProducts = Math.min(currentPage * itemsPerPage, totalItems);

  const onCurrentPage = (page: number) => {
    // setCurrPage(page);
    const queryParams = cleanQueryParams({ page });
    setSearchParams({ ...initialQueryParams, ...queryParams });
  };

  const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const queryParams = cleanQueryParams({ [name]: value });
    setSearchParams({ ...initialQueryParams, ...queryParams });
  };

  const renderButton = (key: number, value: number) => (
    <Button
      key={key}
      action={() => {
        // setCurrentPage(value);
        if (typeof onCurrentPage === 'function') {
          onCurrentPage(value);
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

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderButton(i, i));
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        pages.push(renderButton(1, 1));
        if (startPage > 2) {
          pages.push(<Ellipsis key="ellipsis-start" />);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(renderButton(i, i));
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(<Ellipsis key="ellipsis-end" />);
        }
        pages.push(renderButton(totalPages, totalPages));
      }
    }

    return pages;
  };

  return (
    <div className="w-full flex justify-center items-center gap-10">
      <div className="flex items-center">
        <Button
          disabled={currentPage === 1}
          action={() => {
            // setCurrentPage((prev) => prev - 1);
            if (typeof onCurrentPage === 'function') {
              onCurrentPage(currentPage - 1);
            }
          }}
          className="mr-3 sm:mr-5"
        >
          <ArrowsIcon />
        </Button>

        {renderPageNumbers()}

        <Button
          disabled={currentPage === totalPages}
          action={() => {
            // setCurrentPage((prev) => prev + 1);
            if (typeof onCurrentPage === 'function') {
              onCurrentPage(currentPage + 1);
            }
          }}
          className="ml-3 sm:ml-5"
        >
          <ArrowsIcon className="rotate-180" />
        </Button>
      </div>

      <div className="flex items-center gap-5">
        <p className="text-sm">
          Showing {startProducts} to {endProducts} from {totalItems} entries
        </p>
        <Select
          name="itemsPerPage"
          value={itemsPerPage}
          options={[
            { label: '15', value: 15 },
            { label: '30', value: 30 },
            { label: '50', value: 50 },
            { label: '75', value: 75 },
            { label: '100', value: 100 },
          ]}
          className="w-17 mt-0"
          optionKeys={{ label: 'label', value: 'value' }}
          onChange={handleItemsPerPage}
        />
      </div>
    </div>
  );
};

export default Pagination;
