import Image from '@/components/atoms/Image';
import Status from '@/components/atoms/Status';
import avatar from '@/assets/images/avatar1.png';
import Pagination from '@/components/molecules/Pagination';
import { useState } from 'react';
import DataTable from '@/components/organisms/DataTable';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import ActionButtons, { type ActionItemProps } from '@/components/molecules/ActionButtons';

const EmployeeListPage = () => {
  const [currPage, setCurrPage] = useState<number>(1);

  console.log({ currPage });

  const handleView = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};

  const actionItems: ActionItemProps[] = [
    {
      label: 'View',
      onClick: handleView,
    },
    {
      label: 'Edit',
      onClick: handleEdit,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
    },
  ];

  return (
    <div>
      <h2 className="heading-2">All Employee List</h2>
      <div className="bg-surface mt-3 rounded-xl border border-border">
        <div className="flex justify-between px-5 py-4">
          <SearchBar />

          <Button variant="add">Add New Employee</Button>
        </div>

        <div className="w-full overflow-x-auto">
          <DataTable header={['SL No', 'Name', 'Email', 'Role', 'Status', 'Action']}>
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
                <ActionButtons actions={actionItems} />
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
                <ActionButtons actions={actionItems} />
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
                <ActionButtons actions={actionItems} />
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
                <ActionButtons actions={actionItems} />
              </td>
            </tr>
          </DataTable>
          <div className="text-center py-5">
            <Pagination totalPage={12} currentPage={5} setCurrentPage={setCurrPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeListPage;
