import Button from '@/components/atoms/Button';
import FileInput from '@/components/atoms/FileInput';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import { submitLabel } from '@/constants/buttonLabel';
import { IMAGE_MIME_TYPES } from '@/constants/fileType';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { brandSchema, type BrandFormData } from '../schema';
import Checkbox from '@/components/atoms/Checkbox';
import { useEffect } from 'react';
import { generateSlug } from '@/utils/generateSlug';

interface BrandFormProps {
  mode: 'create' | 'edit';
  initialValues?: BrandFormData;
  onSubmit: (data: BrandFormData) => Promise<void>;
}

const BrandForm = ({ mode, initialValues, onSubmit }: BrandFormProps) => {
  const navigate = useNavigate();

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: initialValues ?? { isActive: 'Y' },
  });

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const watchedProductName = form.watch('brandName');

  useEffect(() => {
    if (!watchedProductName) return;

    setValue('brandUrl', generateSlug(watchedProductName));
  }, [watchedProductName, setValue]);

  // if (isLoading) return <div>Loading...</div>;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
          {/* <h2 className="text-lg font-bold">Basic Info</h2> */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <Input
                label="Brand Name"
                placeholder="Enter Brand Name"
                error={errors.brandName?.message}
                {...register('brandName')}
                required
              />
            </div>

            <Input
              label="Brand URL"
              placeholder="Enter Brand URL"
              error={errors.brandUrl?.message}
              {...register('brandUrl')}
              required
            />

            <Input
              label="Display Order"
              placeholder="1000000"
              error={errors.displayOrder?.message}
              {...register('displayOrder')}
            />

            <div className="col-span-4 grid grid-cols-2 gap-4">
              <TextArea
                label="Brand Description"
                placeholder="Enter Brand Description"
                error={errors.brandDetails?.message}
                {...register('brandDetails')}
              />

              <Controller
                name="brandLogoUrl"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FileInput
                    label="Brand Logo"
                    error={errors.brandLogoUrl?.message}
                    errorSameRow={errors.brandDetails?.message}
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
            <div>
              <p className="input-label mb-1">Is Active?</p>
              <Controller
                name="isActive"
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

        {/* <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
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
        </div> */}

        <div className="flex justify-end gap-4">
          <Button variant="cancel" onClick={() => navigate('/settings/brands')}>
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

export default BrandForm;
