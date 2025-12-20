import { type FC, type ReactNode } from 'react';

interface TableHeaderProps {
  label: string;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
}

interface TableProps {
  tableId?: string;
  header?: (string | TableHeaderProps)[];
  stripped?: boolean;
  hoverable?: boolean;
  className?: string;
  children: ReactNode;
}

const DataTable: FC<TableProps> = ({
  tableId,
  header,
  stripped = false,
  hoverable = false,
  className = 'border-b border-border border-collapse',
  children,
}) => {
  return (
    <table id={tableId} className={`w-full table-auto text-sm ${className}`}>
      <thead className="bg-white-700 dark:bg-black-500 whitespace-nowrap">
        <tr>
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
          {/*<th className="text-start px-5 py-3">Name</th>
            <th className="text-start px-5 py-3">Email</th>
            <th className="text-start px-5 py-3">Role</th>
            <th className="text-start px-5 py-3">Status</th>
            <th className="text-start px-5 py-3">Action</th> */}
        </tr>
      </thead>
      <tbody
        className={`divide-y divide-white-700 dark:divide-black-300 
          ${stripped && '[&>tr:nth-child(even)]:bg-white-700/30 dark:[&>tr:nth-child(even)]:bg-black-500/30'} 
          ${hoverable && '[&>tr]:hover:bg-yellow-50 dark:[&>tr]:hover:bg-black-500/50 [&>tr]:transition-colors'}`}
      >
        {children}
        {/* <tr>
            <td className="px-5 py-3">01</td>
            <td className="px-5 py-3">
              <div className="flex gap-2 items-center">
                <Image src={avatar} width={28} height={28} alt="default-avater" />
                <p>Md Abdullah Al Momin</p>
              </div>
            </td>
            <td className="px-5 py-3">momin@hotmail.com</td>
            <td className="px-5 py-3">Tester</td>
            <td className="px-5 py-3">
              <Status status="inactive" />
            </td>
            <td className="px-5 py-3">
              <div className="group relative w-fit">
                <button
                  type="button"
                  className="rounded-lg border border-secondary-500 ps-2.5 pe-1.5 py-0.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                >
                  Actions{' '}
                  <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                </button>

                <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col items-start gap-2 text-neutral-300">
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    View
                  </button>
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    Edit
                  </button>
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-5 py-3">01</td>
            <td className="px-5 py-3">
              <div className="flex gap-2 items-center">
                <Image src={avatar} width={28} height={28} alt="default-avater" />
                <p>Md Abdullah Al Momin</p>
              </div>
            </td>
            <td className="px-5 py-3">momin@hotmail.com</td>
            <td className="px-5 py-3">Tester</td>
            <td className="px-5 py-3">
              <Status status="inactive" />
            </td>
            <td className="px-5 py-3">
              <div className="group relative w-fit">
                <button
                  type="button"
                  className="rounded-lg border border-secondary-500 ps-2.5 pe-1.5 py-0.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                >
                  Actions{' '}
                  <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                </button>

                <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col items-start gap-2 text-neutral-300">
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    View
                  </button>
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    Edit
                  </button>
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-5 py-3">01</td>
            <td className="px-5 py-3">
              <div className="flex gap-2 items-center">
                <Image src={avatar} width={28} height={28} alt="default-avater" />
                <p>Md Abdullah Al Momin</p>
              </div>
            </td>
            <td className="px-5 py-3">momin@hotmail.com</td>
            <td className="px-5 py-3">Tester</td>
            <td className="px-5 py-3">
              <Status status="inactive" />
            </td>
            <td className="px-5 py-3">
              <div className="group relative w-fit">
                <button
                  type="button"
                  className="rounded-lg border border-secondary-500 ps-2.5 pe-1.5 py-0.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                >
                  Actions{' '}
                  <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                </button>

                <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col items-start gap-2 text-neutral-300">
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    View
                  </button>
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    Edit
                  </button>
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-5 py-3">01</td>
            <td className="px-5 py-3">
              <div className="flex gap-2 items-center">
                <Image src={avatar} width={28} height={28} alt="default-avater" />
                <p>Md Abdullah Al Momin</p>
              </div>
            </td>
            <td className="px-5 py-3">momin@hotmail.com</td>
            <td className="px-5 py-3">Tester</td>
            <td className="px-5 py-3">
              <Status status="inactive" />
            </td>
            <td className="px-5 py-3">
              <div className="group relative w-fit">
                <button
                  type="button"
                  className="rounded-lg border border-secondary-500 ps-2.5 pe-1.5 py-0.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                >
                  Actions{' '}
                  <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                </button>

                <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col items-start gap-2 text-neutral-300">
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    View
                  </button>
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    Edit
                  </button>
                  <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr> */}
      </tbody>
    </table>
  );
};

export default DataTable;
