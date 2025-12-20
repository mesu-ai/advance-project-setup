import Checkbox from '@/components/atoms/Checkbox';
import Checkbox2 from '@/components/atoms/Checkbox2';
import Switch from '@/components/atoms/Switch';
import DataTable from '@/components/organisms/DataTable';
import { productRoutePermissions } from '@/routes/routes.map';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const roleSchema = z.object({
  role: z.string().min(1, 'Role can not empty'),
  permission: z.array(z.string()),
});

type RoleFormDataT = z.infer<typeof roleSchema>;

const pageName = (page: string) => page.split('.').slice(-2).join(' ');

const CreateNewRole = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<RoleFormDataT>({
    resolver: zodResolver(roleSchema),
    defaultValues: { permission: [] },
  });

  const permissions = watch('permission') || [];

  const onSubmit = async (data: RoleFormDataT) => {
    console.log({ data });
  };

  const productPermissionRows = Object.entries(productRoutePermissions).map(
    ([path, permission]) => ({ path, page: permission.page, actions: permission.actions ?? [] })
  );

  // console.log(productPermissionRows);

  return (
    <div>
      <h2 className="heading-2">Add New Role</h2>

      <div className="bg-surface mt-3 rounded-xl border border-border px-5 py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="role">Role Name</label>
            <div className="input-field max-w-xl">
              <input
                type="text"
                id="role"
                placeholder="Enter Role Name"
                className="outline-none w-full"
                {...register('role')}
              />
            </div>
            <p className="input-error">{errors.role?.message}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-bold">Role Permission</p>
            <div className="flex items-center gap-3">
              <p className="font-medium text-primary-500">Select All</p>
              <Switch isEnabled={isEnabled} onEnabled={() => setIsEnabled((prev) => !prev)} />
            </div>
          </div>

          <div>
            <div className="rounded-lg border border-border">
              <div className="bg-white-700 dark:bg-black-500 rounded-t-lg px-4 py-3 flex items-center gap-3">
                <p className="font-bold">Products</p>
                <Switch isEnabled={isEnabled} onEnabled={() => setIsEnabled((prev) => !prev)} />
              </div>

              <DataTable
                header={['Pages', { label: 'Actions', colSpan: 4 }]}
                className="border-none"
              >
                {productPermissionRows.map((row, index) => (
                  <tr key={index}>
                    <td className="px-5 py-3">
                      <Checkbox2
                        label={pageName(row.page)}
                        value={row.page}
                        {...register('permission')}
                        className="font-medium text-black-300"
                      />
                    </td>

                    {row?.actions.map((action) => (
                      <td className="px-5 py-3" key={action}>
                        <Checkbox
                          label={action}
                          value={`${row.page}.${action}.action`}
                          disabled={!permissions.includes(row.page)}
                          {...register('permission')}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </DataTable>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="w-full max-w-[180px] rounded-lg py-2.5 bg-danger-500 hover:bg-danger-600 font-semibold text-white"
              type="submit"
            >
              Cancel
            </button>
            <button
              className="w-full max-w-[180px] rounded-lg py-2.5 bg-primary-500 hover:bg-primary-600 font-semibold text-white"
              type="submit"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewRole;
