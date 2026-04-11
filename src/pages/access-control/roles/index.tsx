import Status from '@/components/atoms/Status';
import Pagination from '@/components/molecules/Pagination';
import DataTable from '@/components/organisms/DataTable';
import Button from '@/components/atoms/Button';
import Search from '@/components/atoms/Search';
import ActionButtons from '@/components/molecules/ActionButtons';
import { useNavigate } from 'react-router';
import { useGetRolesQuery } from '@/store/api/endpoints/roleEndpoints';
import PageSection from '@/components/templates/PageSection';

const RolePermissionPage = () => {
  const navigate = useNavigate();

  const { data: roles } = useGetRolesQuery();

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
        <Search className="max-w-[350px] my-auto" onSearch={(keyword) => console.log(keyword)} />
        <Button variant="add" onClick={() => navigate('/access-control/roles/create')}>
          Add New Role
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <DataTable header={['SL No', 'Role Name', 'Status', 'Action']}>
          {roles &&
            roles?.data?.map((role) => (
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
          <Pagination totalPages={5} totalItems={10} />
        </div>
      </div>
    </PageSection>
  );
};

export default RolePermissionPage;
