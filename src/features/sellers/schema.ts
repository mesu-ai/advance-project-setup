import { ALLOWED_UPLOAD_FILE_MIME_TYPES, IMAGE_MIME_TYPES } from '@/constants/fileType';
import { PHONE_REGEX } from '@/constants/regex';
import * as z from 'zod';

const additionalDocSchema = z.object({
  docName: z.string().min(3, 'Document name is required'),
  docFile: z
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

const sellerMetaSchema = z.object({
  metaTitle: z.string().optional(),
  metaKeywords: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const sellerSchema = z.object({
  sellerName: z.string().min(3, 'Invalid name'),
  sellerContactNo: z.string().regex(PHONE_REGEX, 'Invalid mobile no.'),
  sellerEmail: z.email(),
  assignVendor: z.number().optional(),
  bussinessTypeId: z.array(z.number()).optional(),
  ownerName: z.string().min(3, 'Invalid owner name'),
  binNo: z.string().min(3, 'Invalid BIN no.'),
  countryId: z.number().optional(),
  shopName: z.string().min(3, 'Invalid shop name'),
  shopCity: z.number('City is required'),
  shopState: z.number('State is required'),
  shopZipCode: z.string().min(4, 'Invalid zip code'),
  shopAddress: z.string().min(5, 'Invalid address'),
  shopDescription: z.string().min(5, 'Invalid description'),

  sellerPresentAddress: z.string().optional(),
  sellerPermanentAddress: z.string().optional(),

  shopLogoUrl: z
    .union([z.string().min(1), z.instanceof(File)])
    .optional()
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
    .optional()
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

  bussinessDocUrl: z
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

  tradeLicenseDoc: z
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
  binNoDoc: z
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
        return ALLOWED_UPLOAD_FILE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Invalid file type'),

  tinNoDoc: z
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
        return ALLOWED_UPLOAD_FILE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Invalid file type'),

  dbIdDoc: z
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
        return ALLOWED_UPLOAD_FILE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Invalid file type'),

  additionalDocuments: z.array(additionalDocSchema).optional(),
  status: z.enum(['Y', 'N'], { message: 'Status is required' }),
});

export type SellerFormData = z.infer<typeof sellerSchema>;
