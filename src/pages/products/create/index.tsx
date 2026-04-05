import ProductForm from '@/features/products/components/ProductForm';
import type { ProductFormData } from '@/features/products/schema';

const CreateProductPage = () => {
  const onSubmit = async (data: ProductFormData) => {
    console.log({ data });
  };

  return (
    <div>
      <ProductForm mode="create" onSubmit={onSubmit} />
    </div>
  );
};

export default CreateProductPage;
