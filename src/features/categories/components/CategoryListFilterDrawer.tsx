import Drawer from '@/components/organisms/Drawer/Drawer';
import ComboBox from '@/components/atoms/ComboBox';
import { cleanQueryParams } from '@/utils/cleanQueryParams';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
import * as z from 'zod';
import { statusOptions } from '@/assets/data/status';

const categoryFilterSchema = z.object({
  actStatus: z.string().optional(),
  status: z.enum(['Y', 'N']).optional(),
});

type FilterFormData = z.infer<typeof categoryFilterSchema>;

interface CategoryListFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: FilterFormData;
}

const CategoryListFilterDrawer = ({
  isOpen,
  onClose,
  initialValues,
}: CategoryListFilterDrawerProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQueryParams = Object.fromEntries(searchParams.entries());

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<FilterFormData>({
    resolver: zodResolver(categoryFilterSchema),
    defaultValues: initialValues ?? {},
  });

  useEffect(() => {
    reset(initialValues ?? {});
  }, [initialValues, reset]);

  const onSubmit = (data: FilterFormData) => {
    const queryParams = cleanQueryParams(data);
    setSearchParams({ ...initialQueryParams, ...queryParams });
    reset();
    onClose();
  };

  const handleReset = () => {
    const approvalStatus = searchParams.get('approvalStatus');
    setSearchParams(cleanQueryParams({ approvalStatus }));
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} title="Filter Categories">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between w-80">
        <div className="space-y-4">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <ComboBox
                label="Category Status"
                options={statusOptions}
                optionKeys={{ label: 'label', value: 'value' }}
                placeholder="Select Category Status"
                {...field}
              />
            )}
          />
        </div>

        <div className="-mx-5 -my-4 mt-8 py-6 px-5 shadow-custom-3 font-semibold  grid grid-cols-2 gap-4 text-white">
          <button
            type="button"
            onClick={() => handleReset()}
            className="cursor-pointer bg-danger-500 hover:bg-danger-600 rounded-lg py-2"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer bg-primary-500 hover:bg-primary-600 rounded-lg py-2"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </Drawer>
  );
};

export default CategoryListFilterDrawer;
