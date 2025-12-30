import EmployeeForm, { type EmployeeFormData } from '@/components/molecules/forms/EmployeeForm';
import PageSection from '@/components/templates/PageSection';

const CreateEmployeePage = () => {
  const onSubmit = async (data: EmployeeFormData) => {
    console.log(data);
  };

  return (
    <PageSection title="Add New Employee" className="px-5 py-4">
      <EmployeeForm mode="create" onSubmit={onSubmit} />
    </PageSection>
  );
};

export default CreateEmployeePage;
