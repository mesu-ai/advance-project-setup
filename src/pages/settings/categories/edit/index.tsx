import CategoryForm from '@/features/categories/components/CategoryForm';
import type { CategoryFormData } from '@/features/categories/schema';
import { useGetCategoryByIdQuery } from '@/store/api/endpoints/categoryEndpoints';
import { useParams } from 'react-router';

const EditCategoryPage = () => {
  const { categoryId } = useParams();
  const { data: category, isLoading } = useGetCategoryByIdQuery(categoryId!, { skip: !categoryId });

  const onSubmit = async (data: CategoryFormData) => {
    console.log({ data });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!category?.data) return <div>Category not found</div>;

  return (
    <div>
      <h1 className="heading-1">Edit Category</h1>
      <div className="mt-3">
        <CategoryForm
          mode="edit"
          onSubmit={onSubmit}
          initialValues={category?.data as CategoryFormData}
        />
      </div>
    </div>
  );
};

export default EditCategoryPage;
