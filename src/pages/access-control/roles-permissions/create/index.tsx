import SwitchIcon from '@/assets/svg/SwitchIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const roleSchema = z.object({
  role: z.string().min(1, 'Role can not empty'),
});

type RoleFormDataT = z.infer<typeof roleSchema>;

const CreateNewRole = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RoleFormDataT>({ resolver: zodResolver(roleSchema) });

  const onSubmit = () => {};

  return (
    <div>
      <h2 className="heading-2">Add New Role</h2>

      <div className="bg-surface mt-3 rounded-xl border border-border px-5 py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="role">Role Name</label>
            <div className="input-field">
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

          <div>
            <p className="font-bold">Role Permission</p>

            <div className="bg-">
              <button type="button" className="text-success-500 bg-yellow-200">
                <SwitchIcon />
              </button>
            </div>
          </div>

          <div>
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
