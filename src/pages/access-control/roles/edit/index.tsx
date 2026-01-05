import RoleForm, { type RoleFormData } from '@/components/molecules/forms/RoleForm';
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

  const defaultValues: RoleFormData = {
    status: data.data.status as 'Y' | 'N',
    role: data.data.role,
    permissions: data.data.permissions,
  };

  return (
    <PageSection title="Edit Role" className="px-5 py-4">
      <RoleForm mode="edit" initialValue={defaultValues} onSubmit={onSubmit} />
    </PageSection>
  );
};

export default EditRolePage;
