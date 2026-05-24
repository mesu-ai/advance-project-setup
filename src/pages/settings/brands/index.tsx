import FilterIcon from '@/assets/svg/FilterIcon';
import Button from '@/components/atoms/Button';
import Image from '@/components/atoms/Image';
import Status from '@/components/atoms/Status';
import ActionButtons from '@/components/molecules/ActionButtons';
import Pagination from '@/components/molecules/Pagination';
import SearchBar from '@/components/molecules/SearchBar';
import DataTable from '@/components/organisms/DataTable';
import BrandListFilterDrawer from '@/features/brands/components/BrandListFilterDrawer';
import { useGetBrandsQuery } from '@/store/api/endpoints/brandEndpoints';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const BrandListPage = () => {
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const keywordParams = searchParams.get('keyword') || undefined;
  const currentPage = Number(searchParams.get('page') ?? 1);
  const itemsPerPage = Number(searchParams.get('itemsPerPage') ?? 15);

  const statusParam = searchParams.get('status') ?? '';

  const filterParams = useMemo(
    () => ({
      status: (statusParam as 'Y' | 'N') || undefined,
    }),
    [statusParam]
  );

  const filteredCount = Object.values(filterParams).filter((v) => v !== undefined).length;

  const brandParams = {
    ...filterParams,
    keyword: keywordParams,
    currentPage,
    itemsPerPage,
  };

  const { data: brands, isLoading } = useGetBrandsQuery(brandParams);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="heading-1">Brands List</h1>
        <Button variant="add" onClick={() => navigate('/settings/brands/create')}>
          Add Brand
        </Button>
      </div>

      <div className="bg-surface mt-3 rounded-xl border border-border">
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
          <DataTable header={['SL No', 'Name', 'Slug', 'Details', 'Status', 'Action']}>
            {brands?.data?.map((brand, index: number) => (
              <tr key={brand.brandId}>
                <td className="px-5 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2 items-center max-w-48">
                    <Image
                      src={`https://prod.saralifestyle.com${brand.brandLogo}`}
                      width={48}
                      height={48}
                      alt="brand-logo"
                    />
                    <p>{brand.brandName}</p>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <p className="max-w-36 truncate">{brand.brandUrl}</p>
                </td>
                <td className="px-5 py-3">
                  <p className="max-w-xs line-clamp-2">{brand.brandDetails}</p>
                </td>
                <td className="px-5 py-3">
                  <Status status={brand.isActive === 'Y' ? 'active' : 'pending'} />
                </td>
                <td className="px-5 py-3">
                  <ActionButtons
                    actions={[
                      {
                        label: 'Edit',
                        onClick: () => navigate(`/settings/brands/${brand.brandId}/edit`),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}

            {!isLoading && brands?.data?.length === 0 && (
              <tr>
                <td className="px-5 py-6 text-center text-neutral-500" colSpan={9}>
                  No brands found.
                </td>
              </tr>
            )}
          </DataTable>
        </div>

        <div className="py-5 text-center">
          <Pagination
            totalPages={brands?.pagination?.totalPages}
            totalItems={brands?.pagination?.totalItems}
          />
        </div>
      </div>

      <BrandListFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        initialValues={filterParams}
      />
    </div>
  );
};

export default BrandListPage;
