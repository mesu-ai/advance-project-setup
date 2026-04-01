export interface ProductT {
  productId: number;
  productName: string;
  thumbnailImage: string;
  shopName: string;
  sku: string;
  categoryName: string;
  dpPrice: number;
  mrp: number;
  sellingPrice: number;
  status: 'N' | 'Y';
}
