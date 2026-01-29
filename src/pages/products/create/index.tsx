import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import CategorySelector from '@/features/products/components/CategorySelector';
import { useGetCategoriesQuery } from '@/store/api/endpoints/categoryEndpoints';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Editor from 'textcrafter';
import * as z from 'zod';

interface CategotyLayerT {
  base: string;
  first?: string;
  second?: string;
  third?: string;
}

interface SelectedCategoryT {
  id: number | null;
  name: string;
  layer: CategotyLayerT;
}

const productSchema = z.object({
  name: z.string().min(3, 'Product name is required'),
  categoryId: z.number().min(1, 'Category is required'),
  description: z.string().min(3, 'Description is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

const CreateProductPage = () => {
  const [editorContent, setEditorContent] = useState('');

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

  const { data: categoies, isLoading } = useGetCategoriesQuery('Categories');

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({ resolver: zodResolver(productSchema) });

  const watchedCategory = useWatch({ control, name: 'categoryId' });
  console.log({ watchedCategory });

  const onSubmit = (data: ProductFormData) => {
    console.log({ data });
  };

  console.log(categoies, isLoading);

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

            {/* <Select
              label="Product Category"
              options={[{ label: 'Shirt', value: 'shirt' }]}
              error={errors.category?.message}
              {...register('category')}
            /> */}
            <div>
              <p className="input-label">
                Product Category <span className="text-danger-500">*</span>
              </p>
              <button
                type="button"
                className="cursor-pointer text-start input-field text-neutral-300"
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
              </button>
              <p className="input-error">{errors.categoryId?.message}</p>

              <CategorySelector
                selected={selectedCategory}
                onSelected={setSelectedCategory}
                onConfirm={(c) => {
                  setValue('categoryId', Number(c.id));
                  trigger('categoryId');
                }}
              />
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
