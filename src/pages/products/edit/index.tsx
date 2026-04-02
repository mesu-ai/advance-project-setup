import ProductForm from '@/features/products/components/ProductForm';
import type { ProductFormData } from '@/features/products/schema';

const EditProductPage = () => {
  //    {
  //        "id": 6,
  //        "name": "Mens Casual Shirt",
  //        "layer": {
  //            "base": "Clothing & Fashion",
  //            "first": "Mens",
  //            "second": "Mens Top Wear",
  //            "third": "Mens Casual Shirt"
  //        }
  //    }

  //   const productData: ProductFormData = {
  //     description: '',
  //     specification: '',
  //     thumbnailImages: [
  //       'https://prod.saraemart.com/uploads/images/e26107e8-992c-4d5f-845a-b3328a6a00c5.png',
  //       'https://prod.saraemart.com/uploads/images/979a4366-b217-43d0-a7f9-1245b8ae9eb4.png',
  //       'https://prod.saraemart.com/uploads/images/ba8cf1fa-442d-43f6-8128-6426053f1dad.jpg',
  //       'https://prod.saraemart.com/uploads/images/89d781cf-0e16-4ede-a0ad-ad63e1a63a5e.jpg',
  //       'https://prod.saraemart.com/uploads/images/b012a4a9-dc68-4788-9415-ff8d38327768.jpg',
  //     ],
  //     variantDimensions: [
  //       {
  //         dimensionId: 'color',
  //         name: 'Color',
  //         options: [
  //           { variantOptionId: 425, variantOptionText: 'Green' },
  //           { variantOptionId: 426, variantOptionText: 'Ash' },
  //         ],
  //       },
  //       {
  //         dimensionId: 'size',
  //         name: 'Size',
  //         options: [
  //           { variantOptionId: 442, variantOptionText: 'XS' },
  //           { variantOptionId: 443, variantOptionText: 'S' },
  //         ],
  //       },
  //     ],
  //     variantImages: [
  //       {
  //         variantOptionId: 425,
  //         variantOptionText: 'Green',
  //         images: [
  //           'https://prod.saraemart.com/uploads/images/e26107e8-992c-4d5f-845a-b3328a6a00c5.png',
  //           'https://prod.saraemart.com/uploads/images/979a4366-b217-43d0-a7f9-1245b8ae9eb4.png',
  //           'https://prod.saraemart.com/uploads/images/ba8cf1fa-442d-43f6-8128-6426053f1dad.jpg',
  //         ],
  //       },
  //       {
  //         variantOptionId: 426,
  //         variantOptionText: 'Ash',
  //         images: [
  //           'https://prod.saraemart.com/uploads/images/e26107e8-992c-4d5f-845a-b3328a6a00c5.png',
  //           'https://prod.saraemart.com/uploads/images/979a4366-b217-43d0-a7f9-1245b8ae9eb4.png',
  //           'https://prod.saraemart.com/uploads/images/ba8cf1fa-442d-43f6-8128-6426053f1dad.jpg',
  //         ],
  //       },
  //     ],

  //     // burn= mrp- selling
  //     // discount= mrp - selling
  //     // commission = selling -dp
  //     variantCombinations: [
  //       // {
  //       //   sku: 'dsewes',
  //       //   subStyle: 'dffrr',
  //       //   stock: 20,
  //       //   dpPrice: 500,
  //       //   mrp: 700,
  //       //   sellingPrice: 600,
  //       //   sellingDate: '2026-03-17T19:14',
  //       //   burnAmount: 100,
  //       //   commissionAmount: 100,
  //       //   options: [
  //       //     { variantOptionId: 425, variantOptionText: 'Green' },
  //       //     { variantOptionId: 442, variantOptionText: 'XS' },
  //       //   ],
  //       // },
  //       // {
  //       //   sku: 'aas',
  //       //   subStyle: 'ddeet',
  //       //   stock: 50,
  //       //   dpPrice: 300,
  //       //   mrp: 400,
  //       //   sellingPrice: 350,
  //       //   sellingDate: '2026-02-28T04:12',
  //       //   burnAmount: 50,
  //       //   commissionAmount: 50,
  //       //   options: [
  //       //     { variantOptionId: 425, variantOptionText: 'Green' },
  //       //     { variantOptionId: 443, variantOptionText: 'S' },
  //       //   ],
  //       // },
  //     ],
  //   };

  const onSubmit = async (data: ProductFormData) => {
    console.log(data);
  };

  return (
    <div>
      <ProductForm mode="edit" onSubmit={onSubmit} />
    </div>
  );
};

export default EditProductPage;
