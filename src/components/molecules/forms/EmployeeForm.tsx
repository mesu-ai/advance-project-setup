import Button from '@/components/atoms/Button';
import FileInput from '@/components/atoms/FileInput';
import Input from '@/components/atoms/Input';
import Radio from '@/components/atoms/Radio';
import Select from '@/components/atoms/Select';
import PermissionTable from '@/components/organisms/PermissionTable';
import { submitLabel } from '@/constants/buttonLabel';
import { BD_NID_REGEX, EMAIL_REGEX, PHONE_REGEX } from '@/constants/regex';
import { useGetRolesQuery } from '@/store/api/endpoints/roleEndpoints';
import type { RoleT } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as z from 'zod';

const depertments = [
  { id: 1, label: 'Account', value: 'account' },
  { id: 2, label: 'HR Depertment', value: 'hr' },
  { id: 3, label: 'Desiner', value: 'designer' },
  { id: 3, label: 'E-commerce', value: 'e-commerce' },
];

const employeeSchema = z.object({
  name: z.string().min(3, 'Invalid name'),
  employeeId: z.string().min(5, 'Invalid employee ID'),
  mobileNo: z.string().regex(PHONE_REGEX, 'Invalid mobile no.'),
  email: z.string().regex(EMAIL_REGEX, 'Invalid email address'),
  nid: z.string().regex(BD_NID_REGEX, 'Invalid Bangladesh NID number'),
  depertment: z.string().min(1, 'Department is required'),
  role: z.string().min(1, 'Role is required'),
  gender: z.enum(['femele', 'male'], { message: 'Gender is required' }),
  status: z.enum(['Y', 'N'], { message: 'Status is required' }),
  permissions: z.array(z.string()),
  photo: z
    .union([z.string().min(1), z.instanceof(File)])
    .optional()
    .refine((val) => {
      if (val instanceof File) {
        return val.size <= 5_000_000;
      }
      return true;
    }, 'Max file size is 5MB')
    .refine((val) => {
      if (val instanceof File) {
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(val.type);
      }
      return true;
    }, 'Only .jpg, .jpeg, .png formats are supported'),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  mode: 'create' | 'edit';
  initialValues?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
}

const EmployeeForm = ({ mode, initialValues, onSubmit }: EmployeeFormProps) => {
  const [isExpand, setExpand] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data: roles, isLoading } = useGetRolesQuery('Roles');

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialValues ?? {},
  });

  const watchedPhoto = useWatch({ control, name: 'photo' });
  const watchedRole = useWatch({ control, name: 'role' });
  const watchedPermissions = useWatch({ control, name: 'permissions' });
  const permissions = useMemo(() => new Set(watchedPermissions ?? []), [watchedPermissions]);

  useEffect(() => {
    if (!watchedRole || !roles?.data) return;
    const selectedRole = roles.data.find((role: RoleT) => role?.role === watchedRole);
    if (!selectedRole?.permissions) return;

    setValue('permissions', selectedRole.permissions);
  }, [watchedRole, roles, setValue]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
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

        <FileInput
          label="Photo"
          error={errors.photo?.message}
          accept="image/png,image/jpeg"
          value={watchedPhoto}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setValue('photo', file, { shouldValidate: true });
          }}
        />

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

      {watchedRole ? (
        <>
          <button
            type="button"
            onClick={() => setExpand((prev) => !prev)}
            className="cursor-pointer border border-dashed p-4 w-full rounded-lg text-neutral-500"
          >
            {isExpand ? 'Collapse Permisssions' : 'View Permissions'}
          </button>
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpand ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          >
            <div className="overflow-hidden">
              <PermissionTable permissions={permissions} setValue={setValue} />
            </div>
          </div>
        </>
      ) : null}

      <div className="flex justify-end gap-4">
        <Button variant="cancel" onClick={() => navigate('/access-control/employees')}>
          Cancel
        </Button>

        <Button type="submit" variant="update">
          {submitLabel(mode, isSubmitting)}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
