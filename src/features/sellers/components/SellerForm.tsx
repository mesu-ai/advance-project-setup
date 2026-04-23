import DeleteIcon from '@/assets/svg/DeleteIcon';
import Button from '@/components/atoms/Button';
import ComboBox from '@/components/atoms/ComboBox';
import FileInput from '@/components/atoms/FileInput';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import MetaOgForm from '@/components/molecules/forms/MetaOgForm';
import { submitLabel } from '@/constants/buttonLabel';
import { ALLOWED_UPLOAD_FILE_MIME_TYPES, IMAGE_MIME_TYPES } from '@/constants/fileType';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { sellerSchema, type SellerFormData } from '../../sellers/schema';

const countryData = [
  { id: 1, name: 'Bangladesh' },
  { id: 2, name: 'India' },
  { id: 3, name: 'Pakistan' },
];

const bussinessTypes: { bussinessTypeId: number; bussinessTypeName: string }[] = [
  { bussinessTypeId: 5, bussinessTypeName: 'Books' },
  { bussinessTypeId: 6, bussinessTypeName: 'Electronics' },
  { bussinessTypeId: 7, bussinessTypeName: 'Clothing & Fashion' },
  { bussinessTypeId: 8, bussinessTypeName: 'Grocery' },
];

interface SellerFormProps {
  mode: 'create' | 'edit';
  initialValues?: SellerFormData;
  onSubmit: (data: SellerFormData) => Promise<void>;
}

