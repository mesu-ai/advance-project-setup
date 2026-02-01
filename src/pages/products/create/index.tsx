import ArrowIcon from '@/assets/svg/ArrowIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Select1 from '@/components/atoms/Select1';
import CategorySelector from '@/features/products/components/CategorySelector';
import type { SelectedCategoryT } from '@/types/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Editor from 'textcrafter';
import * as z from 'zod';

const shops = [
  { id: 1, name: 'SaRa Lifestyle Ltd' },
  { id: 2, name: 'SaRa Lifestyle Ltd' },
  { id: 3, name: 'SaRa Lifestyle Ltd' },
  { id: 4, name: 'SaRa Lifestyle Ltd' },
  { id: 5, name: 'SaRa Lifestyle Ltd' },
  { id: 6, name: 'SaRa Lifestyle Ltd' },
  { id: 6, name: 'SaRa Lifestyle Ltd' },
  { id: 6, name: 'SaRa Lifestyle Ltd' },
  { id: 6, name: 'SaRa Lifestyle Ltd' },
];

const productSchema = z.object({
  name: z.string().min(3, 'Product name is required'),
  categoryId: z.number().min(1, 'Category is required'),
  // unit: z.string
  unit: z.string().min(1, 'Product unit is required'),
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

  // const { data: categoies, isLoading } = useGetCategoriesQuery('Categories');

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({ resolver: zodResolver(productSchema) });

  const watchedCategory = useWatch({ control, name: 'categoryId' });

  const onSubmit = (data: ProductFormData) => {
    console.log({ data });
  };

  return (
    <div>
      <h1 className="heading-1">Add New Product</h1>
      <div className="mt-3 flex gap-5">
        <div className="flex-1 bg-surface rounded-xl border border-border px-5 py-4">
          <h2 className="text-lg font-bold">Basic Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Product Name"
              placeholder="EX. Men's Stylish Casual Shirt"
              error={errors.name?.message}
              {...register('name')}
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
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Product Quantity Unit"
                placeholder="Select Product Quantity Unit"
                options={[
                  { label: 'PSC', value: 'psc' },
                  { label: 'KG', value: 'kg' },
                ]}
                error={errors.unit?.message}
                {...register('unit')}
              />
              <div className="">
                <Select1
                  onSelect={(s) => console.log(s)}
                  onChange={(e) => console.log(e)}
                  options={shops ?? []}
                  optionKeys={{ label: 'name', value: 'id' }}
                  error="dldlld"
                />
              </div>
            </div>

            <div>
              <label className="">
                Description <span className="text-danger-500">*</span>
              </label>
              <Editor
                value={editorContent}
                onChange={setEditorContent}
                toolbarClassName="custom-toolbar"
                editorClassName="custom-editor"
              />
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
