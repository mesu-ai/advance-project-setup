export interface ProductParamsT {
  approvalStatus: string;
  categoryId?: number;
  shopId?: number;
  brandId?: number;
  unit?: string;
  status?: 'N' | 'Y';
  currentPage: number;
  itemsPerPage: number;
}

export interface ProductSummaryT {
  productId: number;
  productName: string;
  thumbnailImage: string;
  shopName: string;
  sku: string;
  categoryName: string;
  dpPrice: number;
  mrp: number;
  sellingPrice: number;
  displayOrder: number;
  status: 'N' | 'Y';
  updatedAt: string;
}

export interface ProductT {
  productId: number;
  productName: string;
  categoryId: number;
  unit: string;
  shopId: number;
  displayOrder?: string;
  thumbnailImages: string[];
  brandId: number;
  strapMeterial?: string;
  fitType?: string;
  gender?: string;
  variantDimensions: {
    dimensionId: string;
    name: string;
    options: {
      variantOptionId: number;
      variantOptionText: string;
    }[];
  }[];
  variantImages?: {
    variantOptionId: number;
    variantOptionText: string;
    images?: string[];
  }[];
  variantCombinations: {
    sku: string;
    shopProductSku: string;
    subStyle?: string;
    stock?: number;
    dpPrice?: number;
    mrp?: number;
    sellingPrice?: number;
    startDate?: string;
    endDate?: string;
    burnAmount?: number;
    commissionAmount?: number;
    options: {
      variantOptionId: number;
      variantOptionText: string;
    }[];
    inventoryTypeId?: number;
    status: 'N' | 'Y';
  }[];

  sku?: string;
  subStyle?: string;
  stock?: number;
  dpPrice?: number;
  mrp?: number;
  sellingPrice?: number;
  startDate?: string;
  endDate?: string;

  description: string;
  specification: string;
  hasEmi?: 'Y' | 'N';
  isReturnable?: 'Y' | 'N';
  returnDuration?: number;
  returnPolicy?: string;
  sizeChartId: number;
  warrantyTypeId: number;
  warrantyPeriodId: number;
  warrantyPolicy?: string;
  packageWeight: number;
  packageLength: number;
  packageWidth: number;
  packageHeight: number;
  productUrl: string;
  videoUrl?: string;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  ogType?: string;
  ogTitle?: string;
  ogUrl?: string;
  ogDescription?: string;
  ogImage?: string | File;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}
