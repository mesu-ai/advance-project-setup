import CategoryForm from '@/features/categories/components/CategoryForm';
import type { CategoryFormData } from '@/features/categories/schema';

const CategoryCreatePage = () => {
  const onSubmit = async (data: CategoryFormData) => {
    console.log({ data });
  };

  return (
    <div>
      <h1 className="heading-1">Add New Category</h1>
      <div className="mt-3">
        <CategoryForm mode="create" onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CategoryCreatePage;
