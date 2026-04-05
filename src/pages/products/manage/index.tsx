import ColumnIcon from '@/assets/svg/ColumnIcon';
import FilterIcon from '@/assets/svg/FilterIcon';
import Button from '@/components/atoms/Button';
import Image from '@/components/atoms/Image';
import Search from '@/components/atoms/Search';
import Switch from '@/components/atoms/Switch';
import ActionButtons from '@/components/molecules/ActionButtons';
import Pagination from '@/components/molecules/Pagination';
import DataTable from '@/components/organisms/DataTable';
import ColumnSettingsModal, {
  type ColumnSetting,
} from '@/components/molecules/modal/ColumnSettingsModal';
import ProductFilterMoldal from '@/features/products/components/ProductListFilterModal';
import ProductStatusTabs from '@/features/products/components/ProductStatusTabs';
import { useGetProductsQuery } from '@/store/api/endpoints/productEndpoints';
import type { ProductSummaryT } from '@/types';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import ProductDetailsModal from '@/features/products/components/ProductDetailsModal';

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
  const [isFilterModal, setFilterModal] = useState(false);
  const [isColumnModal, setColumnModal] = useState(false);
  const [isDetailModal, setDetailModal] = useState(false);

  const [selProductId, setSelProductId] = useState<number | null>(null);

  const [currPage, setCurrPage] = useState<number>(1);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: products } = useGetProductsQuery();

  const initialQueryParams = Object.fromEntries(searchParams.entries());

  const filterParams = {
    categoryId: parseId(initialQueryParams.categoryId),
    shopId: parseId(initialQueryParams.shopId),
    brandId: parseId(initialQueryParams.brandId),
    unit: initialQueryParams.unit,
    status: initialQueryParams.status as 'Y' | 'N',
  };

  const handleStatus = (status: string) => {
    console.log({ status });
  };

  const handleView = (product: ProductSummaryT) => {
    console.log({ product });
    setSelProductId(product.productId);
    setDetailModal(true);
  };

  const handleEdit = (id: number) => {
    navigate(`/products/${id}/edit`);
  };

  const handleDeactivate = (id: number) => {
    console.log({ id });
    // setConfirmAction(() => () => {
    //   console.log('deactive id:', id);
    // });
    // setIsDeactiveOpen(true);
  };

  console.log({ currPage });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="heading-1">Manage Products</h1>
        <Button variant="add" onClick={() => navigate('/products/create')}>
          Add Product
        </Button>
      </div>
      <div className="bg-surface mt-3 rounded-xl border border-border">
        <ProductStatusTabs />
        <div className="flex justify-between px-5 py-4">
          <Search className="max-w-[350px]" onSearch={(keyword) => console.log(keyword)} />
          <div className="flex gap-4">
            <Button
              variant="filter"
              onClick={() => setFilterModal(true)}
              className="flex justify-center items-center gap-2"
            >
              <FilterIcon /> Filters
            </Button>
            <Button
              variant="column"
              onClick={() => setColumnModal(true)}
              className="flex justify-center items-center gap-2"
            >
              <ColumnIcon /> Columns
            </Button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <DataTable
            header={[
              'SL No',
              'Product Name',
              'Shop Name',
              'Product Style/SKU',
              'Category',
              'DP(৳)',
              'MRP(৳)',
              'Sell(৳)',
              'Status',
              'Action',
            ]}
          >
            {products?.data &&
              products?.data.map((product, index: number) => (
                <tr key={product.productId}>
                  <td className="px-5 py-3">{index + 1}</td>
                  <td className="px-5 py-3">
                    <div className="max-w-56 flex gap-2 items-center">
                      <Image
                        src={`https://prod.saralifestyle.com${product.thumbnailImage}`}
                        width={48}
                        height={48}
                        alt="default-avater"
                      />
                      <p>
                        {product.categoryName} {product.categoryName}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-3">{product.shopName}</td>
                  <td className="px-5 py-3">{product.sku}</td>
                  <td className="px-5 py-3">{product.categoryName}</td>
                  <td className="px-5 py-3">{product.dpPrice}</td>
                  <td className="px-5 py-3">{product.mrp}</td>
                  <td className="px-5 py-3">{product.sellingPrice}</td>
                  <td className="px-5 py-3">
                    {/* <Status status={product.status} /> */}
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
                          label: 'Deactivate',
                          onClick: () => handleDeactivate(product.productId),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
          </DataTable>
          <div className="text-center py-5">
            <Pagination totalPage={12} currentPage={5} setCurrentPage={setCurrPage} />
          </div>
        </div>
      </div>

      {isFilterModal && (
        <ProductFilterMoldal
          isOpen={isFilterModal}
          onClose={() => setFilterModal(false)}
          initialValues={filterParams}
        />
      )}

      {isColumnModal && (
        <ColumnSettingsModal
          isOpen={isColumnModal}
          onClose={() => setColumnModal(false)}
          columns={columns}
        />
      )}

      {isDetailModal && selProductId && (
        <ProductDetailsModal
          productId={selProductId}
          isOpen={isDetailModal}
          onClose={() => setDetailModal(false)}
        />
      )}
    </div>
  );
};

export default ManageProductPage;
