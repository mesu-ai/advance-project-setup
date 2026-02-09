import ArrowIcon from '@/assets/svg/ArrowIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ComboBox from '@/components/atoms/ComboBox';
import CategorySelector from '@/features/products/components/CategorySelector';
import useSearchKeyword from '@/hooks/useSearchKeyword';
import { useGetShopsQuery } from '@/store/api/endpoints/shopEndpoints';
import type { SelectedCategoryT } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type ChangeEvent } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Editor from 'textcrafter';
import * as z from 'zod';
import ArrowLongIcon from '@/assets/svg/ArrowLongIcon';
import Checkbox from '@/components/atoms/Checkbox';
import FileInput from '@/components/atoms/FileInput';
import TextArea from '@/components/atoms/TextArea';
import ImageUploader from '@/components/molecules/ImageUploader';

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
  unit: z.string('Product unit is required'),
  shopId: z.number('Shop name is required'),
  displayOrder: z.string().optional(),
  // productImages: z.array(z.string()).nonempty('error'),
  productImages: z.string(),
  // productImages: z
  //   .array(
  //     z
  //       .instanceof(File)
  //       .refine((val) => val.size <= 5_000_000, {
  //         message: 'Max file size is 5MB',
  //       })
  //       .refine((val) => ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(val.type), {
  //         message: 'Only .jpg, .jpeg, .png, .gif formats are supported',
  //       })
  //   )
  //   .min(1, 'Please upload at least one image.'),
  brandId: z.number('Brand is required'),
  strapMeterial: z.string().optional(),
  fitType: z.string().optional(),
  gender: z.string().optional(),
  description: z.string().min(3, 'Description is required'),
  specification: z.string().min(3, 'Specification is required'),
  hasEmi: z.enum(['Y', 'N']).optional(),
  isReturnable: z.enum(['Y', 'N']).optional(),
  sizeChartId: z.number('Size chart is required'),
  productUrl: z.string().min(1, 'Product url is required'),
  videoUrl: z.string().optional(),
  metaTitle: z.string().optional(),
  metaKeywords: z.array(z.string()).optional(),
  metaDescription: z.string().optional(),
  ogType: z.string().optional(),
  ogTitle: z.string().optional(),
  ogUrl: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z
    .union([z.string().min(1), z.instanceof(File)])
    .optional()
    .refine((val) => {
      if (val instanceof File) {
        return val.size <= 5_000_000;
      }
      return true;
    }, 'Max file size is 5MB')
    .refine((val) => {
      if (val instanceof File) {
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(val.type);
      }
      return true;
    }, 'Only .jpg, .jpeg, .png formats are supported'),
});

type ProductFormData = z.infer<typeof productSchema>;

