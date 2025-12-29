import RoleForm1, { type RoleFormData } from '@/components/molecules/forms/RoleForm1';
import PageSection from '@/components/templates/PageSection';

const CreateRolePage = () => {
  const onSubmit = async (data: RoleFormData) => {
    console.log({ data });
  };

  return (
    <PageSection title="Add New Role" className="px-5 py-4">
      <RoleForm1 mode="create" onSubmit={onSubmit} />
    </PageSection>
  );
};

export default CreateRolePage;
