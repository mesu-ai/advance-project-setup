import { categoryStatusTabs } from '@/assets/data/categories';
import FilterIcon from '@/assets/svg/FilterIcon';
import Button from '@/components/atoms/Button';
import Image from '@/components/atoms/Image';
import Status from '@/components/atoms/Status';
import ActionButtons from '@/components/molecules/ActionButtons';
import Pagination from '@/components/molecules/Pagination';
import SearchBar from '@/components/molecules/SearchBar';
import StatusTab from '@/components/molecules/StatusTab';
import DataTable from '@/components/organisms/DataTable';
import CategoryListFilterDrawer from '@/features/categories/components/CategoryListFilterDrawer';
import { useGetCategoriesQuery } from '@/store/api/endpoints/categoryEndpoints';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const CategoryListPage = () => {
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const approvalStatusParam = searchParams.get('approvalStatus') ?? 'all-category';
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

  const categoryParams = {
    ...filterParams,
    approvalStatus: approvalStatusParam,
    keyword: keywordParams,
    currentPage,
    itemsPerPage,
  };

  const { data: categoies } = useGetCategoriesQuery(categoryParams);

  // const handleStatus = (status: string) => {
  //   console.log({ status });
  // };

  const handleView = (sellerId: number) => {
    console.log({ sellerId });
    // setActiveProductId(product.productId);
    // setDetailModalOpen(true);
  };

  const handleEdit = (id: number) => {
    navigate(`/settings/categories/${id}/edit`);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="heading-1">Manage Categories</h1>
        <Button variant="add" onClick={() => navigate('/settings/categories/create')}>
          Add New Category
        </Button>
      </div>
      <div className="bg-surface mt-3 rounded-xl border border-border">
        <StatusTab options={categoryStatusTabs} initialStatus="all" />

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
              'Name',
              'Breadcrumb',
              'Category Slug',
              'Display Order',
              'Status',
              'Action',
            ]}
          >
            {categoies?.data?.map((category, index: number) => (
              <tr key={category.categoryId}>
                <td className="px-5 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2 items-center max-w-48">
                    <Image
                      src={`https://prod.saralifestyle.com${category.imagePath}`}
                      width={48}
                      height={48}
                      alt="category-image"
                    />
                    <p>{category.categoryName}</p>
                  </div>
                </td>
                <td className="px-5 py-3">{category.breadcrumbCategory}</td>
                <td className="px-5 py-3">{category.slug}</td>

                <td className="px-5 py-3">{category.displayOrder}</td>
                <td className="px-5 py-3">
                  <Status status={category.isActive ? 'active' : 'pending'} />
                </td>

                <td className="px-5 py-3">
                  <ActionButtons
                    actions={[
                      { label: 'View', onClick: () => handleView(category.categoryId) },
                      { label: 'Edit', onClick: () => handleEdit(category.categoryId) },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </DataTable>
        </div>

        <div className="text-center py-5">
          <Pagination
            totalPages={categoies?.pagination?.totalPages}
            totalItems={categoies?.pagination?.totalItems}
          />
        </div>
      </div>

      <CategoryListFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        initialValues={filterParams}
      />
    </div>
  );
};

export default CategoryListPage;
