import { IMAGE_MIME_TYPES } from '@/constants/fileType';
import * as z from 'zod';

export const brandSchema = z.object({
  brandName: z.string().min(3, 'Invalid name'),
  brandUrl: z.string().optional(),
  brandDetails: z.string().optional(),
  displayOrder: z.coerce
    .number<number>('Invalid display order')
    .nonnegative('Display order must be positive')
    .optional(),
  brandLogoUrl: z
    .union([z.string().min(1), z.instanceof(File)])
    .optional()
    .refine((val) => val !== undefined && val !== null && val !== '', {
      message: 'Upload a photo',
    })
    .refine((val) => {
      if (val instanceof File) {
        return val.size <= 5_000_000; // 5MB
      }
      return true;
    }, 'Max file size is 5MB')
    .refine((val) => {
      if (val instanceof File) {
        return IMAGE_MIME_TYPES.includes(val.type);
      }
      return true;
    }, 'Only .jpg, .jpeg, .png formats are supported'),
  isActive: z.enum(['Y', 'N'], { message: 'Status is required' }),
});

export type BrandFormData = z.infer<typeof brandSchema>;
