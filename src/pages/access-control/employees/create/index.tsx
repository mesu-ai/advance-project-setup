import FileInput from '@/components/atoms/FileInput';
import Input from '@/components/atoms/Input';
import Radio from '@/components/atoms/Radio';
import Select from '@/components/atoms/Select';
import PageSection from '@/components/templates/PageSection';
import { BD_NID_REGEX, EMAIL_REGEX, PHONE_REGEX } from '@/constants/regex';
import { useGetRolesQuery } from '@/store/api/endpoints/roleEndpoints';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import * as z from 'zod';

const depertments = [
  { id: 1, label: 'Customer Support', value: 55 },
  { id: 2, label: 'HR Depertment', value: 56 },
  { id: 3, label: 'Logistic', value: 57 },
];

// export const roles = [
//   {
//     id: 1,
//     role: 'Super Admin',
//     status: 'Y',
//     permissions: [
//       'dashboard.index',
//       'dashboard.index.delete.action',

//       'products.index',
//       'products.create',
//       'products.low-stock',
//       'products.rejected',

//       'products.create.create.action',
//       'products.low-stock.update.action',
//       'products.rejected.update.action',

//       'access-control.index',
//       'access-control.employee-list',
//       'access-control.roles-permissions',
//       'access-control.roles-permissions.create.action',
//       'access-control.roles-permissions.update.action',

//       'access-control.roles-permissions.create',
//       'access-control.roles-permissions.edit',
//     ],
//   },
//   {
//     id: 2,
//     role: 'Admin',
//     status: 'N',
//     permissions: [
//       'dashboard.index',
//       'dashboard.index.delete.action',

//       'products.index',
//       'products.create',
//       'products.low-stock',
//       'products.rejected',

//       'products.create.create.action',
//       'products.low-stock.update.action',
//       'products.rejected.update.action',

//       'access-control.index',
//       'access-control.employee-list',
//       'access-control.roles-permissions',
//       'access-control.roles-permissions.create.action',
//       'access-control.roles-permissions.update.action',

//       'access-control.roles-permissions.create',
//       'access-control.roles-permissions.edit',
//     ],
//   },
//   {
//     id: 3,
//     role: 'Vendor',
//     status: 'Y',
//     permissions: [
//       'dashboard.index',
//       'dashboard.index.delete.action',

//       'products.index',
//       'products.create',
//       'products.low-stock',
//       'products.rejected',

//       'products.create.create.action',
//       'products.low-stock.update.action',
//       'products.rejected.update.action',

//       'access-control.index',
//       'access-control.employee-list',
//       'access-control.roles-permissions',
//       'access-control.roles-permissions.create.action',
//       'access-control.roles-permissions.update.action',

//       'access-control.roles-permissions.create',
//       'access-control.roles-permissions.edit',
//     ],
//   },
//   {
//     id: 4,
//     role: 'Logestic',
//     status: 'N',
//     permissions: [
//       'dashboard.index',
//       'dashboard.index.delete.action',

//       'products.index',
//       'products.create',
//       'products.low-stock',
//       'products.rejected',

//       'products.create.create.action',
//       'products.low-stock.update.action',
//       'products.rejected.update.action',

//       'access-control.index',
//       'access-control.employee-list',
//       'access-control.roles-permissions',
//       'access-control.roles-permissions.create.action',
//       'access-control.roles-permissions.update.action',

//       'access-control.roles-permissions.create',
//       'access-control.roles-permissions.edit',
//     ],
//   },
// ];

const employeeSchema = z.object({
  name: z.string().min(3, 'Invalid name'),
  employeeId: z.string().min(5, 'Invalid employee ID'),
  mobileNo: z.string().regex(PHONE_REGEX, 'Invalid mobile no.'),
  email: z.string().regex(EMAIL_REGEX, 'Invalid email address'),
  nid: z.string().regex(BD_NID_REGEX, 'Invalid Bangladesh NID number'),
  photo: z.instanceof(File, { message: 'Photo is required' }),
  depertment: z.string().min(1, 'Department is required'),
  role: z.string().min(1, 'Role is required'),
  gender: z.enum(['femele', 'male'], 'Gender is required'),
  status: z.enum(['Y', 'N'], 'Status is required'),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const CreateEmployeePage = () => {
  const { data: roles } = useGetRolesQuery('Roles');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: EmployeeFormData) => {
    console.log(data);
  };

  return (
    <PageSection title="Add New Employee" className="px-5 py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Employee Name"
            placeholder="Enter Employee Name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Employee ID"
            placeholder="Enter Employee Name"
            error={errors.employeeId?.message}
            {...register('employeeId')}
          />

          <Input
            label="Mobile No."
            placeholder="Ent Mobile No."
            error={errors.mobileNo?.message}
            {...register('mobileNo')}
          />

          <Input
            label="Email Address"
            placeholder="Enter Email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            type="number"
            label="NID No."
            placeholder="Enter NID No."
            error={errors.nid?.message}
            {...register('nid')}
          />
          <FileInput label="Photo" error={errors.photo?.message} {...register('photo')} />

          <Select
            label="Depertment"
            options={depertments}
            placeholder="Select Depertment"
            error={errors.depertment?.message}
            {...register('depertment')}
          />

          <Select
            label="Role"
            options={roles?.data}
            optionKeys={{ label: 'role', value: 'role' }}
            placeholder="Select Role"
            error={errors.role?.message}
            {...register('role')}
          />

          <Radio
            label="Gender"
            options={[
              { label: 'Femele', value: 'femele' },
              { label: 'Male', value: 'male' },
            ]}
            error={errors.gender?.message}
            {...register('gender')}
          />

          <Radio
            label="Status"
            options={[
              { label: 'Active', value: 'Y' },
              { label: 'Inactive', value: 'N' },
            ]}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Link
            to="/access-control/employees"
            className="text-center cursor-pointer w-full max-w-[180px] rounded-lg py-2.5 bg-danger-500 hover:bg-danger-600 font-semibold text-white"
            type="button"
          >
            Cancel
          </Link>

          <button
            className="cursor-pointer w-full max-w-[180px] rounded-lg py-2.5 bg-primary-500 hover:bg-primary-600 font-semibold text-white"
            type="submit"
          >
            Save
            {/* {submitLabel} */}
          </button>
        </div>
      </form>
    </PageSection>
  );
};

export default CreateEmployeePage;
