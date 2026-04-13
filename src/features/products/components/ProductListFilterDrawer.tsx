import Drawer from '@/components/organisms/Drawer/Drawer';
import ComboBox from '@/components/atoms/ComboBox';
import useSearchKeyword from '@/hooks/useSearchKeyword';
import { useGetShopsQuery } from '@/store/api/endpoints/shopEndpoints';
import { cleanQueryParams } from '@/utils/cleanQueryParams';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
import * as z from 'zod';

const productFilterSchema = z.object({
  categoryId: z.number().optional(),
  shopId: z.number().optional(),
  brandId: z.number().optional(),
  unit: z.string().optional(),
  status: z.enum(['Y', 'N']).optional(),
});

type FilterFormData = z.infer<typeof productFilterSchema>;

interface ProductFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: FilterFormData;
}

const ProductListFilterDrawer = ({ isOpen, onClose, initialValues }: ProductFilterDrawerProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categorySearch = useSearchKeyword(500);
  const shopSearch = useSearchKeyword(500);
  const brandSearch = useSearchKeyword(500);

  const initialQueryParams = Object.fromEntries(searchParams.entries());

  const { data: shops, isLoading: isShopLoading } = useGetShopsQuery(
    cleanQueryParams({ keyword: shopSearch?.debouncedKeyword })
  );

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
    <Drawer isOpen={isOpen} onClose={handleClose} title="Filter Products">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between w-96">
        <div className="space-y-4">
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <ComboBox
                label="Category"
                options={[
                  {
                    id: 6,
                    name: 'Mens Casual Shirt',
                  },
                  {
                    id: 7,
                    name: 'Mens Formal Shirt',
                  },
                  {
                    id: 10,
                    name: 'Mens T-Shirt',
                  },
                ]}
                optionKeys={{ label: 'name', value: 'id' }}
                // isLoading={isShopLoading}
                placeholder="Select/Search Category Name  "
                search={{
                  enabled: true,
                  onSearch: categorySearch.setKeyword,
                }}
                {...field}
              />
            )}
          />
          <Controller
            name="shopId"
            control={control}
            render={({ field }) => (
              <ComboBox
                label="Shop Name"
                options={shops?.data ?? []}
                optionKeys={{ label: 'shopName', value: 'shopId' }}
                isLoading={isShopLoading}
                placeholder="Select/Search Shop Name  "
                search={{
                  enabled: true,
                  onSearch: shopSearch.setKeyword,
                }}
                {...field}
              />
            )}
          />

          <Controller
            name="brandId"
            control={control}
            render={({ field }) => (
              <ComboBox
                label="Product Brand"
                placeholder="Select/Search Brand"
                options={[{ brandId: 1, brandName: 'SaRa' }]}
                optionKeys={{ label: 'brandName', value: 'brandId' }}
                search={{ enabled: true, onSearch: brandSearch.setKeyword }}
                {...field}
              />
            )}
          />

          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <ComboBox
                label="Product Quantity Unit"
                options={[
                  { label: 'PSC', value: 'psc' },
                  { label: 'KG', value: 'kg' },
                ]}
                optionKeys={{ label: 'label', value: 'value' }}
                placeholder="Select Product Quantity Unit"
                {...field}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <ComboBox
                label="Product Status"
                options={[
                  { label: 'Active', value: 'Y' },
                  { label: 'Inactive', value: 'N' },
                ]}
                optionKeys={{ label: 'label', value: 'value' }}
                placeholder="Select Product Status"
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

export default ProductListFilterDrawer;
