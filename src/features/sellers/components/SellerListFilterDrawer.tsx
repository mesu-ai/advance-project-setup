import Drawer from '@/components/organisms/Drawer/Drawer';
import ComboBox from '@/components/atoms/ComboBox';
import { cleanQueryParams } from '@/utils/cleanQueryParams';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
import * as z from 'zod';

const productFilterSchema = z.object({
  actStatus: z.string().optional(),
  status: z.enum(['Y', 'N']).optional(),
});

type FilterFormData = z.infer<typeof productFilterSchema>;

interface SellerListFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: FilterFormData;
}

const SellerListFilterDrawer = ({
  isOpen,
  onClose,
  initialValues,
}: SellerListFilterDrawerProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQueryParams = Object.fromEntries(searchParams.entries());

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<FilterFormData>({
    resolver: zodResolver(productFilterSchema),
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
    <Drawer isOpen={isOpen} onClose={handleClose} title="Filter Sellers">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between w-80">
        <div className="space-y-4">
          <Controller
            name="actStatus"
            control={control}
            render={({ field }) => (
              <ComboBox
                label="Account Status"
                options={[
                  { label: 'Approved', value: 'approved' },
                  { label: 'Pending', value: 'pending' },
                  { label: 'Missing', value: 'missing' },
                  { label: 'Resubmit', value: 'resubmit' },
                ]}
                optionKeys={{ label: 'label', value: 'value' }}
                placeholder="Select Account Status"
                {...field}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <ComboBox
                label="Shop Status"
                options={[
                  { label: 'Active', value: 'Y' },
                  { label: 'Inactive', value: 'N' },
                ]}
                optionKeys={{ label: 'label', value: 'value' }}
                placeholder="Select Shop Status"
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

export default SellerListFilterDrawer;
