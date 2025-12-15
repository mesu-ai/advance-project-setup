import Status from '@/components/atoms/Status';
import Pagination from '@/components/molecules/Pagination';
import { useState } from 'react';
import DataTable from '@/components/organisms/DataTable';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import ActionButtons, { type ActionItemProps } from '@/components/molecules/ActionButtons';
import { useNavigate } from 'react-router';

const RolePermissionPage = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const navigate = useNavigate();

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
      <h2 className="heading-2">Employee Permission List</h2>

      <div className="bg-surface mt-3 rounded-xl border border-border">
        <div className="flex justify-between px-5 py-4">
          <SearchBar />
          <Button
            variant="add"
            onClick={() => navigate('/access-control/roles-permissions/create')}
          >
            Add New Role
          </Button>
        </div>

        <div className="w-full overflow-x-auto">
          <DataTable header={['SL No', 'Role Name', 'Status', 'Action']}>
            <tr>
              <td className="px-5 py-3">01</td>
              <td className="px-5 py-3">Tester</td>
              <td className="px-5 py-3">
                <Status status="active" />
              </td>
              <td className="px-5 py-3">
                <ActionButtons actions={actionItems} />
              </td>
            </tr>
            <tr>
              <td className="px-5 py-3">01</td>
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

export default RolePermissionPage;
