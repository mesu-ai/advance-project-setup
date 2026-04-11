import SelectIcon from '@/assets/svg/SelectIcon';
import { useRef, useState, type ChangeEvent, type ReactNode } from 'react';
import Checkbox from '../atoms/Checkbox';
import useOutsideClick from '@/hooks/useOutsideClick';

interface TableHeaderProps {
  label: string;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
}

interface SelectionProps {
  isSelectedAll: boolean;
  isCurrentPageSelected: boolean;
  onSelectAllRows: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectCurrentPageRows: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface DataTableProps {
  tableId?: string;
  header?: (string | TableHeaderProps)[];
  stripped?: boolean;
  hoverable?: boolean;
  className?: string;
  children: ReactNode;
  selection?: SelectionProps;
}

const DataSelection = (selection: SelectionProps) => {
  const [isOpen, setOpen] = useState(false);

  const outSideRef = useRef<HTMLDivElement>(null);
  useOutsideClick(outSideRef, () => setOpen(false));

  return (
    <th className="relative px-5 py-3">
      <div ref={outSideRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`cursor-pointer align-middle ${isOpen ? 'text-primary-500' : 'text-neutral-300'}`}
        >
          <SelectIcon
            className={`w-[21.76px] h-[21.76px] transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
        <div
          className={`space-y-2.5 absolute left-0 mt-2 p-4 shadow-custom-2 bg-white rounded-lg text-primary-500 font-medium 
         ${isOpen ? 'flex flex-col items-start' : 'hidden'}`}
        >
          <Checkbox
            label="Select All"
            checked={selection.isSelectedAll}
            onChange={selection.onSelectAllRows}
          />
          <Checkbox
            label="Select All on This Page"
            checked={selection.isCurrentPageSelected}
            onChange={selection.onSelectCurrentPageRows}
          />
        </div>
      </div>
    </th>
  );
};

const DataTable = ({
  tableId,
  header,
  stripped = false,
  hoverable = false,
  className = 'border-b border-border border-collapse',
  selection,
  children,
}: DataTableProps) => {
  return (
    <table id={tableId} className={`w-full table-auto text-sm ${className}`}>
      <thead className="bg-white-700 dark:bg-black-500 whitespace-nowrap">
        <tr>
          {selection && <DataSelection {...selection} />}
          {header &&
            header.map((item_col, idx) => {
              if (typeof item_col === 'string') {
                return (
                  <th key={idx} className="text-start px-5 py-3">
                    {item_col}
                  </th>
                );
              }

              return (
                <th
                  key={idx}
                  colSpan={item_col?.colSpan}
                  rowSpan={item_col?.rowSpan}
                  className={`text-start px-5 py-3 ${item_col?.className}`}
                >
                  {item_col.label}
                </th>
              );
            })}
        </tr>
      </thead>
      <tbody
        className={`divide-y divide-white-700 dark:divide-black-300 
          ${stripped && '[&>tr:nth-child(even)]:bg-white-700/30 dark:[&>tr:nth-child(even)]:bg-black-500/30'} 
          ${hoverable && '[&>tr]:hover:bg-yellow-50 dark:[&>tr]:hover:bg-black-500/50 [&>tr]:transition-colors'}`}
      >
        {children}
      </tbody>
    </table>
  );
};

export default DataTable;
