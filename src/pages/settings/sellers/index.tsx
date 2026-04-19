import { sellerStatusTabs } from '@/assets/data/sellers';
import FilterIcon from '@/assets/svg/FilterIcon';
import Button from '@/components/atoms/Button';
import Image from '@/components/atoms/Image';
import Status from '@/components/atoms/Status';
import Switch from '@/components/atoms/Switch';
import ActionButtons from '@/components/molecules/ActionButtons';
import Pagination from '@/components/molecules/Pagination';
import SearchBar from '@/components/molecules/SearchBar';
import StatusTab from '@/components/molecules/StatusTab';
import DataTable from '@/components/organisms/DataTable';
import SellerListFilterDrawer from '@/features/seller/components/SellerListFilterDrawer';
import { useGetSellersQuery } from '@/store/api/endpoints/sellerEndpoints';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const SellerListPage = () => {
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const approvalStatusParam = searchParams.get('approvalStatus') ?? 'approved';
  const keywordParams = searchParams.get('keyword') || undefined;
  const currentPage = Number(searchParams.get('page') ?? 1);
  const itemsPerPage = Number(searchParams.get('itemsPerPage') ?? 15);

  const actStatusParam = searchParams.get('actStatus') ?? '';
  const statusParam = searchParams.get('status') ?? '';

  const filterParams = useMemo(
    () => ({
      actStatus: actStatusParam || undefined,
      status: (statusParam as 'Y' | 'N') || undefined,
    }),
    [actStatusParam, statusParam]
  );

  const filteredCount = Object.values(filterParams).filter((v) => v !== undefined).length;

  const sellerParams = {
    ...filterParams,
    approvalStatus: approvalStatusParam,
    keyword: keywordParams,
    currentPage,
    itemsPerPage,
  };

  const { data: sellers, isLoading } = useGetSellersQuery(sellerParams);

  console.log({ sellers, isLoading });

  const handleTabChange = () => {
    // setSelectedProducts([]);
    // setExcludedProductIds([]);
    // setPendingDisplayOrders({});
    // setAllRowsSelected(false);
  };

  const handleStatus = (status: string) => {
    console.log({ status });
  };

  const handleView = (sellerId: number) => {
    console.log({ sellerId });
    // setActiveProductId(product.productId);
    // setDetailModalOpen(true);
  };

  const handleEdit = (id: number) => {
    navigate(`/settings/sellers/${id}/edit`);
  };

  const handleBankInfo = (id: number) => {
    console.log({ id });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="heading-1">Manage Sellers</h1>
        <Button variant="add" onClick={() => navigate('/settings/sellers/create')}>
          Add New Seller
        </Button>
      </div>
      <div className="bg-surface mt-3 rounded-xl border border-border">
        <StatusTab options={sellerStatusTabs} onTabChange={handleTabChange} isShowCount={false} />

        <div className="flex justify-between px-5 py-4">
          <SearchBar />
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
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <DataTable
            header={[
              'SL No',
              'Seller Name',
              'Shop Name',
              'Contact Info',
              'Assigned Vendor',
              'Account Status',
              'Status',
              'Action',
            ]}
          >
            {sellers?.data?.map((seller, index: number) => (
              <tr key={seller.sellerId}>
                <td className="px-5 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-5 py-3">{seller.sellerName}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2 items-center max-w-48">
                    <Image
                      src={`https://prod.saralifestyle.com${seller.shopLogoUrl}`}
                      width={48}
                      height={48}
                      alt="default-avater"
                    />
                    <p>{seller.shopName}</p>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="">
                    <p>{seller.sellerContactNo}</p>
                    <p>{seller.sellerEmail}</p>
                  </div>
                </td>
                <td className="px-5 py-3">{seller.assignVendorName}</td>
                <td className="px-5 py-3">
                  {/* bank account status is not provided in current api response */}
                  <Status status={seller.sellerBankAccount ? 'active' : 'pending'} />
                </td>

                <td className="px-5 py-3">
                  <Switch
                    isEnabled={seller.isActive === 'Y'}
                    onEnabled={() => handleStatus(seller.isActive)}
                  />
                </td>
                <td className="px-5 py-3">
                  <ActionButtons
                    actions={[
                      { label: 'View', onClick: () => handleView(seller.sellerId) },
                      { label: 'Edit', onClick: () => handleEdit(seller.sellerId) },
                      { label: 'Bank Info', onClick: () => handleBankInfo(seller.sellerId) },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </DataTable>
        </div>

        <div className="text-center py-5">
          <Pagination
            totalPages={sellers?.pagination?.totalPages}
            totalItems={sellers?.pagination?.totalItems}
          />
        </div>
      </div>

      <SellerListFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        initialValues={filterParams}
      />
    </div>
  );
};

export default SellerListPage;
