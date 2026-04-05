import { SLUG_REGEX } from '@/constants/regex';
import * as z from 'zod';

const productImagesSchema = z.object({
  variantOptionId: z.number('Option id required'),
  variantOptionText: z.string('Option label required'),
  images: z.array(z.url('Invalid image URL')).optional(),
});

const variantOptionSchema = z.object({
  variantOptionId: z.number('Option id required'),
  variantOptionText: z.string('Option label required'),
});

const variantDimensionSchema = z.object({
  dimensionId: z.string('Dimension id required'),
  name: z.string('Dimension name required'),
  options: z.array(variantOptionSchema).nonempty('At least one option required'),
});

const combinationOptionSchema = z.object({
  variantOptionId: z.number('Option id required'),
  variantOptionText: z.string('Option label required'),
});

const variantCombinationSchema = z
  .object({
    sku: z.string(),
    shopProductSku: z.string(),
    subStyle: z.string().optional(),

    stock: z.coerce
      .number<number>('Invalid stock')
      .nonnegative('Stock must be positive')
      .optional(),
    dpPrice: z.coerce.number<number>('Invalid price').positive('DP must be positive').optional(),
    mrp: z.coerce.number<number>('Invalid price').positive('MRP must be positive').optional(),
    sellingPrice: z.coerce
      .number<number>('Invalid price')
      .positive('Price must be positive')
      .optional(),
    startDate: z.iso.datetime({ local: true }).optional(),
    endDate: z.iso.datetime({ local: true }).optional(),
    burnAmount: z.coerce
      .number<number>('Invalid price')
      .nonnegative('Burn must be positive')
      .optional(),
    commissionAmount: z.coerce
      .number<number>('Invalid price')
      .positive('Commission must be positive')
      .optional(),
    options: z.array(combinationOptionSchema),
    inventoryTypeId: z.number().optional(),
    status: z.enum(['Y', 'N'], { message: 'Status is required' }),
  })
  .superRefine((val, ctx) => {
    const { dpPrice, mrp, sellingPrice } = val;

    if (dpPrice && mrp && mrp <= dpPrice) {
      ctx.addIssue({
        path: ['mrp'],
        code: 'custom',
        message: 'MRP must be greater than DP',
      });
    }

    if (dpPrice && sellingPrice && sellingPrice <= dpPrice) {
      ctx.addIssue({
        path: ['sellingPrice'],
        code: 'custom',
        message: 'Selling price must be greater than DP',
      });
    }
  });

export const productSchema = z
  .object({
    productName: z.string().min(3, 'Product name is required'),
    categoryId: z.number('Product category is required'),
    unit: z.string('Product unit is required'),
    shopId: z.number('Shop name is required'),
    displayOrder: z.string().optional(),
    thumbnailImages: z.array(z.url('Invalid image URL')).nonempty('Select at least one image'),
    brandId: z.number('Brand is required'),
    strapMeterial: z.string().optional(),
    fitType: z.string().optional(),
    gender: z.string().optional(),
    variantDimensions: z.array(variantDimensionSchema),
    variantImages: z.array(productImagesSchema).optional(),
    variantCombinations: z.array(variantCombinationSchema).nonempty('Variant is '),

    sku: z.string().optional(),
    subStyle: z.string().optional(),
    stock: z.coerce
      .number<number>('Invalid stock')
      .nonnegative('Stock must be positive')
      .optional(),
    dpPrice: z.coerce.number<number>('Invalid price').nonnegative('DP must be positive').optional(),
    mrp: z.coerce.number<number>('Invalid price').nonnegative('MRP must be positive').optional(),
    sellingPrice: z.coerce
      .number<number>('Invalid price')
      .positive('Selling price must be positive')
      .optional(),
    startDate: z.iso.datetime({ local: true }).optional(),
    endDate: z.iso.datetime({ local: true }).optional(),

    description: z.string().min(3, 'Description is required'),
    specification: z.string().min(3, 'Specification is required'),
    hasEmi: z.enum(['Y', 'N']).optional(),
    isReturnable: z.enum(['Y', 'N']).optional(),
    returnDuration: z.coerce.number<number>('Invalid duration').optional(),
    returnPolicy: z.string().optional(),
    sizeChartId: z.number('Size chart is required'),
    warrantyTypeId: z.number('Warranty height is required'),
    warrantyPeriodId: z.number('Warranty period is required'),
    warrantyPolicy: z.string().optional(),
    packageWeight: z.coerce.number<number>('Invalid weight').positive('Weight must be positive'),
    packageLength: z.coerce.number<number>('Invalid length').positive('Length must be positive'),
    packageWidth: z.coerce.number<number>('Invalid width').positive('Width must be positive'),
    packageHeight: z.coerce.number<number>('Invalid height').positive('Height must be positive'),
    productUrl: z
      .string()
      .min(1, 'Product url is required')
      .regex(SLUG_REGEX, 'Only lowercase letters, numbers, and hyphens are allowed'),
    videoUrl: z.string().optional(),
    metaTitle: z.string().optional(),
    metaKeywords: z.string().optional(),
    metaDescription: z.string().optional(),
    ogType: z.string().optional(),
    ogTitle: z.string().optional(),
    ogUrl: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z
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
  })
  .superRefine((val, ctx) => {
    const { isReturnable, returnDuration, returnPolicy } = val;

    console.log({ isReturnable });

    if (isReturnable === 'Y') {
      if (!returnDuration) {
        ctx.addIssue({
          path: ['returnDuration'],
          code: 'custom',
          message: 'Return duration is required',
        });
      }

      if (!returnPolicy) {
        ctx.addIssue({
          path: ['returnPolicy'],
          code: 'custom',
          message: 'Return policy is required',
        });
      }
    }
  });

export type ProductFormData = z.infer<typeof productSchema>;
