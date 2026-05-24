import Button from '@/components/atoms/Button';
import ComboBox from '@/components/atoms/ComboBox';
import FileInput from '@/components/atoms/FileInput';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import MetaOgForm from '@/components/molecules/forms/MetaOgForm';
import { submitLabel } from '@/constants/buttonLabel';
import { IMAGE_MIME_TYPES } from '@/constants/fileType';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { categorySchema, type CategoryFormData } from '../schema';
import Checkbox from '@/components/atoms/Checkbox';

interface CategoryFormProps {
  mode: 'create' | 'edit';
  initialValues?: CategoryFormData;
  onSubmit: (data: CategoryFormData) => Promise<void>;
}

const CategoryForm = ({ mode, initialValues, onSubmit }: CategoryFormProps) => {
  const navigate = useNavigate();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues ?? { status: 'Y' },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
          <h2 className="text-lg font-bold">Basic Info</h2>
          <div className="grid grid-cols-4 gap-4">
            <Controller
              name="parentCategoryId"
              control={control}
              render={({ field }) => (
                <ComboBox
                  label="Parent Category"
                  options={[
                    { categoryId: 1, categoryName: 'Clothing & Fashion' },
                    { categoryId: 100, categoryName: 'Fashion Accessories' },
                    { categoryId: 124, categoryName: 'Home Decor' },
                    { categoryId: 130, categoryName: 'Gift Cards' },
                    { categoryId: 147, categoryName: 'Footwear' },
                  ]}
                  optionKeys={{ label: 'categoryName', value: 'categoryId' }}
                  error={errors.parentCategoryId?.message}
                  placeholder="Select Parent Category"
                  {...field}
                />
              )}
            />

            <Input
              label="Category Name"
              placeholder="Enter Category Name"
              error={errors.categoryName?.message}
              {...register('categoryName')}
              required
            />

            <Input
              label="Category Slug"
              placeholder="Enter Category Slug"
              error={errors.slug?.message}
              {...register('slug')}
              required
            />

            <Input
              label="Display Order"
              placeholder="Enter Display Order"
              error={errors.displayOrder?.message}
              {...register('displayOrder')}
            />

            <div className="col-span-4 grid grid-cols-2 gap-4">
              <TextArea
                label="Description"
                placeholder="Enter Category Description"
                error={errors.description?.message}
                {...register('description')}
                required
              />

              <Controller
                name="imagePath"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FileInput
                    label="Category Image"
                    error={errors.imagePath?.message}
                    errorSameRow={errors.description?.message}
                    accept={IMAGE_MIME_TYPES.join(', ')}
                    value={value}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    onDrop={(file) => onChange(file)}
                    onRemove={() => onChange(undefined)}
                    // className="h-36"
                    required
                  />
                )}
              />
            </div>

            <div className="col-span-4 grid grid-cols-4 gap-3">
              <div>
                <p className="input-label mb-1">Include in Top Menu?</p>
                <Controller
                  name="includeInTopMenu"
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
                <p className="input-label mb-1">Is Active?</p>
                <Controller
                  name="status"
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

        {/* <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
          <h2 className="text-lg font-bold">Attachments</h2>
          <div className="grid grid-cols-3 gap-4">hhh</div>
        </div> */}

        <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
          <h2 className="text-lg font-bold">Meta & OG Info</h2>
          <MetaOgForm
            fieldNames={{
              metaTitle: 'metaTag.metaTitle',
              metaDescription: 'metaTag.metaDescription',
              metaKeywords: 'metaTag.metaKeywords',
              ogType: 'ogTag.ogType',
              ogTitle: 'ogTag.ogTitle',
              ogUrl: 'ogTag.ogUrl',
              ogDescription: 'ogTag.ogDescription',
              ogImage: 'ogTag.ogImgUrl',
            }}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="cancel" onClick={() => navigate('/settings/categories')}>
            Cancel
          </Button>

          <Button type="submit" variant="save">
            {submitLabel(mode, isSubmitting)}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CategoryForm;
