import ProductForm from '@/features/products/components/ProductForm';
import type { ProductFormData } from '@/features/products/schema';
import { useGetProductByIdQuery } from '@/store/api/endpoints/productEndpoints';
import { useParams } from 'react-router';

const DuplicateProductPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(productId!, { skip: !productId });

  const onSubmit = async (data: ProductFormData) => {
    console.log(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!product?.data) return <div>Product not found</div>;

  const initialValues: ProductFormData = {
    ...product.data,
    variantDimensions: [
      {
        dimensionId: 'color',
        name: 'Color',
        options: [],
      },
    ],
    variantImages: [],
    variantCombinations: [],
  } as ProductFormData;

  return (
    <div>
      <ProductForm
        mode="edit"
        onSubmit={onSubmit}
        initialValues={initialValues}
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

export default DuplicateProductPage;