const SellerForm = ({ mode, initialValues, onSubmit }: SellerFormProps) => {
  const navigate = useNavigate();

  const form = useForm<SellerFormData>({
    resolver: zodResolver(sellerSchema),
    defaultValues: initialValues ?? { countryId: 1, additionalDocuments: [], status: 'Y' },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const {
    fields: additionalDocFields,
    append: appendAdditionalDoc,
    remove: removeAdditionalDoc,
  } = useFieldArray({
    control,
    name: 'additionalDocuments',
  });

  const handleAdditionalDoc = () => {
    appendAdditionalDoc({ docName: '', docFile: undefined });
  };

  // if (isLoading) return <div>Loading...</div>;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
          <h2 className="text-lg font-bold">Basic Info</h2>
          <div className="grid grid-cols-4 gap-4">
            <Input
              label="Seller Name"
              placeholder="Enter Seller Name"
              error={errors.sellerName?.message}
              {...register('sellerName')}
              required
            />

            <Input
              label="Contact No."
              placeholder="Enter Contact No."
              error={errors.sellerContactNo?.message}
              {...register('sellerContactNo')}
              required
            />

            <Input
              label="Email Address"
              placeholder="Enter Email"
              error={errors.sellerEmail?.message}
              {...register('sellerEmail')}
              required
            />

            <Controller
              name="assignVendor"
              control={control}
              render={({ field }) => (
                <ComboBox
                  label="Assigned Vendor"
                  options={[
                    { adminId: 144, adminName: 'Musa Ibrahim' },
                    { adminId: 160, adminName: 'Muhammed Siam' },
                    { adminId: 166, adminName: 'Muhammad Imran Khan' },
                    { adminId: 182, adminName: 'Simanto Tabrej' },
                    { adminId: 184, adminName: 'Md. Mizanur Rahman' },
                  ]}
                  optionKeys={{ label: 'adminName', value: 'adminId' }}
                  error={errors.assignVendor?.message}
                  placeholder="Select Vendor Name"
                  {...field}
                />
              )}
            />

            <Controller
              name="bussinessTypeId"
              control={control}
              render={({ field: { value, onChange } }) => (
                <ComboBox
                  isMulti
                  label="Bussiness Type(s)"
                  options={bussinessTypes}
                  optionKeys={{ label: 'bussinessTypeName', value: 'bussinessTypeId' }}
                  error={errors.bussinessTypeId?.message}
                  // isLoading={false}
                  placeholder="Select/Search Bussiness Type(s)"
                  value={value ?? []}
                  onChange={(ids: number[]) => onChange(ids)}
                  required
                />
              )}
            />

            <Input
              label="Shop Name"
              placeholder="Enter Shop Name"
              error={errors.shopName?.message}
              {...register('shopName')}
              required
            />

            <Input
              label="Owner Name"
              placeholder="Enter Owner Name"
              error={errors.ownerName?.message}
              {...register('ownerName')}
              required
            />

            <Input
              label="BIN No."
              placeholder="Enter BIN No."
              error={errors.binNo?.message}
              {...register('binNo')}
              required
            />

            <Controller
              name="countryId"
              control={control}
              render={({ field }) => (
                <ComboBox
                  label="Country"
                  options={countryData}
                  optionKeys={{ label: 'name', value: 'id' }}
                  error={errors.countryId?.message}
                  placeholder="Select Country"
                  required
                  {...field}
                />
              )}
            />

            <Controller
              name="shopCity"
              control={control}
              render={({ field }) => (
                <ComboBox
                  label="District/City"
                  options={[
                    { id: 1, name: 'Dhaka' },
                    { id: 2, name: 'Mumbai' },
                    { id: 3, name: 'Islamabad' },
                  ]}
                  optionKeys={{ label: 'name', value: 'id' }}
                  error={errors.shopCity?.message}
                  placeholder="Select District/City"
                  required
                  {...field}
                />
              )}
            />

            <Controller
              name="shopState"
              control={control}
              render={({ field }) => (
                <ComboBox
                  label="Area/Thana/Upazila/State"
                  options={[
                    { id: 1, name: 'Dhaka' },
                    { id: 2, name: 'Mumbai' },
                    { id: 3, name: 'Islamabad' },
                  ]}
                  optionKeys={{ label: 'name', value: 'id' }}
                  error={errors.shopState?.message}
                  placeholder="Select Area/Thana/Upazila/State"
                  required
                  {...field}
                />
              )}
            />

            <Input
              type="number"
              label="Zip Code"
              placeholder="Enter Zip Code"
              error={errors.shopZipCode?.message}
              {...register('shopZipCode')}
              required
            />

            <div className="col-span-4 grid grid-cols-2 gap-4">
              <Controller
                name="sellerImageUrl"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FileInput
                    label="Seller Image"
                    error={errors.sellerImageUrl?.message}
                    errorSameRow={errors.shopLogoUrl?.message}
                    accept={IMAGE_MIME_TYPES.join(', ')}
                    value={value}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    onDrop={(file) => onChange(file)}
                    onRemove={() => onChange(undefined)}
                    className="h-36"
                    required
                  />
                )}
              />
              <Controller
                name="shopLogoUrl"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FileInput
                    label="Shop Logo"
                    errorSameRow={errors.sellerImageUrl?.message}
                    error={errors.shopLogoUrl?.message}
                    accept={IMAGE_MIME_TYPES.join(', ')}
                    value={value}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    onDrop={(file) => onChange(file)}
                    onRemove={() => onChange(undefined)}
                    className="h-36"
                    required
                  />
                )}
              />
            </div>
            <div className="col-span-4 grid grid-cols-4 gap-4">
              <TextArea
                label="Shop Description"
                placeholder="Enter Shop Description"
                error={errors.shopDescription?.message}
                {...register('shopDescription')}
                required
              />

              <TextArea
                label="Shop Address"
                placeholder="Enter Shop Address"
                error={errors.shopAddress?.message}
                {...register('shopAddress')}
                required
              />

              <TextArea
                label="Seller Permanent Address"
                placeholder="Enter permanent Address"
                {...register('sellerPermanentAddress')}
              />

              <TextArea
                label="Seller Present Address"
                placeholder="Enter present Address"
                {...register('sellerPresentAddress')}
              />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border px-5 py-4 space-y-4">
          <h2 className="text-lg font-bold">Attachments</h2>
          <div className="grid grid-cols-3 gap-4">
            <Controller
              name="ownerNidUrl"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FileInput
                  label="Owner NID"
                  error={errors.ownerNidUrl?.message}
                  accept={ALLOWED_UPLOAD_FILE_MIME_TYPES.join(', ')}
                  value={value}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                  onDrop={(e) => onChange(e)}
                  isPreview={false}
                  required
                />
              )}
            />

            <Controller
              name="bussinessDocUrl"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FileInput
                  label="Business Document"
                  error={errors.bussinessDocUrl?.message}
                  accept={ALLOWED_UPLOAD_FILE_MIME_TYPES.join(', ')}
                  value={value}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                  onDrop={(e) => onChange(e)}
                  isPreview={false}
                  required
                />
              )}
            />
            <Controller
              name="tradeLicenseDoc"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FileInput
                  label="Trade License"
                  error={errors.tradeLicenseDoc?.message}
                  accept={ALLOWED_UPLOAD_FILE_MIME_TYPES.join(', ')}
                  value={value}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                  onDrop={(e) => onChange(e)}
                  isPreview={false}
                  required
                />
              )}
            />
            <Controller
              name="binNoDoc"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FileInput
                  label="BIN Number Document"
                  error={errors.binNoDoc?.message}
                  accept={ALLOWED_UPLOAD_FILE_MIME_TYPES.join(', ')}
                  value={value}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                  onDrop={(e) => onChange(e)}
                  isPreview={false}
                />
              )}
            />
            <Controller
              name="tinNoDoc"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FileInput
                  label="TIN Number Document"
                  error={errors.tinNoDoc?.message}
                  accept={ALLOWED_UPLOAD_FILE_MIME_TYPES.join(', ')}
                  value={value}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                  onDrop={(e) => onChange(e)}
                  isPreview={false}
                />
              )}
            />
            <Controller
              name="dbIdDoc"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FileInput
                  label="DB ID Document"
                  error={errors.dbIdDoc?.message}
                  accept={ALLOWED_UPLOAD_FILE_MIME_TYPES.join(', ')}
                  value={value}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                  onDrop={(e) => onChange(e)}
                  isPreview={false}
                />
              )}
            />

            <div className="col-span-3">
              <p className="input-label">Additional Documents</p>
              <div className="mt-1 space-y-4">
                {additionalDocFields.map((_, index) => (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Document Name"
                        error={errors.additionalDocuments?.[index]?.docName?.message}
                        {...register(`additionalDocuments.${index}.docName` as const)}
                      />

                      {/* Document file upload */}
                      <Controller
                        name={`additionalDocuments.${index}.docFile`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <FileInput
                            error={errors.additionalDocuments?.[index]?.docFile?.message}
                            accept={ALLOWED_UPLOAD_FILE_MIME_TYPES.join(', ')}
                            value={value}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) onChange(file);
                            }}
                            onDrop={(e) => onChange(e)}
                            isPreview={false}
                          />
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm w-5">
                      <button
                        type="button"
                        onClick={() => removeAdditionalDoc(index)}
                        className="cursor-pointer text-danger-500 hover:text-danger-300"
                      >
                        <DeleteIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="create"
                  onClick={() => handleAdditionalDoc()}
                  className="w-[180px] h-[35.72px]"
                >
                  Add Document
                </Button>
              </div>
            </div>
          </div>
        </div>

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
          <Button variant="cancel" onClick={() => navigate('/access-control/employees')}>
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

export default SellerForm;
