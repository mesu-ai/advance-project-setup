import ArrowIcon from '@/assets/svg/ArrowIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import CategorySelector from '@/features/products/components/CategorySelector';
import useSearchKeyword from '@/hooks/useSearchKeyword';
import { useGetShopsQuery } from '@/store/api/endpoints/shopEndpoints';
import type { SelectedCategoryT } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import Editor from 'textcrafter';
import ArrowLongIcon from '@/assets/svg/ArrowLongIcon';
import Checkbox from '@/components/atoms/Checkbox';
import FileInput from '@/components/atoms/FileInput';
import TextArea from '@/components/atoms/TextArea';
import ImageUploader from '@/components/molecules/ImageUploader';
import ComboBox from '@/components/atoms/ComboBox';
import WarningIcon from '@/assets/svg/WarningIcon';
import SellingPriceModal, {
  type PriceFormData,
} from '@/features/products/components/SellingPriceModal';
import VariantPriceTable from '@/features/products/components/VariantPriceTable';
import EditIcon from '@/assets/svg/EditIcon';
import DeleteIcon from '@/assets/svg/DeleteIcon';
import { productCreateSteps } from '@/assets/data/productCreateSteps';
import { productSchema, type ProductFormData } from '@/features/products/schema';

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

const colorVariants: { variantOptionId: number; variantOptionText: string }[] = [
  { variantOptionId: 425, variantOptionText: 'Green' },
  { variantOptionId: 426, variantOptionText: 'Ash' },
  { variantOptionId: 427, variantOptionText: 'Maroon' },
  { variantOptionId: 428, variantOptionText: 'White' },
];

const sizeVariants: { variantOptionId: number; variantOptionText: string }[] = [
  { variantOptionId: 442, variantOptionText: 'XS' },
  { variantOptionId: 443, variantOptionText: 'S' },
  { variantOptionId: 444, variantOptionText: 'M' },
  { variantOptionId: 445, variantOptionText: 'L' },
  { variantOptionId: 446, variantOptionText: 'XL' },
  { variantOptionId: 447, variantOptionText: 'XXL' },
];

const sectionKeys = [
  'basisInfo',
  'images',
  'attributes',
  'variants',
  'productInfo',
  'sizeChart',
  'warranty',
  'url',
  'meta',
] as const;

type SectionKeyT = (typeof sectionKeys)[number];

