import Button from '@/components/atoms/Button';
import FileInput from '@/components/atoms/FileInput';
import Input from '@/components/atoms/Input';
import Radio from '@/components/atoms/Radio';
import Select from '@/components/atoms/Select';
import PermissionTable from '@/components/organisms/PermissionTable';
import { submitLabel } from '@/constants/buttonLabel';
import { BD_NID_REGEX, PHONE_REGEX } from '@/constants/regex';
import { useGetRolesQuery } from '@/store/api/endpoints/roleEndpoints';
import type { RoleT } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
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
  email: z.email(),
  nid: z.string().regex(BD_NID_REGEX, 'Invalid Bangladesh NID number'),
  depertment: z.string().min(1, 'Department is required'),
  role: z.string().min(1, 'Role is required'),
  gender: z.enum(['male', 'female']).nullable(),
  status: z.enum(['Y', 'N'], { message: 'Status is required' }),
  permissions: z.array(z.string()).nonempty('Select at least one permission'),
  photo: z
    .union([z.string().min(1), z.instanceof(File)])
    .optional()
    // .refine((val) => val !== undefined && val !== null && val !== '', {
    //   message: 'Upload a photo',
    // })
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

  const { data: roles, isLoading } = useGetRolesQuery();

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialValues ?? { status: 'Y' },
  });

  // const watchedPhoto = useWatch({ control, name: 'photo' });
  const watchedRole = useWatch({ control, name: 'role' });
  const watchedPermissions = useWatch({ control, name: 'permissions' });
  const permissions = useMemo(() => new Set(watchedPermissions ?? []), [watchedPermissions]);

  useEffect(() => {
    if (!watchedRole || !roles?.data) return;
    const selectedRole = roles.data.find((role: RoleT) => role?.role === watchedRole);
    if (!selectedRole?.permissions) return;

    setValue('permissions', selectedRole.permissions);
    if (trigger) trigger('permissions');
  }, [watchedRole, roles, setValue, trigger]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Employee Name"
          placeholder="Enter Employee Name"
          error={errors.name?.message}
          {...register('name')}
          required
        />
        <Input
          label="Employee ID"
          placeholder="Enter Employee Name"
          error={errors.employeeId?.message}
          {...register('employeeId')}
          required
        />

        <Input
          label="Mobile No."
          placeholder="Ent Mobile No."
          error={errors.mobileNo?.message}
          {...register('mobileNo')}
          required
        />

        <Input
          label="Email Address"
          placeholder="Enter Email"
          error={errors.email?.message}
          {...register('email')}
          required
        />
        <Input
          type="number"
          label="NID No."
          placeholder="Enter NID No."
          error={errors.nid?.message}
          {...register('nid')}
          required
        />

        <Controller
          name="photo"
          control={control}
          render={({ field: { value, onChange } }) => (
            <FileInput
              label="Photo"
              error={errors.photo?.message}
              errorSameRow={errors.role?.message || errors.depertment?.message}
              accept="image/png,image/jpeg"
              value={value}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onChange(file);
              }}
              onDrop={(e) => onChange(e)}
              className="row-span-2"
            />
          )}
        />

        <Select
          label="Depertment"
          options={depertments}
          placeholder="Select Depertment"
          optionKeys={{ label: 'label', value: 'id' }}
          error={errors.depertment?.message}
          {...register('depertment')}
          required
        />

        <Select
          label="Role"
          options={roles?.data ?? []}
          optionKeys={{ label: 'role', value: 'role' }}
          placeholder="Select Role"
          error={errors.role?.message}
          {...register('role')}
          required
        />

        <Radio
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
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
          required
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
          {errors.permissions?.message && (
            <p className="input-error" role="alert">
              {errors.permissions?.message}
            </p>
          )}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpand ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          >
            <div className="overflow-hidden">
              <PermissionTable permissions={permissions} setValue={setValue} trigger={trigger} />
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
