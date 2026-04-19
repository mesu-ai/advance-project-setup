export interface SellerT {
  sellerId: number;
  sellerName: string;
  shopName: string;
  shopLogoUrl: string;
  sellerContactNo: string;
  sellerEmail: string;
  assignVendorName: string;
  sellerBankAccount?: string;
  isActive: 'Y' | 'N';
}

export interface SellerParamsT {
  approvalStatus: string;
  status?: 'Y' | 'N';
  actStatus?: string;
  keyword?: string;
  currentPage: number;
  itemsPerPage: number;
}
