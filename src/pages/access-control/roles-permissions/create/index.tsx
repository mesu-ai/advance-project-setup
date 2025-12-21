import Checkbox from '@/components/atoms/Checkbox';
import Checkbox2 from '@/components/atoms/Checkbox2';
import Switch from '@/components/atoms/Switch';
import DataTable from '@/components/organisms/DataTable';
import { productRoutePermissions } from '@/routes/routes.map';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const roleSchema = z.object({
  role: z.string().min(1, 'Role can not empty'),
  permission: z.array(z.string()),
});

type RoleFormData = z.infer<typeof roleSchema>;

type ModuleRoutePermissionT = {
  path: string;
  page: string;
  actions: readonly string[];
};

type ModuleKeyT = 'isProductsEnabled' | 'isOrdersEnabled';
type EnableModuleT = Record<ModuleKeyT, boolean>;

const pageName = (page: string) => page.split('.').slice(-2).join(' ');

const getModulePermissions = (module: ModuleRoutePermissionT[]) => {
  const allPerms: string[] = [];
  module.forEach((row) => {
    allPerms.push(row?.page);
    row?.actions.forEach((action) => allPerms.push(`${row.page}.${action}.action`));
  });
  return allPerms;
};

const CreateNewRole = () => {
  const [isSelectAll, setSelectAll] = useState<boolean>(false);

  const [enabledModules, setEnabledModules] = useState<EnableModuleT>({
    isProductsEnabled: false,
    isOrdersEnabled: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: { permission: [] },
  });

  const watchedPermissions = watch('permission');
  const permissions = useMemo(() => watchedPermissions || [], [watchedPermissions]);

  const onSubmit = async (data: RoleFormData) => {
    console.log({ data });
  };

  const productPermissionRows: ModuleRoutePermissionT[] = Object.entries(
    productRoutePermissions
  ).map(([path, permission]) => ({
    path,
    page: permission.page,
    actions: permission.actions ?? [],
  }));

  const handleModuleToggle = (module: ModuleRoutePermissionT[], enabled: ModuleKeyT) => {
    const productsPermissions = getModulePermissions(module);

    if (enabledModules[enabled]) {
      //deselect all and remove products permission
      const newPermissions = permissions.filter((perm) => !productsPermissions.includes(perm));
      setValue('permission', newPermissions);
      setEnabledModules((prev) => ({
        ...prev,
        [enabled]: false,
      }));
    } else {
      //select all and push products permission
      const newPermissions = [...new Set([...permissions, ...productsPermissions])];
      setValue('permission', newPermissions);
      setEnabledModules((prev) => ({
        ...prev,
        [enabled]: true,
      }));
    }
  };

  const handlePageToggle = (e: ChangeEvent<HTMLInputElement>, row: ModuleRoutePermissionT) => {
    const isChecked = e.target.checked;
    const pagePermission: string[] = [];
    pagePermission.push(row.page);
    row.actions.forEach((action) => pagePermission.push(`${row.page}.${action}.action`));

    if (isChecked) {
      const newPermissions = [...new Set([...permissions, ...pagePermission])];
      setValue('permission', newPermissions);
    } else {
      const newPermissions = permissions.filter((perm) => !pagePermission.includes(perm));
      setValue('permission', newPermissions);
    }
  };

  const handleActionToggle = (e: ChangeEvent<HTMLInputElement>, action: string) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const newPermission = [...new Set([...permissions, action])];
      setValue('permission', newPermission);
    } else {
      const newPermission = permissions.filter((perms) => perms !== action);
      setValue('permission', newPermission);
    }
  };

  return (
    <div>
      <h2 className="heading-2">Add New Role</h2>

      <div className="bg-surface mt-3 rounded-xl border border-border px-5 py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="role">Role Name</label>
            <div className="input-field max-w-1/2">
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
              <Switch isEnabled={isSelectAll} onEnabled={() => setSelectAll((prev) => !prev)} />
            </div>
          </div>

          <div>
            <div className="rounded-lg border border-border">
              <div className="bg-white dark:bg-black-500 rounded-t-lg px-4 py-3 flex items-center gap-3">
                <p className="font-bold">Products</p>
                <Switch
                  isEnabled={enabledModules?.isProductsEnabled}
                  onEnabled={() => handleModuleToggle(productPermissionRows, 'isProductsEnabled')}
                />
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
                        checked={permissions.includes(row.page)}
                        onChange={(e) => handlePageToggle(e, row)}
                        // {...register('permission')}
                      />
                    </td>

                    {row?.actions.map((action) => (
                      <td className="px-5 py-3" key={action}>
                        <Checkbox
                          label={action}
                          value={`${row.page}.${action}.action`}
                          disabled={!permissions.includes(row.page)}
                          checked={permissions.includes(`${row.page}.${action}.action`)}
                          // {...register('permission')}
                          onChange={(e) => handleActionToggle(e, `${row.page}.${action}.action`)}
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
