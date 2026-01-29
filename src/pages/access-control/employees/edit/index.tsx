import EmployeeForm, { type EmployeeFormData } from '@/features/employees/components/EmployeeForm';
import PageSection from '@/components/templates/PageSection';
import { useGetEmployeeByIdQuery } from '@/store/api/endpoints/employeeEndpoints';
import { useParams } from 'react-router';

const EditEmployeePage = () => {
  const { employeeId } = useParams();
  const { data: employee, isLoading } = useGetEmployeeByIdQuery(employeeId!, { skip: !employeeId });

  const onSubmit = async (data: EmployeeFormData) => {
    console.log(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!employee?.data) return <div>Employee not found</div>;

  return (
    <PageSection title="Add New Employee" className="px-5 py-4">
      <EmployeeForm
        mode="edit"
        onSubmit={onSubmit}
        initialValues={employee?.data as EmployeeFormData}
      />
    </PageSection>
  );
};

export default EditEmployeePage;
