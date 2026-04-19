import Button from '@/components/atoms/Button';
import ComboBox from '@/components/atoms/ComboBox';
import FileInput from '@/components/atoms/FileInput';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import MetaOgForm from '@/components/molecules/forms/MetaOgForm';
import { submitLabel } from '@/constants/buttonLabel';
import { ALLOWED_UPLOAD_FILE_MIME_TYPES, IMAGE_MIME_TYPES } from '@/constants/fileType';
import { PHONE_REGEX } from '@/constants/regex';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as z from 'zod';

// const depertments = [
//   { id: 1, label: 'Account', value: 'account' },
//   { id: 2, label: 'HR Depertment', value: 'hr' },
//   { id: 3, label: 'Desiner', value: 'designer' },
//   { id: 3, label: 'E-commerce', value: 'e-commerce' },
// ];

// {
//     "sellerId": 2,
//     "shopId": 2,
//     "sellerName": "SaRa Lifestyle Ltd.",
//     "sellerContactNo": "01885998899",
//     "sellerEmail": "support@saralifestyle.com",
//     "assignVendor": 0,
//     "bussinessTypeId": [
//         7
//     ],
//     "shopName": "SaRa Lifestyle Ltd.",
//     "ownerName": "SaRa Lifestyle Ltd.",
//     "binNo": "12345",
//     "sellerTypeId": 1,
//     "countryId": 19,
//     "sellerCurrency": "BDT",
//     "shopCity": "Dhaka",
//     "shopState": "Dhaka",
//     "shopZipCode": "1216",
//     "shopDescription": "SaRa Lifestyle Ltd.",
//     "shopAddress": "Bangladesh",
//     "sellerPresentAddress": "House No #966, Road #14, Avenue #02, Mirpur DOHS, Dhaka-1216, Bangladesh",
//     "sellerPermanentAddress": "House No #966, Road #14, Avenue #02, Mirpur DOHS, Dhaka-1216, Bangladesh",
//     "shopLogoUrl": "/Images/Sellers/BusinessDoc/248571d739d344eebc581cc414873e1c.jpeg",
//     "sellerImageUrl": "/Images/Sellers/SellerProfile/a33c2311c7fb4d488d8720a8d8c80d05.jpeg",
// "ownerNidUrl": "/Images/Sellers/BusinessDoc/default.png",
// "bussinessDocUrl": "/Images/Sellers/BusinessDoc/default.png",
// "tradeLicenseDoc": "/Images/Sellers/BusinessDoc/b0d78e36d62c461b9d2de6e76cf5d9cb.png",
// "binNoDoc": "",
// "tinNoDoc": "",
// "dbIdDoc": "",
// "additionalDocuments": [],
//     "isSellerDelivered": "N",
//     "nidBackDoc": "",
// "metaTag": {
//     "metaTitle": "Shop online with SaRa Lifestyle Ltd. now! Visit SaRa Lifestyle Ltd. on SaRa Lifestyle.",
//     "metaKeywords": "online shops, clothing brand, SaRa Lifestyle, trendy fashion, men's apparel, women's apparel, kid's clothing, fashion deals, online fashion store, Bangladesh fashion",
//     "metaDescription": "SaRa Lifestyle Ltd. | SaRa Lifestyle",
//     "metaLongDescription": "Explore Trendy Fashion Finds at Online Shopping BD Marketplace – Your Ultimate Fashion & Lifestyle destination in Bangladesh! Shop Now!",
//     "metaAuthor": ""
// },
// "ogTag": {
//     "ogType": "Seller",
//     "ogTitle": "SaRa Lifestyle Ltd. | SaRa Lifestyle",
//     "ogUrl": "sara-lifestyle-ltd",
//     "ogDescription": "Shop online with SaRa Lifestyle Ltd. now! Visit SaRa Lifestyle Ltd. on SaRa Lifestyle.",
//     "ogImgUrl": "/Images/Sellers/BusinessDoc/248571d739d344eebc581cc414873e1c.jpeg"
// }
// }

const bussinessTypes: { bussinessTypeId: number; bussinessTypeName: string }[] = [
  { bussinessTypeId: 5, bussinessTypeName: 'Books' },
  { bussinessTypeId: 6, bussinessTypeName: 'Electronics' },
  { bussinessTypeId: 7, bussinessTypeName: 'Clothing & Fashion' },
  { bussinessTypeId: 8, bussinessTypeName: 'Grocery' },
];

