import ArrowIcon from '@/assets/svg/ArrowIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ComboBox from '@/components/atoms/ComboBox';
import CategorySelector from '@/features/products/components/CategorySelector';
import useSearchKeyword from '@/hooks/useSearchKeyword';
import { useGetShopsQuery } from '@/store/api/endpoints/shopEndpoints';
import type { SelectedCategoryT } from '@/types/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Editor from 'textcrafter';
import * as z from 'zod';
import ArrowLongIcon from '@/assets/svg/ArrowLongIcon';

const categorySuggessions: SelectedCategoryT[] = [
  {
    id: 13,
    name: 'Clothing & Fashion > Mens > Mens Bottom Wear > Mens Formal Pant',
    layer: {
      base: 'Clothing & Fashion',
      first: 'Mens',
      second: 'Mens Bottom Wear',
      third: 'Mens Formal Pant',
    },
  },
  {
    id: 174,
    name: 'Lifestyle Accessories > Watch & Accessories > Smart Watches',
    layer: {
      base: 'Lifestyle Accessories',
      first: 'Watch & Accessories',
      second: 'Smart Watches',
    },
  },
];

const productSchema = z.object({
  productName: z.string().min(3, 'Product name is required'),
  categoryId: z.number('Product category is required'),
  unit: z.string().min(1, 'Product unit is required'),
  shopId: z.number('Shop name is required'),
  displayOrder: z.string().optional(),
  brandId: z.number('Brand is required'),
  strapMeterial: z.string().optional(),
  fitType: z.string().optional(),
  gender: z.string().optional(),
  description: z.string().min(3, 'Description is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

const CreateProductPage = () => {
  const [editorContent, setEditorContent] = useState('');
  const [isCategoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategoryT>({
    id: null,
    name: '',
    layer: {
      base: '',
      first: '',
      second: '',
      third: '',
    },
  });

  const [isExpandAtt, setExpandAtt] = useState(false);

  const shopSearch = useSearchKeyword(500);
  const brandSearch = useSearchKeyword(500);

  const { data: shops, isLoading: isShopLoading } = useGetShopsQuery({
    keyword: shopSearch?.debouncedKeyword,
  });

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      // shopId: 40,
    },
  });

  const watchedProductName = useWatch({ control, name: 'productName' });
  const watchedCategory = useWatch({ control, name: 'categoryId' });

  const onSubmit = (data: ProductFormData) => {
    console.log({ data });
  };

  return (
    <div>
      <h1 className="heading-1">Add New Product</h1>
      <div className="mt-3 flex gap-5">
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
              <h2 className="text-lg font-bold">Basic Information</h2>
              <div className="space-y-4">
                <Input
                  label="Product Name"
                  placeholder="EX. Men's Stylish Casual Shirt"
                  error={errors.productName?.message}
                  {...register('productName')}
                />

                <div>
                  <p className="input-label">
                    Product Category <span className="text-danger-500">*</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setCategoryOpen((prev) => !prev)}
                    className={`cursor-pointer text-start input-field flex justify-between items-center ${!watchedCategory && 'text-neutral-300'}`}
                  >
                    {watchedCategory ? (
                      <span className="text-sm">
                        {selectedCategory.layer?.base && `${selectedCategory.layer?.base}`}{' '}
                        {selectedCategory.layer?.first && `> ${selectedCategory.layer?.first}`}{' '}
                        {selectedCategory.layer?.second && `> ${selectedCategory.layer?.second}`}{' '}
                        {selectedCategory.layer?.third && `> ${selectedCategory.layer?.third}`}
                      </span>
                    ) : (
                      'Please Select Category or Search Here'
                    )}
                    <ArrowIcon
                      className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-0' : 'rotate-180'}`}
                    />
                  </button>
                  <p className="input-error">{errors.categoryId?.message}</p>

                  <CategorySelector
                    isOpen={isCategoryOpen}
                    onClose={() => setCategoryOpen(false)}
                    selected={selectedCategory}
                    onSelected={setSelectedCategory}
                    onConfirm={(c) => {
                      setValue('categoryId', Number(c.id));
                      trigger('categoryId');
                    }}
                    suggession={{
                      enabled: !!watchedProductName,
                      options: categorySuggessions,
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                  <Controller
                    name="unit"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <ComboBox
                        label="Product Quantity Unit"
                        selectedValue={value}
                        options={[
                          { label: 'PSC', value: 'psc' },
                          { label: 'KG', value: 'kg' },
                        ]}
                        optionKeys={{ label: 'label', value: 'value' }}
                        onOptionSelect={(u) => onChange(u.value)}
                        placeholder="Select Product Quantity Unit"
                        error={errors.shopId?.message}
                      />
                    )}
                  />

                  <Controller
                    name="shopId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <ComboBox
                        label="Shop Name"
                        selectedValue={value}
                        options={shops?.data ?? []}
                        optionKeys={{ label: 'shopName', value: 'shopId' }}
                        onOptionSelect={(s) => onChange(Number(s.shopId))}
                        error={errors.shopId?.message}
                        isLoading={isShopLoading}
                        placeholder="Select/Search Shop Name  "
                        search={{
                          enabled: true,
                          onSearch: shopSearch.setKeyword,
                        }}
                      />
                    )}
                  />

                  <Input
                    label="Display Order"
                    placeholder="1000000"
                    error={errors.displayOrder?.message}
                    required={false}
                    {...register('displayOrder')}
                  />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
              <h2 className="text-lg font-bold">Brand & Attributes</h2>
              <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                <Controller
                  name="brandId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <ComboBox
                      label="Product Brand"
                      options={[{ brandId: 1, brandName: 'SaRa' }]}
                      optionKeys={{ label: 'brandName', value: 'brandId' }}
                      onOptionSelect={(b) => onChange(Number(b.brandId))}
                      selectedValue={value}
                      search={{ enabled: true, onSearch: brandSearch.setKeyword }}
                      placeholder="Select/Search Brand"
                    />
                  )}
                />

                <Controller
                  name="strapMeterial"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <ComboBox
                      label="Strap Material"
                      options={[
                        { strapId: 1, strapName: 'Metal' },
                        { strapId: 1, strapName: 'Plastic' },
                      ]}
                      optionKeys={{ label: 'strapName', value: 'strapName' }}
                      onOptionSelect={(sm) => onChange(sm.strapName)}
                      selectedValue={value}
                      placeholder="Select Strap Material"
                    />
                  )}
                />

                {isExpandAtt ? (
                  <>
                    <Controller
                      name="fitType"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <ComboBox
                          label="Fit Type"
                          options={[
                            { id: 1, fitName: 'Slim' },
                            { id: 1, fitName: 'Regular' },
                          ]}
                          optionKeys={{ label: 'fitName', value: 'fitName' }}
                          onOptionSelect={(f) => onChange(f.fitName)}
                          selectedValue={value}
                          placeholder="Select Fit Type"
                        />
                      )}
                    />

                    <Controller
                      name="gender"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <ComboBox
                          label="Gender"
                          options={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                          ]}
                          optionKeys={{ label: 'label', value: 'value' }}
                          onOptionSelect={(sm) => onChange(sm.value)}
                          selectedValue={value}
                          placeholder="Select Gender"
                        />
                      )}
                    />
                  </>
                ) : null}

                <button
                  type="button"
                  onClick={() => setExpandAtt((prev) => !prev)}
                  className="cursor-pointer col-span-full font-medium text-primary-500 hover:text-primary-600 flex justify-center gap-1.5"
                >
                  {isExpandAtt ? 'See Less' : 'See Less'} <ArrowLongIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
              <h2 className="text-lg font-bold">Product Info </h2>
              <div className="space-y-4">
                <div>
                  <p className="input-label mb-1">
                    Description <span className="text-danger-500">*</span>
                  </p>
                  <Editor
                    value={editorContent}
                    onChange={setEditorContent}
                    toolbarClassName="custom-toolbar"
                    editorClassName="custom-editor"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="draft">Save As Draft</Button>

              <Button type="submit" variant="submit" disabled={isSubmitting}>
                {/* {submitLabel(mode, isSubmitting)} */}
                Submit Now
              </Button>
            </div>
          </form>
        </div>
        <div className="bg-surface rounded-xl border border-border px-5 py-4 w-[212px]">
          <h2 className="text-lg font-bold text-primary-500">Basic Information</h2>
          <p className="text-sm mt-3">
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their still
            in their infancy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
