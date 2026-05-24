interface CategoryBaseT {
  categoryId: number;
  categoryName: string;
  imagePath?: string;
  slug?: string;
  // url?: string;
}

export type ThirdChildT = CategoryBaseT & {};
export type SecondChildT = CategoryBaseT & { thirdChild: ThirdChildT[] };
export type FirstChildT = CategoryBaseT & { secondChildren: SecondChildT[] };

export type CategoryTreeT = CategoryBaseT & { firstChildren: FirstChildT[] };

interface CategotyLayerT {
  base: string;
  first?: string;
  second?: string;
  third?: string;
}

export interface SelectedCategoryT {
  id: number | null;
  name: string;
  layer: CategotyLayerT;
}

export interface CategoryParamsT {
  approvalStatus: string;
  keyword?: string;
  status?: 'Y' | 'N';
  currentPage: number;
  itemsPerPage: number;
}

export interface CategorySummaryT extends CategoryBaseT {
  breadcrumbCategory: string;
  displayOrder: number;
  status: 'Y' | 'N';
  isActive: 'Y' | 'N';
}

export interface CategoryDetailsT extends CategorySummaryT {
  parentCategoryId?: number;
  description: string;
  includeInTopMenu: 'Y' | 'N';

  metaTag?: {
    metaTitle?: string;
    metaKeywords?: string;
    metaDescription?: string;
  };

  ogTag?: {
    ogType?: string;
    ogTitle?: string;
    ogUrl?: string;
    ogDescription?: string;
    ogImgUrl?: string;
  };
}
