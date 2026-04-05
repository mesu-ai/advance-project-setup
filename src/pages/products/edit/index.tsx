import ProductForm from '@/features/products/components/ProductForm';
import type { ProductFormData } from '@/features/products/schema';
import { useGetProductByIdQuery } from '@/store/api/endpoints/productEndpoints';
import { useParams } from 'react-router';

const EditProductPage = () => {
  const { productId } = useParams();

  const { data: product, isLoading } = useGetProductByIdQuery(productId!, { skip: !productId });

  const onSubmit = async (data: ProductFormData) => {
    console.log(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!product?.data) return <div>Product not found</div>;

  return (
    <div>
      <ProductForm
        mode="edit"
        onSubmit={onSubmit}
        initialValues={product?.data as ProductFormData}
        initialCategory={{
          id: 6,
          name: 'Mens Casual Shirt',
          layer: {
            base: 'Clothing & Fashion',
            first: 'Mens',
            second: 'Mens Top Wear',
            third: 'Mens Casual Shirt',
          },
        }}
      />
    </div>
  );
};

export default EditProductPage;
