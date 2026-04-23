import { IMAGE_MIME_TYPES } from '@/constants/fileType';
import * as z from 'zod';

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

export const categorySchema = z.object({
  parentCategoryId: z.number().optional(),
  categoryName: z.string().min(3, 'Invalid name'),
  // categorySlug: z.string().min(3, 'Invalid URL'),
  // categoryUrl: z.string().min(3, 'Invalid URL'),
  slug: z.string().min(3, 'Invalid URL'),
  description: z.string().min(5, 'Invalid description'),
  displayOrder: z.coerce
    .number<number>('Invalid display order')
    .nonnegative('Display order must be positive')
    .optional(),
  imagePath: z
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

  includeInTopMenu: z.enum(['Y', 'N'], { message: 'This field is required' }),
  status: z.enum(['Y', 'N'], { message: 'Status is required' }),
  // isActive: z.enum(['Y', 'N'], { message: 'Status is required' }),
  // isDeleted: z.enum(['Y', 'N'], { message: 'Status is required' }),
  // isNewArrival: z.enum(['Y', 'N'], { message: 'This field is required' }),
  // isPopular: z.enum(['Y', 'N'], { message: 'This field is required' }),
  // isProduct: z.enum(['Y', 'N'], { message: 'This field is required' }),
  // isReturnable: z.enum(['Y', 'N'], { message: 'This field is required' }),
  // isTopCategory: z.enum(['Y', 'N'], { message: 'This field is required' }),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