const CreateProductPage = () => {
  const [step, setStep] = useState<number>(-1);
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
  const [hasVariantImages, setHasVariantImages] = useState(true);
  const [isSellingPriceModal, setSellingPriceModal] = useState(false);

  const shopSearch = useSearchKeyword(500);
  const brandSearch = useSearchKeyword(500);
  const isScrollingRef = useRef(false);
  const scrollTimeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sectionsRef = useRef<Record<SectionKeyT, HTMLDivElement | null>>({
    basisInfo: null,
    images: null,
    attributes: null,
    variants: null,
    productInfo: null,
    sizeChart: null,
    warranty: null,
    url: null,
    meta: null,
  });

  const scrollToSection = (index: number) => {
    isScrollingRef.current = true;
    setStep(index);

    sectionsRef.current[sectionKeys[index]]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    if (scrollTimeRef.current) clearTimeout(scrollTimeRef.current);
    scrollTimeRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  const { data: shops, isLoading: isShopLoading } = useGetShopsQuery({
    keyword: shopSearch?.debouncedKeyword,
  });

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
      thumbnailImages: [
        'https://prod.saraemart.com/uploads/images/e26107e8-992c-4d5f-845a-b3328a6a00c5.png',
        'https://prod.saraemart.com/uploads/images/979a4366-b217-43d0-a7f9-1245b8ae9eb4.png',
        'https://prod.saraemart.com/uploads/images/ba8cf1fa-442d-43f6-8128-6426053f1dad.jpg',
        'https://prod.saraemart.com/uploads/images/89d781cf-0e16-4ede-a0ad-ad63e1a63a5e.jpg',
        'https://prod.saraemart.com/uploads/images/b012a4a9-dc68-4788-9415-ff8d38327768.jpg',
      ],
      variantDimensions: [
        {
          dimensionId: 'color',
          name: 'Color',
          options: [{ variantOptionId: 425, variantOptionText: 'Green' }],
        },
        {
          dimensionId: 'size',
          name: 'Size',
          options: [
            { variantOptionId: 442, variantOptionText: 'XS' },
            { variantOptionId: 443, variantOptionText: 'S' },
          ],
        },
      ],
      variantImages: [
        {
          variantOptionId: 425,
          variantOptionText: 'Green',
          images: [
            'https://prod.saraemart.com/uploads/images/e26107e8-992c-4d5f-845a-b3328a6a00c5.png',
            'https://prod.saraemart.com/uploads/images/979a4366-b217-43d0-a7f9-1245b8ae9eb4.png',
            'https://prod.saraemart.com/uploads/images/ba8cf1fa-442d-43f6-8128-6426053f1dad.jpg',
          ],
        },
      ],

      // burn= mrp- selling
      // discount= mrp - selling
      // commission = selling -dp
      variantCombinations: [
        // {
        //   sku: 'dsewes',
        //   subStyle: 'dffrr',
        //   stock: 20,
        //   dpPrice: 500,
        //   mrp: 700,
        //   sellingPrice: 600,
        //   sellingDate: '2026-03-17T19:14',
        //   burnAmount: 100,
        //   commissionAmount: 100,
        //   options: [
        //     { variantOptionId: 425, variantOptionText: 'Green' },
        //     { variantOptionId: 442, variantOptionText: 'XS' },
        //   ],
        // },
        // {
        //   sku: 'aas',
        //   subStyle: 'ddeet',
        //   stock: 50,
        //   dpPrice: 300,
        //   mrp: 400,
        //   sellingPrice: 350,
        //   sellingDate: '2026-02-28T04:12',
        //   burnAmount: 50,
        //   commissionAmount: 50,
        //   options: [
        //     { variantOptionId: 425, variantOptionText: 'Green' },
        //     { variantOptionId: 443, variantOptionText: 'S' },
        //   ],
        // },
      ],
    },
  });

  const { fields: imageFields, replace: replaceImagFields } = useFieldArray({
    control,
    name: 'variantImages',
  });

  const watchedProductName = useWatch({ control, name: 'productName' });
  const watchedCategory = useWatch({ control, name: 'categoryId' });
  // const watchedVariants = useWatch({ control, name: 'variantDimensions' });

  const watchColor = useWatch({ control, name: 'variantDimensions.0.options' });
  const watchSize = useWatch({ control, name: 'variantDimensions.1.options' });

  const handleSameAsMeta = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setValue('ogTitle', getValues('metaTitle'));
      setValue('ogUrl', getValues('productUrl'));
      setValue('ogDescription', getValues('metaDescription'));
    }
  };

  const handleSellingPriceReset = () => {
    setValue('sellingPrice', undefined);
    setValue('sellingDate', '');
  };

  const handleGroupApply = () => {
    const values = getValues();

    const {
      sku = '',
      subStyle = '',
      stock,
      dpPrice,
      mrp,
      sellingPrice,
      sellingDate = '',
      variantCombinations = [],
    } = values;

    const burnAmount = (Number(mrp) || 0) - (Number(sellingPrice) || 0);
    const commissionAmount = (Number(sellingPrice) || 0) - (Number(dpPrice) || 0);

    variantCombinations.forEach((_, index) => {
      setValue(`variantCombinations.${index}.sku`, sku);
      setValue(`variantCombinations.${index}.subStyle`, subStyle);
      setValue(`variantCombinations.${index}.stock`, stock);
      setValue(`variantCombinations.${index}.dpPrice`, dpPrice);
      setValue(`variantCombinations.${index}.mrp`, mrp);
      setValue(`variantCombinations.${index}.sellingPrice`, sellingPrice);
      setValue(`variantCombinations.${index}.sellingDate`, sellingDate);
      setValue(`variantCombinations.${index}.burnAmount`, burnAmount);
      setValue(`variantCombinations.${index}.commissionAmount`, commissionAmount);
    });
  };

  const onPriceSubmit = (data: PriceFormData) => {
    setValue('sellingPrice', data.sellingPrice);
    setValue('sellingDate', data.sellingDate);

    setSellingPriceModal(false);
  };

  const onSubmit = (data: ProductFormData) => {
    console.log({ data });
  };

  useEffect(() => {
    if (!hasVariantImages) return;
    const variantWiseImages = getValues('variantImages');
    const mappedImageFields = watchColor.map((c) => {
      const found = variantWiseImages?.find((v_img) => v_img.variantOptionId === c.variantOptionId);
      return (
        found ?? {
          variantOptionId: c?.variantOptionId,
          variantOptionText: c.variantOptionText,
          images: [],
        }
      );
    });

    replaceImagFields(mappedImageFields);
  }, [hasVariantImages, watchColor, replaceImagFields, getValues]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionKeys.findIndex((key) => sectionsRef.current[key] === entry.target);
            if (index !== -1) {
              setStep(index);
            }
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sectionKeys.forEach((key) => {
      const el = sectionsRef.current[key];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [watchedCategory]);

  return (
    <div>
      <h1 className="heading-1">Add New Product</h1>
      <div className="mt-3 grid grid-cols-[1fr_212px] items-start gap-5">
        <div className="min-w-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div
              ref={(el) => {
                sectionsRef.current.basisInfo = el;
              }}
              className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4 scroll-mt-20"
            >
              <h2 className="text-lg font-bold">Basic Information</h2>
              <div className="space-y-4">
                <Input
                  label="Product Name"
                  placeholder="EX. Men's Stylish Casual Shirt"
                  error={errors.productName?.message}
                  {...register('productName')}
                  title="Must be 8-12 characters long."
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

                {watchedCategory ? (
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4">
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
                          error={errors.unit?.message}
                          required
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
                          error={errors.shopId?.message}
                          isLoading={isShopLoading}
                          placeholder="Select/Search Shop Name  "
                          search={{
                            enabled: true,
                            onSearch: shopSearch.setKeyword,
                          }}
                          required
                          {...field}
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
                ) : null}
              </div>
            </div>

            {watchedCategory ? (
              <>
                <div
                  ref={(el) => {
                    sectionsRef.current.images = el;
                  }}
                  className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4 scroll-mt-20"
                >
                  <h2 className="text-lg font-bold">Images</h2>
                  <div className="space-y-4">
                    <Controller
                      name="thumbnailImages"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <ImageUploader
                          required
                          label="Product Image"
                          value={value}
                          onChangeImage={(img) => onChange(img)}
                          error={errors.thumbnailImages?.message}
                        />
                      )}
                    />
                  </div>
                </div>

                <div
                  ref={(el) => {
                    sectionsRef.current.attributes = el;
                  }}
                  className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4 scroll-mt-20"
                >
                  <h2 className="text-lg font-bold">Brand & Attributes</h2>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4">
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
                          error={errors.brandId?.message}
                          required
                          {...field}
                        />
                      )}
                    />

                    <Controller
                      name="strapMeterial"
                      control={control}
                      render={({ field }) => (
                        <ComboBox
                          label="Strap Material"
                          placeholder="Select Strap Material"
                          options={[
                            { strapId: 1, strapName: 'Metal' },
                            { strapId: 1, strapName: 'Plastic' },
                          ]}
                          optionKeys={{ label: 'strapName', value: 'strapName' }}
                          // error={errors.strapMeterial?.message}
                          // required
                          {...field}
                        />
                      )}
                    />

                    {isExpandAtt ? (
                      <>
                        <Controller
                          name="fitType"
                          control={control}
                          render={({ field }) => (
                            <ComboBox
                              label="Fit Type"
                              options={[
                                { id: 1, fitName: 'Slim' },
                                { id: 1, fitName: 'Regular' },
                              ]}
                              optionKeys={{ label: 'fitName', value: 'fitName' }}
                              placeholder="Select Fit Type"
                              {...field}
                            />
                          )}
                        />

                        <Controller
                          name="gender"
                          control={control}
                          render={({ field }) => (
                            <ComboBox
                              label="Gender"
                              options={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                              ]}
                              optionKeys={{ label: 'label', value: 'value' }}
                              placeholder="Select Gender"
                              {...field}
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

                <div
                  ref={(el) => {
                    sectionsRef.current.variants = el;
                  }}
                  className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4 scroll-mt-20"
                >
                  <h2 className="text-lg font-bold">Price, Stock & Variants</h2>
                  <div className="space-y-4">
                    <Controller
                      name={`variantDimensions.0.options`}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <ComboBox
                          isMulti
                          label="Color"
                          options={colorVariants ?? []}
                          optionKeys={{ label: 'variantOptionText', value: 'variantOptionId' }}
                          error={errors.variantDimensions?.[0]?.options?.message}
                          isLoading={false}
                          placeholder="Select/Search Color"
                          value={value.map((v) => v.variantOptionId) ?? []}
                          onChange={(ids: number[]) => {
                            const colorSet = new Set(ids);
                            const colorOptions = colorVariants.filter((c) => {
                              if (colorSet.has(c.variantOptionId)) {
                                return (c.variantOptionId, c.variantOptionText);
                              }
                            });
                            onChange(colorOptions);
                          }}
                          search={{
                            enabled: true,
                            onSearch: shopSearch.setKeyword,
                          }}
                          required
                        />
                      )}
                    />

                    <div>
                      <div className="flex items-center gap-1">
                        <Checkbox
                          label="Product Image"
                          disabled={watchColor.length === 0}
                          checked={hasVariantImages}
                          onChange={(e) => setHasVariantImages(e.target.checked)}
                          className="input-label"
                        />
                        <WarningIcon className="w-5 h-5 stroke-neutral-300" />
                      </div>

                      {hasVariantImages && (
                        <div className="space-y-4">
                          {imageFields.map((v, index) => (
                            <Controller
                              key={v.id}
                              name={`variantImages.${index}.images`}
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <ImageUploader
                                  value={value}
                                  onChangeImage={(img) => onChange(img)}
                                  instructions={`Color: ${v.variantOptionText}`}
                                  error={errors.thumbnailImages?.message}
                                />
                              )}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <Controller
                      name={`variantDimensions.1.options`}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <ComboBox
                          isMulti
                          label="Size"
                          options={sizeVariants ?? []}
                          optionKeys={{ label: 'variantOptionText', value: 'variantOptionId' }}
                          error={errors.variantDimensions?.[1]?.options?.message}
                          isLoading={false}
                          placeholder="Select Size"
                          value={value.map((v) => v.variantOptionId) ?? []}
                          onChange={(ids: number[]) => {
                            const sizeSet = new Set(ids);
                            const selectedOptions = sizeVariants.filter((s) => {
                              if (sizeSet.has(s.variantOptionId)) {
                                return (s.variantOptionId, s.variantOptionText);
                              }
                            });
                            onChange(selectedOptions);
                          }}
                          required
                        />
                      )}
                    />

                    <div>
                      <p className="input-label ">
                        Price & Stock <span className="text-danger-500">*</span>
                      </p>

                      <div className="w-full flex flex-wrap items-center gap-3">
                        <Input
                          placeholder="SKU/Barcode"
                          className="min-w-40"
                          {...register('sku')}
                        />
                        <Input
                          placeholder="Sub-Style"
                          className="min-w-40"
                          {...register('subStyle')}
                        />
                        <Input placeholder="Stock" className="w-24" {...register('stock')} />
                        <Input placeholder="DP" className="w-28" {...register('dpPrice')} />

                        <Input placeholder="MRP" className="w-28" {...register('mrp')} />

                        {getValues('sellingPrice') ? (
                          <div className="min-w-28 flex items-center border border-neutral-300 py-1 px-2 leading-normal rounded hover:bg-white-700">
                            <span>{getValues('sellingPrice')}</span>
                            <button
                              type="button"
                              onClick={() => setSellingPriceModal(true)}
                              aria-label="Edit selling price"
                              className="ms-auto cursor-pointer text-neutral-300 hover:text-secondary-500"
                            >
                              <EditIcon className="w-5 h-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSellingPriceReset()}
                              aria-label="Reset selling price"
                              className="ms-1 cursor-pointer text-neutral-300 hover:text-danger-500"
                            >
                              <DeleteIcon className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSellingPriceModal(true)}
                            className="max-w-28 leading-normal whitespace-nowrap cursor-pointer text-secondary-500 hover:text-secondary-600 text-sm font-medium"
                          >
                            Add Selling Price
                          </button>
                        )}

                        <Button
                          variant="apply"
                          className="ms-5 max-w-28"
                          onClick={() => handleGroupApply()}
                        >
                          Apply to All
                        </Button>
                      </div>

                      <div className="mt-4 overflow-hidden rounded-lg border border-neutral-300">
                        <VariantPriceTable
                          colors={watchColor}
                          sizes={watchSize}
                          control={control}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  ref={(el) => {
                    sectionsRef.current.productInfo = el;
                  }}
                  className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4 scroll-mt-20"
                >
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

                <div
                  ref={(el) => {
                    sectionsRef.current.sizeChart = el;
                  }}
                  className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4 scroll-mt-20"
                >
                  <h2 className="text-lg font-bold">Size Chart</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Controller
                      name="sizeChartId"
                      control={control}
                      render={({ field }) => (
                        <ComboBox
                          label="Size Chart Category"
                          options={[
                            { label: 'Mens Formal Shirt', value: 1 },
                            { label: 'Mens Casual Shirt', value: 2 },
                            { label: 'Mens T-shirt', value: 3 },
                            { label: 'Mens Panjabi Regular', value: 4 },
                          ]}
                          optionKeys={{ label: 'label', value: 'value' }}
                          placeholder="Select a Size Chart"
                          error={errors.sizeChartId?.message}
                          required
                          {...field}
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

                <div
                  ref={(el) => {
                    sectionsRef.current.warranty = el;
                  }}
                  className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4 scroll-mt-20"
                >
                  <h2 className="text-lg font-bold">Warranty & Package</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Controller
                      name="warrantyTypeId"
                      control={control}
                      render={({ field }) => (
                        <ComboBox
                          label="Warranty Type"
                          options={[
                            { label: 'No Warranty', value: 1 },
                            { label: 'Brand Warranty', value: 2 },
                            { label: 'Local Seller Warranty', value: 3 },
                            { label: 'International Warranty', value: 4 },
                          ]}
                          optionKeys={{ label: 'label', value: 'value' }}
                          placeholder="Select Warranty Type"
                          error={errors.sizeChartId?.message}
                          required
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="warrantyPeriodId"
                      control={control}
                      render={({ field }) => (
                        <ComboBox
                          label="Warranty Period"
                          options={[
                            { label: '1 Month', value: 1 },
                            { label: '2 Months', value: 2 },
                            { label: '3 Months', value: 3 },
                            { label: '4 Months', value: 4 },
                            { label: '5 Months', value: 5 },
                          ]}
                          optionKeys={{ label: 'label', value: 'value' }}
                          placeholder="Select Warranty Period"
                          error={errors.sizeChartId?.message}
                          required
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <TextArea
                    label="Warranty Policy"
                    placeholder="Enter Warranty Policy"
                    {...register('warrantyPolicy')}
                  />
                  <div className="grid grid-cols-4 gap-3">
                    <Input
                      label="Package Weight (kg)"
                      placeholder="Enter Package Weight (kg)"
                      error={errors.packageWeight?.message}
                      {...register('packageWeight')}
                      required
                    />
                    <Input
                      label="Package Length (cm)"
                      placeholder="Enter Package Length (cm)"
                      error={errors.packageLength?.message}
                      {...register('packageLength')}
                      required
                    />
                    <Input
                      label="Package Width (cm)"
                      placeholder="Enter Package Width (cm)"
                      error={errors.packageWidth?.message}
                      {...register('packageWidth')}
                      required
                    />
                    <Input
                      label="Package Height (cm)"
                      placeholder="Enter Package Height (cm)"
                      error={errors.packageHeight?.message}
                      {...register('packageHeight')}
                      required
                    />
                  </div>
                </div>

                <div
                  ref={(el) => {
                    sectionsRef.current.url = el;
                  }}
                  className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4 scroll-mt-20"
                >
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

                <div
                  ref={(el) => {
                    sectionsRef.current.meta = el;
                  }}
                  className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4 scroll-mt-20"
                >
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
                      <Checkbox label="Yes" onChange={(e) => handleSameAsMeta(e)} />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <Controller
                        name="ogType"
                        control={control}
                        render={({ field }) => (
                          <ComboBox
                            label="OG Type"
                            options={[
                              { label: 'Product', value: 'product' },
                              { label: 'Blog', value: 'blog' },
                              { label: 'Content', value: 'content' },
                              { label: 'Career', value: 'career' },
                            ]}
                            optionKeys={{ label: 'label', value: 'value' }}
                            placeholder="Select og type"
                            {...field}
                          />
                        )}
                      />
                      <Input
                        label="OG Title"
                        placeholder="Enter OG Title"
                        {...register('ogTitle')}
                      />
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
              </>
            ) : null}

            {watchedCategory && (
              <div className="flex justify-end gap-4">
                <Button variant="draft">Save As Draft</Button>

                <Button type="submit" variant="submit" disabled={isSubmitting}>
                  Submit Now
                </Button>
              </div>
            )}
          </form>
        </div>

        <div className="sticky top-20">
          <div className="bg-surface rounded-xl border border-border px-5 py-4">
            {watchedCategory && (
              <div>
                <h2 className="text-lg font-bold text-primary-500">Product Roadmap</h2>
                <ul className="text-sm mt-1 text-neutral-300">
                  {productCreateSteps.map((s, index) => {
                    return (
                      <li
                        key={s.id}
                        className={`relative py-2 ${index > 0 && 'after:absolute after:bg-neutral-100 after:-top-1/2 after:left-[7.5px] after:h-full after:w-[1px] after:content-[""]'}`}
                      >
                        <button
                          onClick={() => scrollToSection(index)}
                          className="flex items-center gap-1.5 cursor-pointer"
                        >
                          <div
                            className={`bg-white z-10 p-1 rounded-full border ${step === index ? ' border-primary-500' : 'border-transparent'}`}
                          >
                            <div
                              className={`size-2 rounded-full ${step === index ? 'bg-primary-500' : 'bg-neutral-100 dark:bg-neutral-200'}`}
                            />
                          </div>
                          {s.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {!watchedCategory && (
              <div>
                <h2 className="text-lg font-bold text-primary-500">Recommendations</h2>
                <p className="text-sm mt-3">
                  Start by entering a product name and selecting a category. The full form sections
                  will unlock once a category is chosen.
                </p>
              </div>
            )}

            {watchedCategory && step >= 0 && productCreateSteps[step] && (
              <div className="mt-4 border-t border-border pt-4">
                <h2 className="text-lg font-bold text-primary-500">
                  {productCreateSteps[step].name}
                </h2>
                <p className="text-sm mt-2 text-neutral-300">
                  {productCreateSteps[step].description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isSellingPriceModal && (
        <SellingPriceModal
          isOpen={isSellingPriceModal}
          onClose={() => setSellingPriceModal(false)}
          onSubmit={onPriceSubmit}
          initialValues={{
            sellingPrice: getValues('sellingPrice'),
            sellingDate: getValues('sellingDate') ?? '',
          }}
        />
      )}
    </div>
  );
};

export default CreateProductPage;
