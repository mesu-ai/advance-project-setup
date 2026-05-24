export interface BrandT {
  brandId: number;
  brandLogo: string;
  brandName: string;
  brandUrl: string;
  brandDetails: string;
  isActive: 'Y' | 'N';
}

export interface BrandParamsT {
  keyword?: string;
  status?: 'Y' | 'N';
  currentPage: number;
  itemsPerPage: number;
}
