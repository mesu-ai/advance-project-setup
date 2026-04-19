import type { productSteps } from '@/assets/data/products';

export type VariantOptionT = { variantOptionId: number; variantOptionText: string };
export type ProductFieldFocusT = 'productName' | 'categoryId' | '';
export type SectionsKeyT = (typeof productSteps)[number]['key'];
