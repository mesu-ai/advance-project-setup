import EmployeeForm, { type EmployeeFormData } from '@/components/molecules/forms/EmployeeForm';
import PageSection from '@/components/templates/PageSection';

const CreateEmployeePage = () => {
  const onSubmit = async (data: EmployeeFormData) => {
    console.log(data);
    // await fetch('http://localhost:4000/api/v1', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <PageSection title="Add New Employee" className="px-5 py-4">
      <EmployeeForm mode="create" onSubmit={onSubmit} />
    </PageSection>
  );
};

export default CreateEmployeePage;
