export interface SellerParamsT {
  approvalStatus: string;
  status?: 'Y' | 'N';
  actStatus?: string;
  keyword?: string;
  currentPage: number;
  itemsPerPage: number;
}

export interface SellerSummaryT {
  sellerId: number;
  sellerName: string;
  sellerContactNo: string;
  sellerEmail: string;
  assignVendorName: string;
  shopName: string;
  shopLogoUrl: string;
  sellerBankAccount?: string;
  isActive: 'Y' | 'N';
}

// export interface SellerT extends SellerSummaryT {
//   ownerName: string;
//   binNo: string;
//   countryId?: number;
//   shopCity: number;
//   shopState: number;
//   shopZipCode: string;
//   shopAddress: string;
//   shopDescription: string;

//   sellerPresentAddress?: string;
//   sellerPermanentAddress?: string;

//   sellerImageUrl: string;
//   shopLogoUrl: string;

//   bussinessTypeId?: number[];
//   bussinessTypeNames?: string[];

//   additionalDocuments?: {
//     docName: string;
//     docFileUrl: string;
//   }[];

//   metaTag: {
//     metaTitle: string;
//     metaDescription: string;
//     metaKeywords: string;
//     ogType: string;
//     ogTitle: string;
//     ogUrl: string;
//     ogDescription: string;
//     ogImage?: string;
//   }
// }
export interface SellerT extends SellerSummaryT {
  bussinessTypeId: number[];
  ownerName: string;
  binNo: string;
  countryId: number;
  shopCity: number;
  shopState: number;
  shopZipCode: string;
  shopAddress: string;
  shopDescription: string;

  sellerPresentAddress?: string;
  sellerPermanentAddress?: string;

  sellerImageUrl: string;

  ownerNidUrl: string;
  bussinessDocUrl: string;
  tradeLicenseDoc: string;
  binNoDoc?: string;
  tinNoDoc?: string;
  dbIdDoc?: string;
  status: 'Y' | 'N';

  additionalDocuments?: {
    docName?: string;
    docFile?: string;
  }[];

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
