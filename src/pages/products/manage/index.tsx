import ColumnIcon from '@/assets/svg/ColumnIcon';
import FilterIcon from '@/assets/svg/FilterIcon';
import Button from '@/components/atoms/Button';
import Image from '@/components/atoms/Image';
import Switch from '@/components/atoms/Switch';
import ActionButtons from '@/components/molecules/ActionButtons';
import Pagination from '@/components/molecules/Pagination';
import DataTable from '@/components/organisms/DataTable';
import ColumnSettingsModal, {
  type ColumnSetting,
} from '@/components/molecules/modal/ColumnSettingsModal';
import ProductStatusTabs from '@/features/products/components/ProductStatusTabs';
import { useGetProductsQuery } from '@/store/api/endpoints/productEndpoints';
import type { ProductSummaryT, SelectedProductT } from '@/types';
import { useMemo, useState, type ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import ProductDetailsModal from '@/features/products/components/ProductDetailsModal';
import { formatDateTime } from '@/utils/formatDateTime';
import ProductListFilterDrawer from '@/features/products/components/ProductListFilterDrawer';
import Checkbox from '@/components/atoms/Checkbox';
import SearchBar from '@/components/molecules/SearchBar';
import ProductBulkActions from '@/features/products/components/ProductBulkActions';
import { cn } from '@/lib/cn';

const columns: ColumnSetting[] = [
  { label: 'Product ID', value: 'productId', isVisible: true },
  { label: 'Product Name', value: 'productName', disabled: true, isVisible: true },
  { label: 'Shop Name', value: 'shopName', disabled: true, isVisible: true },
  { label: 'SKU', value: 'sku', disabled: true, isVisible: true },
  { label: 'Category', value: 'category', disabled: true, isVisible: true },
  { label: 'Brand', value: 'brand', isVisible: true },
  { label: 'DP', value: 'dp', disabled: true, isVisible: true },
  { label: 'MRP', value: 'mrp', disabled: true, isVisible: true },
  { label: 'Selling Price', value: 'sellingPrice', disabled: true, isVisible: true },
  { label: 'Burn', value: 'burn' },
  { label: 'Discount', value: 'discount' },
  { label: 'Commission', value: 'commission', isVisible: true },
  { label: 'Display Order', value: 'displayOrder' },
  { label: 'Stock', value: 'stock' },
  { label: 'Warranty Type', value: 'warrantyType' },
  { label: 'Warranty Period', value: 'warrantyPeriod' },
  { label: 'Created By', value: 'createdBy' },
  { label: 'Updated By', value: 'updatedBy' },
  { label: 'Review Rating', value: 'reviewRating' },
];

const parseId = (val: string) => (val ? Number(val) : undefined);

const ManageProductPage = () => {
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [isColumnModalOpen, setColumnModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  const [isAllRowsSelected, setAllRowsSelected] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProductT[]>([]);

  const [activeProductId, setActiveProductId] = useState<number | null>(null);
  const [excludedProductIds, setExcludedProductIds] = useState<number[]>([]);

  const [pendingDisplayOrders, setPendingDisplayOrders] = useState<Record<number, number>>({});

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isBlukModify = selectedProducts?.length > 0 || isAllRowsSelected;

  const approvalStatusParam = searchParams.get('approvalStatus') ?? 'approved';
  const keywordParams = searchParams.get('keyword') || undefined;
  const currentPage = Number(searchParams.get('page') ?? 1);
  const itemsPerPage = Number(searchParams.get('itemsPerPage') ?? 15);

  const categoryIdParam = searchParams.get('categoryId') ?? '';
  const shopIdParam = searchParams.get('shopId') ?? '';
  const brandIdParam = searchParams.get('brandId') ?? '';
  const unitParam = searchParams.get('unit') ?? '';
  const statusParam = searchParams.get('status') ?? '';

  const filterParams = useMemo(
    () => ({
      categoryId: parseId(categoryIdParam),
      shopId: parseId(shopIdParam),
      brandId: parseId(brandIdParam),
      unit: unitParam || undefined,
      status: (statusParam as 'Y' | 'N') || undefined,
    }),
    [categoryIdParam, shopIdParam, brandIdParam, unitParam, statusParam]
  );

  const filteredCount = Object.values(filterParams).filter((v) => v !== undefined).length;

  const productParams = {
    ...filterParams,
    approvalStatus: approvalStatusParam,
    keyword: keywordParams,
    itemsPerPage,
    currentPage,
  };

  const { data: products } = useGetProductsQuery(productParams);

  const selectedProductIds = useMemo(
    () => new Set(selectedProducts.map((p) => p.productId)),
    [selectedProducts]
  );

  const deselectedIdsSet = useMemo(() => new Set(excludedProductIds), [excludedProductIds]);

  // Determines if all rows on the current page are selected
  // - In "all" mode: rows are selected unless excluded
  // - In manual mode: rows are selected if explicitly selected
  const isCurrentPageSelected = isAllRowsSelected
    ? (products?.data?.every((p) => deselectedIdsSet.has(p.productId)) ?? false)
    : (products?.data?.every((p) => selectedProductIds.has(p.productId)) ?? false);

  const handleSelectRow = (e: ChangeEvent<HTMLInputElement>, product: ProductSummaryT) => {
    const { checked } = e.target;

    if (isAllRowsSelected) {
      if (!checked) {
        setExcludedProductIds((prev) =>
          prev.includes(product.productId) ? prev : [...prev, product.productId]
        );
      } else {
        setExcludedProductIds((prev) => prev.filter((id) => id !== product.productId));
      }
      return;
    }

    setSelectedProducts((prev) => {
      if (checked) {
        return [
          ...prev,
          {
            productId: product.productId,
            displayOrder: product.displayOrder,
          },
        ];
      }
      return prev.filter((p) => p.productId !== product.productId);
    });
  };

  const handleSelectAllRows = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAllRowsSelected(checked);
    setSelectedProducts([]);
    setExcludedProductIds([]);
  };

  const handleSelectCurrentPageRows = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAllRowsSelected(false);
    setExcludedProductIds([]);

    setSelectedProducts((prev) => {
      if (checked) {
        const prevById = new Map(prev.map((p) => [p.productId, p]));
        products?.data?.forEach((p) => {
          if (!prevById.has(p.productId)) {
            prevById.set(p.productId, {
              productId: p.productId,
              displayOrder: p.displayOrder,
              // productStatus: p.status,
            });
          }
        });

        return Array.from(prevById.values());
      }

      const currentPageIds = new Set(products?.data?.map((p) => p.productId));
      return prev.filter((p) => !currentPageIds.has(p.productId));
    });
  };

  const handleTabChange = () => {
    setSelectedProducts([]);
    setExcludedProductIds([]);
    setPendingDisplayOrders({});
    setAllRowsSelected(false);
  };

  const handleStatus = (status: string) => {
    console.log({ status });
  };

  const handleView = (product: ProductSummaryT) => {
    setActiveProductId(product.productId);
    setDetailModalOpen(true);
  };

  const handleEdit = (id: number) => {
    navigate(`/products/${id}/edit`);
  };

  const handleDuplicate = (id: number) => {
    console.log({ id });
  };

  const handlePending = (id: number) => {
    console.log({ id });
  };

  const handleReject = (id: number) => {
    console.log({ id });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="heading-1">Manage Products</h1>
        <Button variant="add" onClick={() => navigate('/products/create')}>
          Add Product
        </Button>
      </div>
      <div className="bg-surface mt-3 rounded-xl border border-border">
        <ProductStatusTabs onTabChange={handleTabChange} />
        <div className="flex justify-between px-5 py-4">
          <SearchBar />

          <div
            className={`transition-opacity duration-300 
              ${isBlukModify ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <ProductBulkActions
              selectedProducts={selectedProducts}
              excludedProductIds={excludedProductIds}
              pendingDisplayOrders={pendingDisplayOrders}
              params={{ approvalStatusParam, filterParams, keywordParams }}
            />
          </div>

          <div className="flex gap-4 ">
            <Button
              variant="filter"
              onClick={() => setFilterDrawerOpen(true)}
              className="flex justify-center items-center gap-2"
            >
              <FilterIcon /> Filters
              {filteredCount > 0 && (
                <sup className="h-[16.67px] text-sm text-white rounded-lg px-1.5 bg-danger-500">
                  {filteredCount}
                </sup>
              )}
            </Button>
            <Button
              variant="column"
              onClick={() => setColumnModalOpen(true)}
              className="flex justify-center items-center gap-2"
            >
              <ColumnIcon /> Columns
            </Button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <DataTable
            selection={{
              isSelectedAll: isAllRowsSelected && excludedProductIds?.length === 0,
              isCurrentPageSelected: isCurrentPageSelected,
              onSelectAllRows: handleSelectAllRows,
              onSelectCurrentPageRows: handleSelectCurrentPageRows,
            }}
            header={[
              'SL No',
              'Product Name',
              'Shop Name',
              'Product Style/SKU',
              'Category',
              'Last Update',
              'DP(৳)',
              'MRP(৳)',
              'Sell(৳)',
              'Display Order',
              'Status',
              'Action',
            ]}
          >
            {products?.data?.map((product, index: number) => (
              <tr key={product.productId}>
                <td className="px-5 py-3">
                  <div className="flex justify-center">
                    <Checkbox
                      name={String(product.productId)}
                      checked={
                        isAllRowsSelected
                          ? !deselectedIdsSet.has(product.productId)
                          : selectedProductIds.has(product.productId)
                      }
                      onChange={(e) => handleSelectRow(e, product)}
                    />
                  </div>
                </td>
                <td className="px-5 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2 items-center max-w-48">
                    <Image
                      src={`https://prod.saralifestyle.com${product.thumbnailImage}`}
                      width={48}
                      height={48}
                      alt="default-avater"
                    />
                    <p>{product.productName}</p>
                  </div>
                </td>

                <td className="px-5 py-3">{product.shopName}</td>
                <td className="px-5 py-3">{product.sku}</td>
                <td className="px-5 py-3">{product.categoryName}</td>
                <td className="px-5 py-3">{formatDateTime(product.updatedAt)}</td>
                <td className="px-5 py-3">{product.dpPrice}</td>
                <td className="px-5 py-3">{product.mrp}</td>
                <td className="px-5 py-3">{product.sellingPrice}</td>
                <td className="px-5 py-3">
                  <input
                    type="number"
                    disabled={isBlukModify && selectedProductIds.has(product.productId)}
                    placeholder="Display Order"
                    defaultValue={product.displayOrder}
                    className={cn(
                      'input-field input-no-arrow',
                      'mt-0 max-w-28 py-0.5 placeholder:text-xs'
                    )}
                    onChange={(e) =>
                      setPendingDisplayOrders((prev) => ({
                        ...prev,
                        [product.productId]: Number(e.target.value),
                      }))
                    }
                  />
                </td>
                <td className="px-5 py-3">
                  <Switch
                    isEnabled={product.status === 'Y'}
                    onEnabled={() => handleStatus(product.status)}
                  />
                </td>
                <td className="px-5 py-3">
                  <ActionButtons
                    actions={[
                      {
                        label: 'View',
                        onClick: () => handleView(product),
                      },
                      {
                        label: 'Edit',
                        onClick: () => handleEdit(product.productId),
                      },
                      {
                        label: 'Duplicate',
                        onClick: () => handleDuplicate(product.productId),
                      },
                      {
                        label: 'Pending',
                        onClick: () => handlePending(product.productId),
                      },
                      {
                        label: 'Reject',
                        onClick: () => handleReject(product.productId),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </DataTable>
        </div>

        <div className="text-center py-5">
          <Pagination
            totalPages={products?.pagination?.totalPages}
            totalItems={products?.pagination?.totalItems}
          />
        </div>
      </div>

      <ProductListFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        initialValues={filterParams}
      />

      {isColumnModalOpen && (
        <ColumnSettingsModal
          isOpen={isColumnModalOpen}
          onClose={() => setColumnModalOpen(false)}
          columns={columns}
        />
      )}

      {isDetailModalOpen && activeProductId && (
        <ProductDetailsModal
          productId={activeProductId}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setDetailModalOpen(false);
            setActiveProductId(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageProductPage;