const CreateProductPage = () => {
  // const [editorContent, setEditorContent] = useState('');
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

  // const [uploadImage] = useUploadFileMutation();

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      description: '',
      specification: '',
      productImages:
        'https://prod.saraemrt.com/uploads/images/f3f7a244-f253-4e6b-897b-918cc53ef505.jpg',
    },
  });

  const watchedProductName = useWatch({ control, name: 'productName' });
  const watchedCategory = useWatch({ control, name: 'categoryId' });

  const handleSameAsMeta = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setValue('ogTitle', getValues('metaTitle'));
      setValue('ogUrl', getValues('productUrl'));
      setValue('ogDescription', getValues('metaDescription'));
    }
  };

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
                  required
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
                        error={errors.unit?.message}
                        required
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
                        required
                      />
                    )}
                  />

                  <Input
                    label="Display Order"
                    placeholder="1000000"
                    error={errors.displayOrder?.message}
                    {...register('displayOrder')}
                  />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
              <h2 className="text-lg font-bold">Images</h2>
              <div className="space-y-4">
                {/* <Controller
                  name="productImages"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FileInput
                      label="Product Image"
                      error={errors.productImages?.message}
                      errorSameRow={errors.productImages?.message}
                      accept="image/png,image/jpeg,image/jpg,image/gif"
                      value={value}
                      // className=""
                      required
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append('files', file);
                          const res = await uploadImage(formData).unwrap();
                          console.log({ res });
                        }
                      }}
                      // onChange={(e) => {
                      //   const file = e.target.files?.[0];
                      //   if (file) onChange(file);
                      // }}
                    />
                  )}
                /> */}

                <ImageUploader label="Product Image" required />
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
                      required
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
                      required
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
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Editor
                        value={value}
                        onChange={onChange}
                        toolbarClassName="custom-toolbar"
                        editorClassName="custom-editor"
                      />
                    )}
                  />
                  <p className="input-error">{errors.description?.message}</p>
                </div>
                <div>
                  <p className="input-label mb-1">
                    Product Specification <span className="text-danger-500">*</span>
                  </p>
                  <Controller
                    name="specification"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Editor
                        value={value}
                        onChange={onChange}
                        toolbarClassName="custom-toolbar"
                        editorClassName="custom-editor"
                      />
                    )}
                  />
                  <p className="input-error">{errors.specification?.message}</p>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <p className="input-label mb-1">Has EMI?</p>
                    <Controller
                      name="hasEmi"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          label="Yes"
                          checked={value === 'Y'}
                          onChange={(e) => onChange(e.target.checked ? 'Y' : 'N')}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <p className="input-label mb-1">Is Returnable?</p>
                    <Controller
                      name="isReturnable"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          label="Yes"
                          checked={value === 'Y'}
                          onChange={(e) => onChange(e.target.checked ? 'Y' : 'N')}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
              <h2 className="text-lg font-bold">Size Chart</h2>
              <div className="grid grid-cols-2 gap-3">
                <Controller
                  name="sizeChartId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <ComboBox
                      label="Size Chart Category"
                      options={[
                        { label: 'Mens Formal Shirt', value: 1 },
                        { label: 'Mens Casual Shirt', value: 2 },
                        { label: 'Mens T-shirt', value: 3 },
                        { label: 'Mens Panjabi Regular', value: 4 },
                      ]}
                      optionKeys={{ label: 'label', value: 'value' }}
                      onOptionSelect={(ch) => onChange(Number(ch.value))}
                      selectedValue={value}
                      placeholder="Select a Size Chart"
                      error={errors.sizeChartId?.message}
                      required
                    />
                  )}
                />
                <button
                  type="button"
                  className="mt-[27.97px] h-[35.72px] rounded-lg text-sm font-medium text-white bg-secondary-500"
                >
                  Create New
                </button>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
              <h2 className="text-lg font-bold">URL</h2>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Product URL"
                  placeholder="Enter Product URL"
                  error={errors.productUrl?.message}
                  {...register('productUrl')}
                  required
                />
                <Input
                  label="Video URL"
                  placeholder="Enter Video URL"
                  error={errors.videoUrl?.message}
                  {...register('videoUrl')}
                />
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
              <h2 className="text-lg font-bold">Meta & OG Info</h2>

              <div className="space-y-4">
                <Input
                  label="Meta Title"
                  placeholder="Enter Meta Title"
                  error={errors.metaTitle?.message}
                  {...register('metaTitle')}
                />
                <div className="grid grid-cols-2 gap-3">
                  <TextArea
                    label="Meta Description"
                    placeholder="Enter Meta Description"
                    {...register('metaDescription')}
                  />
                  <TextArea
                    label="Meta Keywords"
                    placeholder="Enter Meta Keywords"
                    required={false}
                    {...register('metaKeywords')}
                  />
                </div>

                <div>
                  <p className="input-label mb-1">OG Same As Meta??</p>
                  <Checkbox
                    label="Yes"
                    // checked={value === 'Y'}
                    onChange={(e) => handleSameAsMeta(e)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Controller
                    name="ogType"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <ComboBox
                        label="OG Type"
                        options={[
                          { label: 'Product', value: 'product' },
                          { label: 'Blog', value: 'blog' },
                          { label: 'Content', value: 'content' },
                          { label: 'Career', value: 'career' },
                        ]}
                        optionKeys={{ label: 'label', value: 'value' }}
                        onOptionSelect={(ogT) => onChange(ogT.value)}
                        selectedValue={value}
                        placeholder="Select og type"
                      />
                    )}
                  />
                  <Input label="OG Title" placeholder="Enter OG Title" {...register('ogTitle')} />
                  <Input label="OG Url" placeholder="Enter OG Url" {...register('ogUrl')} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <TextArea
                    label="OG Description"
                    placeholder="Enter OG Description"
                    {...register('ogDescription')}
                  />
                  <Controller
                    name="ogImage"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <FileInput
                        label="Photo"
                        error={errors.ogImage?.message}
                        errorSameRow={errors.ogDescription?.message}
                        accept="image/png,image/jpeg"
                        value={value}
                        className="row-span-1"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onChange(file);
                        }}
                        onDrop={(e) => onChange(e)}
                      />
                    )}
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
