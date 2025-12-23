import RoleForm, { type RoleFormData } from '@/components/molecules/forms/RoleForm';
import PageSection from '@/components/templates/PageSection';

const EditRolePage = () => {
  const defaultPermissions = {
    role: 'Admin',
    permission: [
      'products.index',
      'products.create.edit.action',
      'products.create',
      'products.create.view.action',
    ],
  };

  const onSubmit = async (data: RoleFormData) => {
    console.log({ data });
  };

  return (
    <PageSection title="Add New Role" className="px-5 py-4">
      <RoleForm mode="edit" initialValue={defaultPermissions} onSubmit={onSubmit} />
    </PageSection>
  );
};

export default EditRolePage;
