import type { StatusTabOptionT } from '@/components/molecules/StatusTab';

export const productSections = [
  { key: 'basisInfo', name: 'Basic Information' },
  { key: 'variants', name: 'Price, Stock & Variants' },
  { key: 'productInfo', name: 'Product Info' },
  { key: 'returnPolicy', name: 'Return Policy' },
  { key: 'metadata', name: 'Meta & OG Info' },
];

export const productSteps = [
  { key: 'basisInfo', name: 'Basic Information', description: 'Product basic info descriptions' },
  { key: 'images', name: 'Product Images', description: 'Product images descriptions' },
  {
    key: 'attributes',
    name: 'Brand & Attributes',
    description: 'Product brand & attributes description',
  },
  {
    key: 'variants',
    name: 'Price, Stock & Variants',
    description: 'Product price, stock & variants description',
  },
  { key: 'productInfo', name: 'Product Info', description: 'Product info decription' },
  { key: 'sizeChart', name: 'Size Chart', description: 'Size chart description' },
  { key: 'warranty', name: 'Warranty & Package', description: 'warranty & package description' },
  { key: 'url', name: 'URL', description: 'Product URL submition details' },
  { key: 'meta', name: 'Meta & OG Info', description: 'Product meta & OG info details' },
] as const;

export const productApprovalStatus: StatusTabOptionT[] = [
  { name: 'Approved', status: 'approved', count: '1.2k' },
  { name: 'Pending', status: 'pending', count: '300' },
  { name: 'Rejected', status: 'rejected', count: '100' },
  { name: 'Low Stock', status: 'lowstock', count: '09' },
  { name: 'Draft', status: 'draft', count: '50' },
  { name: 'All', status: 'all', count: '10580' },
];
