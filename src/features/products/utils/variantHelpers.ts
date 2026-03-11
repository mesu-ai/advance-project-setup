import type { VariantOptionT } from '../types';

export const getCombinationKey = (options: VariantOptionT[]): string => {
  return options
    .map((o) => o.variantOptionId)
    .sort((a, b) => a - b)
    .join('-');
};

export const shopProductSkuGenerator = (options: VariantOptionT[]): string => {
  const variantPart = options?.map((o) => o.variantOptionText.slice(0, 3).toUpperCase()).join('');
  const timePart = Date.now().toString(36).toUpperCase();
  return `${variantPart}${timePart}`;
};