const sellerMetaSchema = z.object({
  metaTitle: z.string().optional(),
  metaKeywords: z.string().optional(),
  metaDescription: z.string().optional(),
  metaLongDescription: z.string().optional(),
  metaAuthor: z.string().optional(),
});

const sellerOgSchema = z.object({
  ogType: z.string().optional(),
  ogTitle: z.string().optional(),
  ogUrl: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImgUrl: z
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

const sellerSchema = z.object({
  sellerName: z.string().min(3, 'Invalid name'),
  //   employeeId: z.string().min(5, 'Invalid employee ID'),
  sellerContactNo: z.string().regex(PHONE_REGEX, 'Invalid mobile no.'),
  sellerEmail: z.email(),
  assignVendor: z.number().optional(),
  bussinessTypeId: z.array(z.number()).optional(),
  shopName: z.string().min(3, 'Invalid shop name'),
  ownerName: z.string().min(3, 'Invalid owner name'),
  binNo: z.string().min(3, 'Invalid BIN no.'),
  //   sellerTypeId: z.number().optional(),

  countryId: z.number().optional(),
  shopCity: z.number('City is required'),
  shopState: z.number('State is required'),
  shopZipCode: z.string().min(4, 'Invalid zip code'),
  shopAddress: z.string().optional(),

  shopDescription: z.string().optional(),

  sellerPresentAddress: z.string().optional(),
  sellerPermanentAddress: z.string().optional(),

  shopLogoUrl: z
    .union([z.string().min(1), z.instanceof(File)])
    // .optional()
    .refine((val) => val !== undefined && val !== null && val !== '', {
      message: 'Upload a photo',
    })
    .refine((val) => {
      if (val instanceof File) {
        return val.size <= 5_000_000;
      }
      return true;
    }, 'Max file size is 5MB')
    .refine((val) => {
      if (val instanceof File) {
        return IMAGE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Only .jpg, .jpeg, .png formats are supported'),

  sellerImageUrl: z
    .union([z.string().min(1), z.instanceof(File)])
    // .optional()
    .refine((val) => val !== undefined && val !== null && val !== '', {
      message: 'Upload a photo',
    })
    .refine((val) => {
      if (val instanceof File) {
        return val.size <= 5_000_000;
      }
      return true;
    }, 'Max file size is 5MB')
    .refine((val) => {
      if (val instanceof File) {
        return IMAGE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Only .jpg, .jpeg, .png formats are supported'),

  metaTag: sellerMetaSchema,
  ogTag: sellerOgSchema,

  ownerNidUrl: z
    .union([z.string().min(1), z.instanceof(File)])
    .refine((val) => val !== undefined && val !== null && val !== '', {
      message: 'Upload a file',
    })
    .refine((val) => {
      if (val instanceof File) {
        return val.size <= 5_000_000;
      }
      return true;
    }, 'Max file size is 5MB')
    .refine((val) => {
      if (val instanceof File) {
        return ALLOWED_UPLOAD_FILE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Invalid file type'),

  bussinessDocUrl: z
    .union([z.string().min(1), z.instanceof(File)])
    .refine((val) => val !== undefined && val !== null && val !== '', {
      message: 'Upload a file',
    })
    .refine((val) => {
      if (val instanceof File) {
        return val.size <= 5_000_000;
      }
      return true;
    }, 'Max file size is 5MB')
    .refine((val) => {
      if (val instanceof File) {
        return ALLOWED_UPLOAD_FILE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Invalid file type'),
  tradeLicenseDoc: z
    .union([z.string().min(1), z.instanceof(File)])
    .refine((val) => val !== undefined && val !== null && val !== '', {
      message: 'Upload a file',
    })
    .refine((val) => {
      if (val instanceof File) {
        return val.size <= 5_000_000;
      }
      return true;
    }, 'Max file size is 5MB')
    .refine((val) => {
      if (val instanceof File) {
        return ALLOWED_UPLOAD_FILE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Invalid file type'),
  binNoDoc: z
    .union([z.string().min(1), z.instanceof(File)])
    .optional()
    .refine((val) => val !== undefined && val !== null && val !== '', {
      message: 'Upload a file',
    })
    .refine((val) => {
      if (val instanceof File) {
        return val.size <= 5_000_000;
      }
      return true;
    }, 'Max file size is 5MB')
    .refine((val) => {
      if (val instanceof File) {
        return ALLOWED_UPLOAD_FILE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Invalid file type'),
  tinNoDoc: z
    .union([z.string().min(1), z.instanceof(File)])
    .optional()
    .refine((val) => val !== undefined && val !== null && val !== '', {
      message: 'Upload a file',
    })
    .refine((val) => {
      if (val instanceof File) {
        return val.size <= 5_000_000;
      }
      return true;
    }, 'Max file size is 5MB')
    .refine((val) => {
      if (val instanceof File) {
        return ALLOWED_UPLOAD_FILE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Invalid file type'),
  dbIdDoc: z
    .union([z.string().min(1), z.instanceof(File)])
    .optional()
    .refine((val) => val !== undefined && val !== null && val !== '', {
      message: 'Upload a file',
    })
    .refine((val) => {
      if (val instanceof File) {
        return val.size <= 5_000_000;
      }
      return true;
    }, 'Max file size is 5MB')
    .refine((val) => {
      if (val instanceof File) {
        return ALLOWED_UPLOAD_FILE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Invalid file type'),

  additionalDocuments: z.array(
    z
      .union([z.string().min(1), z.instanceof(File)])
      .optional()
      .refine((val) => val !== undefined && val !== null && val !== '', {
        message: 'Upload a file',
      })
      .refine((val) => {
        if (val instanceof File) {
          return val.size <= 5_000_000;
        }
        return true;
      }, 'Max file size is 5MB')
      .refine((val) => {
        if (val instanceof File) {
          return ALLOWED_UPLOAD_FILE_MIME_TYPES.includes(val.type);
        }
        return true;
      }, 'Invalid file type')
  ),

  status: z.enum(['Y', 'N'], { message: 'Status is required' }),

  // permissions: z.array(z.string()).nonempty('Select at least one permission'),
});

export type SellerFormData = z.infer<typeof sellerSchema>;

interface SellerFormProps {
  mode: 'create' | 'edit';
  initialValues?: SellerFormData;
  onSubmit: (data: SellerFormData) => Promise<void>;
}

const SellerForm = ({ mode, initialValues, onSubmit }: SellerFormProps) => {
  const navigate = useNavigate();

  const form = useForm<SellerFormData>({
    resolver: zodResolver(sellerSchema),
    defaultValues: initialValues ?? { status: 'Y' },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

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
                  //   isLoading={isShopLoading}
                  placeholder="Select Vendor Name"
                  //   search={{
                  //     enabled: true,
                  //     onSearch: shopSearch.setKeyword,
                  //   }}
                  //   required
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
                  //   search={{
                  //     enabled: true,
                  //     onSearch: shopSearch.setKeyword,
                  //   }}
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
                  options={[
                    { id: 1, name: 'Bangladesh' },
                    { id: 2, name: 'India' },
                    { id: 3, name: 'Pakistan' },
                  ]}
                  optionKeys={{ label: 'name', value: 'id' }}
                  error={errors.countryId?.message}
                  placeholder="Select Country"
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

            <div className="col-span-4 grid grid-cols-3 gap-4">
              <TextArea
                label="Shop Address"
                placeholder="Enter Shop Address"
                required={false}
                {...register('shopAddress')}
              />

              <TextArea
                label="Seller Permanent Address"
                placeholder="Enter permanent Address"
                required={false}
                {...register('sellerPermanentAddress')}
              />

              <TextArea
                label="Seller Present Address"
                placeholder="Enter present Address"
                required={false}
                {...register('sellerPresentAddress')}
              />
            </div>

            <div className="col-span-4 grid grid-cols-2 gap-4">
              <Controller
                name="sellerImageUrl"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FileInput
                    label="Seller Image"
                    error={errors.sellerImageUrl?.message}
                    accept={IMAGE_MIME_TYPES.join(', ')}
                    value={value}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    onDrop={(e) => onChange(e)}
                    className="h-36"
                  />
                )}
              />
              <Controller
                name="shopLogoUrl"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FileInput
                    label="Shop Logo"
                    error={errors.shopLogoUrl?.message}
                    accept={IMAGE_MIME_TYPES.join(', ')}
                    value={value}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    onDrop={(e) => onChange(e)}
                    className="h-36"
                  />
                )}
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
              <div className="mt-1">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    // label="Seller Name"
                    placeholder="Enter Seller Name"
                    error={errors.sellerName?.message}
                    {...register('sellerName')}
                    className="h-14"
                    // required
                  />
                  <Controller
                    name="dbIdDoc"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <FileInput
                        label=""
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
                </div>
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
