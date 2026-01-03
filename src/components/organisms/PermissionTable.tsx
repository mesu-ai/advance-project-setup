import { useMemo, type ChangeEvent } from 'react';
import Checkbox from '../atoms/Checkbox';
import Checkbox2 from '../atoms/Checkbox2';
import Switch from '../atoms/Switch';
import DataTable from './DataTable';
import type { RoutePermissionMapT } from '@/types';
import { accessRoutePermissions, productRoutePermissions } from '@/routes/routes.map';
import type { FieldValues, Path, UseFormSetValue } from 'react-hook-form';

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
  Object.entries(moduleRoutes)
    .filter(([, permission]) => permission.showInTable !== false)
    .map(([path, permission]) => ({
      path,
      page: permission.page,
      actions: permission.actions ?? [],
    }));

const isModuleEnabled = (moduleRows: ModulePermissionT[], permissions: Set<string>): boolean => {
  const modulePerms = getModulePermissions(moduleRows);
  return modulePerms.every((p) => permissions.has(p));
};

type PermissionTableProps<T extends FieldValues & { permissions: string[] }> = {
  permissions: Set<string>;
  setValue: UseFormSetValue<T>;
};

const PermissionTable = <T extends FieldValues & { permissions: string[] }>({
  permissions,
  setValue,
}: PermissionTableProps<T>) => {
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

  const handleSelectAll = () =>
    setValue('permissions' as Path<T>, (isSelectAll ? [] : allPermissions) as never);

  const handleModuleToggle = (module: ModulePermissionT[]) => {
    const modulePermissions = getModulePermissions(module);
    const next = new Set(permissions);

    const isEnabled = modulePermissions.every((p) => next.has(p));
    modulePermissions.forEach((perm) => (isEnabled ? next.delete(perm) : next.add(perm)));

    setValue('permissions' as Path<T>, Array.from(next) as never);
  };

  const handlePageToggle = (e: ChangeEvent<HTMLInputElement>, row: ModulePermissionT) => {
    const isChecked = e.target.checked;
    const pagePermission: string[] = [
      row.page,
      ...row.actions.map((a) => `${row.page}.${a}.action`),
    ];
    const next = new Set(permissions);
    pagePermission.forEach((perm) => (isChecked ? next.add(perm) : next.delete(perm)));

    setValue('permissions' as Path<T>, Array.from(next) as never);
  };

  const handleActionToggle = (e: ChangeEvent<HTMLInputElement>, action: string) => {
    const isChecked = e.target.checked;
    const next = new Set(permissions);
    if (isChecked) {
      next.add(action);
    } else {
      next.delete(action);
    }
    setValue('permissions' as Path<T>, Array.from(next) as never);
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
    <>
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

            <DataTable header={['Pages', { label: 'Actions', colSpan: 4 }]} className="border-none">
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
    </>
  );
};

export default PermissionTable;
