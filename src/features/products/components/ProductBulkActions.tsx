import Button from '@/components/atoms/Button';
import { useApiError } from '@/hooks/useApiError';
import { useProductBulkModifyMutation } from '@/store/api/endpoints/productEndpoints';
import type { BulkModifyProductT, SelectedProductT } from '@/types/product';
import { cleanPayload } from '@/utils/cleanPayload';

interface ProductBulkActionsProps {
  selectedProducts: SelectedProductT[];
  excludedProductIds: number[];
  pendingDisplayOrders: Record<number, number>;
  params: {
    approvalStatusParam?: string;
    keywordParams?: string;
    filterParams: {
      categoryId?: number;
      shopId?: number;
      brandId?: number;
      unit?: string;
      status?: 'Y' | 'N';
    };
  };
}

const ProductBulkActions = ({
  selectedProducts,
  excludedProductIds,
  pendingDisplayOrders,
  params,
}: ProductBulkActionsProps) => {
  const [productBulkUpdate] = useProductBulkModifyMutation();
  const { handleApiError } = useApiError();

  const handleBulkStatusChange = async (status: 'Y' | 'N') => {
    const bulkFilterParams = {
      approvalStatus: params.approvalStatusParam,
      keyword: params.keywordParams,
      categoryId: params.filterParams.categoryId,
      shopId: params.filterParams.shopId,
      brandId: params.filterParams.brandId,
      unit: params.filterParams.unit,
      status: params.filterParams.status,
    };

    const modifyData = selectedProducts.length
      ? {
          isSelectAll: false,
          targetStatus: status,
          selectedProducts,
        }
      : {
          isSelectAll: true,
          targetStatus: status,
          excludedProductIds,
          ...bulkFilterParams,
        };

    const cleanedData = cleanPayload(modifyData) as BulkModifyProductT;

    try {
      const res = await productBulkUpdate(cleanedData).unwrap();
      console.log({ res });
      // if (!res.success || !res?.data?.files?.[0]) {
      //   return toast.error(res?.error || res?.message || 'Invalid request');
      // }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleBulkOrderChange = async () => {
    const selectedWithOrders: SelectedProductT[] = selectedProducts.map((p) => ({
      productId: p.productId,
      displayOrder: pendingDisplayOrders[p.productId] ?? p.displayOrder,
    }));

    try {
      const res = await productBulkUpdate({
        isSelectAll: false,
        selectedProducts: selectedWithOrders,
      }).unwrap();
      console.log({ res });
      // if (!res.success || !res?.data?.files?.[0]) {
      //   return toast.error(res?.error || res?.message || 'Invalid request');
      // }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative group">
        <Button variant="bulk" className="bg-processing-500 group-hover:bg-processing-600">
          Bulk Status Change
        </Button>
        <div className="hidden absolute left-0 w-full group-hover:flex flex-col bg-white shadow-custom-2 text-sm font-medium rounded-b-lg py-2">
          <button
            type="button"
            onClick={() => handleBulkStatusChange('Y')}
            className="px-4 py-1.5 cursor-pointer hover:bg-secondary-50 text-start"
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => handleBulkStatusChange('N')}
            className="px-4 py-1.5 cursor-pointer hover:bg-secondary-50 text-start "
          >
            Deactive
          </button>
        </div>
      </div>

      {selectedProducts?.length ? (
        <Button
          variant="bulk"
          onClick={() => handleBulkOrderChange()}
          className="bg-success-500 hover:bg-success-600"
        >
          Bulk Display Modify
        </Button>
      ) : null}

      <Button variant="bulk" className="bg-secondary-500 hover:bg-secondary-600">
        Bulk Export Excel
      </Button>
    </div>
  );
};

export default ProductBulkActions;
