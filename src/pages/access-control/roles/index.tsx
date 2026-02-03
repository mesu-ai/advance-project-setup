import Status from '@/components/atoms/Status';
import Pagination from '@/components/molecules/Pagination';
import { useState } from 'react';
import DataTable from '@/components/organisms/DataTable';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/atoms/Search';
import ActionButtons from '@/components/molecules/ActionButtons';
import { useNavigate } from 'react-router';
import { useGetRolesQuery } from '@/store/api/endpoints/roleEndpoints';
import PageSection from '@/components/templates/PageSection';
import type { RoleT } from '@/types';

const RolePermissionPage = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const navigate = useNavigate();

  const { data: roles } = useGetRolesQuery('Role');

  console.log({ currPage, roles });

  const handleView = (id: number) => {
    console.log(id);
  };
  const handleEdit = (id: number) => {
    navigate(`/access-control/roles/${id}/edit`);
  };
  const handleDelete = (id: number) => {
    console.log(id);
  };

  return (
    <PageSection title="Employee Permission List">
      <div className="flex justify-between px-5 py-4">
        <SearchBar className="max-w-[350px]" onSearch={(keyword) => console.log(keyword)} />
        <Button variant="add" onClick={() => navigate('/access-control/roles/create')}>
          Add New Role
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <DataTable header={['SL No', 'Role Name', 'Status', 'Action']}>
          {roles &&
            roles?.data.map((role: RoleT) => (
              <tr key={role?.id}>
                <td className="px-5 py-3">{role.id}</td>
                <td className="px-5 py-3 capitalize">{role.role}</td>
                <td className="px-5 py-3">
                  <Status status={role.status} />
                </td>
                <td className="px-5 py-3">
                  <ActionButtons
                    actions={[
                      {
                        label: 'View',
                        onClick: () => handleView(role.id),
                      },
                      {
                        label: 'Edit',
                        onClick: () => handleEdit(role.id),
                      },
                      {
                        label: 'Delete',
                        onClick: () => handleDelete(role.id),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
        </DataTable>
        <div className="text-center py-5">
          <Pagination totalPage={12} currentPage={5} setCurrentPage={setCurrPage} />
        </div>
      </div>
    </PageSection>
  );
};

export default RolePermissionPage;
