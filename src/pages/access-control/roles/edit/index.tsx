import RoleForm1, { type RoleFormData } from '@/components/molecules/forms/RoleForm1';
import PageSection from '@/components/templates/PageSection';
import { useGetRoleByIdQuery } from '@/store/api/endpoints/roleEndpoints';
import { useParams } from 'react-router';

const EditRolePage = () => {
  const { roleId } = useParams();
  const { data, isLoading } = useGetRoleByIdQuery(roleId!, { skip: !roleId });

  const onSubmit = async (data: RoleFormData) => {
    console.log({ data });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!data?.data) return <div>Role not found</div>;

  const defaultPermissions: RoleFormData = {
    status: data.data.status,
    role: data.data.role,
    permissions: data.data.permissions,
  };

  return (
    <PageSection title="Edit Role" className="px-5 py-4">
      <RoleForm1 mode="edit" initialValue={defaultPermissions} onSubmit={onSubmit} />
    </PageSection>
  );
};

export default EditRolePage;
