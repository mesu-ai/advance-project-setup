import RoleForm, { type RoleFormData } from '@/features/roles/components/RoleForm';
import PageSection from '@/components/templates/PageSection';

const CreateRolePage = () => {
  const onSubmit = async (data: RoleFormData) => {
    console.log({ data });
  };

  return (
    <PageSection title="Add New Role" className="px-5 py-4">
      <RoleForm mode="create" onSubmit={onSubmit} />
    </PageSection>
  );
};

export default CreateRolePage;
