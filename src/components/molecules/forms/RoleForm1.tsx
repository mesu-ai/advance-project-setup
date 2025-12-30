import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import PermissionTable from '@/components/organisms/PermissionTable';
import { submitLabel } from '@/constants/buttonLabel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as z from 'zod';

const roleSchema = z.object({
  status: z.enum(['Y', 'N'], 'Status is required'),
  role: z.string().min(1, 'Role can not empty'),
  permissions: z.array(z.string()),
});

export type RoleFormData = z.infer<typeof roleSchema>;

interface RoleFormProps {
  mode: 'create' | 'edit';
  initialValue?: RoleFormData;
  onSubmit: (data: RoleFormData) => Promise<void>;
}

const RoleForm1 = ({ mode, initialValue, onSubmit }: RoleFormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: initialValue ?? { role: '', status: 'Y', permissions: [] },
  });

  const watchedPermissions = useWatch({ control, name: 'permissions' });
  const permissions = useMemo(() => new Set(watchedPermissions ?? []), [watchedPermissions]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Role Name"
          placeholder="Enter Role Name"
          error={errors.role?.message}
          {...register('role')}
        />

        <div className="w-1/2">
          <Select
            label="Status"
            options={[
              { label: 'Active', value: 'Y' },
              { label: 'Inactive', value: 'N' },
            ]}
            {...register('status')}
          />
        </div>
      </div>

      <PermissionTable permissions={permissions} setValue={setValue} />

      <div className="flex justify-end gap-4">
        <Button variant="cancel" onClick={() => navigate('/access-control/roles')}>
          Cancel
        </Button>
        <Button type="submit" variant="update">
          {submitLabel(mode, isSubmitting)}
        </Button>
      </div>
    </form>
  );
};

export default RoleForm1;
