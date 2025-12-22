import Checkbox from '@/components/atoms/Checkbox';
import Checkbox2 from '@/components/atoms/Checkbox2';
import Switch from '@/components/atoms/Switch';
import DataTable from '@/components/organisms/DataTable';
import {
  accessRoutePermissions,
  productRoutePermissions,
  type RoutePermissionMapT,
} from '@/routes/routes.map';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, type ChangeEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router';
import * as z from 'zod';

const roleSchema = z.object({
  role: z.string().min(1, 'Role can not empty'),
  permission: z.array(z.string()),
});

type RoleFormData = z.infer<typeof roleSchema>;
type ModulePermissionT = {
  path: string;
  page: string;
  actions: readonly string[];
};
type ModuleT = { name: string; isEnabled: boolean; data: ModulePermissionT[] };

const pageName = (page: string) => page.split('.').slice(-2).join(' ');

const getModulePermissions = (module: ModulePermissionT[]) => {
  const allPerms: string[] = [];
  module.forEach((row) => {
    allPerms.push(row?.page);
    row?.actions.forEach((action) => allPerms.push(`${row.page}.${action}.action`));
  });
  return allPerms;
};

const modulePermissionRows = (moduleRoutes: RoutePermissionMapT) =>
  Object.entries(moduleRoutes).map(([path, permission]) => ({
    path,
    page: permission.page,
    actions: permission.actions ?? [],
  }));

const isModuleEnabled = (moduleRows: ModulePermissionT[], permissions: Set<string>): boolean => {
  const modulePerms = getModulePermissions(moduleRows);
  return modulePerms.every((p) => permissions.has(p));
};

const CreateNewRole = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: { permission: [] },
  });

  const watchedPermissions = useWatch({ control, name: 'permission', defaultValue: [] });
  const permissions = useMemo(() => new Set(watchedPermissions ?? []), [watchedPermissions]);

  const onSubmit = async (data: RoleFormData) => {
    console.log({ data });
  };

  const productPermissionRows: ModulePermissionT[] = useMemo(
    () => modulePermissionRows(productRoutePermissions),
    []
  );

  const accessPermissionRows: ModulePermissionT[] = useMemo(
    () => modulePermissionRows(accessRoutePermissions),
    []
  );

  const allPermissions = useMemo(
    () => [
      ...getModulePermissions(productPermissionRows),
      ...getModulePermissions(accessPermissionRows),
    ],
    [productPermissionRows, accessPermissionRows]
  );

  const isSelectAll = useMemo(
    () => allPermissions.every((p) => permissions.has(p)),
    [allPermissions, permissions]
  );

  const handleSelectAll = () => setValue('permission', isSelectAll ? [] : allPermissions);

  const handleModuleToggle = (module: ModulePermissionT[]) => {
    const modulePermissions = getModulePermissions(module);
    const next = new Set(permissions);

    const isEnabled = modulePermissions.every((p) => next.has(p));
    modulePermissions.forEach((perm) => (isEnabled ? next.delete(perm) : next.add(perm)));

    setValue('permission', Array.from(next));
  };

  const handlePageToggle = (e: ChangeEvent<HTMLInputElement>, row: ModulePermissionT) => {
    const isChecked = e.target.checked;
    const pagePermission: string[] = [
      row.page,
      ...row.actions.map((a) => `${row.page}.${a}.action`),
    ];
    const next = new Set(permissions);
    pagePermission.forEach((perm) => (isChecked ? next.add(perm) : next.delete(perm)));

    setValue('permission', Array.from(next));
  };

  const handleActionToggle = (e: ChangeEvent<HTMLInputElement>, action: string) => {
    const isChecked = e.target.checked;
    const next = new Set(permissions);
    if (isChecked) {
      next.add(action);
    } else {
      next.delete(action);
    }
    setValue('permission', Array.from(next));
  };

  const isProductsEnabled = useMemo(
    () => isModuleEnabled(productPermissionRows, permissions),
    [permissions, productPermissionRows]
  );
  const isRolesEnabled = useMemo(
    () => isModuleEnabled(accessPermissionRows, permissions),
    [permissions, accessPermissionRows]
  );

  const modules: ModuleT[] = [
    { name: 'Products', isEnabled: isProductsEnabled, data: productPermissionRows },
    { name: 'Roles & Permissions', isEnabled: isRolesEnabled, data: accessPermissionRows },
  ];

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
              <Switch isEnabled={isSelectAll} onEnabled={handleSelectAll} />
            </div>
          </div>

          <div className="space-y-4">
            {modules.map((module, index) => (
              <div key={index} className="rounded-lg border border-border">
                <div className="bg-surface rounded-t-lg px-4 py-3 flex items-center gap-3">
                  <p className="font-bold">{module?.name}</p>
                  <Switch
                    isEnabled={module?.isEnabled}
                    onEnabled={() => handleModuleToggle(module?.data)}
                  />
                </div>

                <DataTable
                  header={['Pages', { label: 'Actions', colSpan: 4 }]}
                  className="border-none"
                >
                  {module?.data.map((row) => (
                    <tr key={row.page}>
                      <td className="px-5 py-3">
                        <Checkbox2
                          label={pageName(row.page)}
                          value={row.page}
                          checked={permissions.has(row.page)}
                          onChange={(e) => handlePageToggle(e, row)}
                        />
                      </td>

                      {row?.actions.map((action) => (
                        <td className="px-5 py-3" key={action}>
                          <Checkbox
                            label={action}
                            value={`${row.page}.${action}.action`}
                            disabled={!permissions.has(row.page)}
                            checked={permissions.has(`${row.page}.${action}.action`)}
                            onChange={(e) => handleActionToggle(e, `${row.page}.${action}.action`)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </DataTable>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Link
              to="/access-control/roles-permissions"
              className="text-center cursor-pointer w-full max-w-[180px] rounded-lg py-2.5 bg-danger-500 hover:bg-danger-600 font-semibold text-white"
              type="button"
            >
              Cancel
            </Link>

            <button
              className="cursor-pointer w-full max-w-[180px] rounded-lg py-2.5 bg-primary-500 hover:bg-primary-600 font-semibold text-white"
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
