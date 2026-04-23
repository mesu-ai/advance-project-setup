export interface RealTimeStockT {
  barcode: string;
  salePrice: number;
  quantity: number;
  currentStock: number;
  discountPercentage: number;
  startingDate: string | null;
  expiringDate: string | null;
  productStyle: string;
  mainStyle: string;
  subStyle: string;
}
