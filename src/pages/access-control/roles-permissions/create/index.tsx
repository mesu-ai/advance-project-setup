import RoleForm, { type RoleFormData } from '@/components/molecules/forms/RoleForm';
import PageSection from '@/components/templates/PageSection';

const CreateNewRolePage = () => {
  const onSubmit = async (data: RoleFormData) => {
    console.log({ data });
  };

  return (
    <PageSection title="Add New Role" className="px-5 py-4">
      <RoleForm mode="create" onSubmit={onSubmit} />
    </PageSection>
  );
};

export default CreateNewRolePage;
