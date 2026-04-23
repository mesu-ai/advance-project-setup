import SellerForm from '@/features/sellers/components/SellerForm';
import type { SellerFormData } from '@/features/sellers/schema';
import { useGetSellerByIdQuery } from '@/store/api/endpoints/sellerEndpoints';
import { useParams } from 'react-router';

const EditSellerPage = () => {
  const { sellerId } = useParams();

  const { data: seller, isLoading } = useGetSellerByIdQuery(sellerId!, { skip: !sellerId });

  const onSubmit = async (data: SellerFormData) => {
    console.log(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!seller?.data) return <div>Product not found</div>;

  return (
    <div>
      <h1 className="heading-1">Edit Seller</h1>
      <div className="mt-3">
        <SellerForm
          mode="create"
          onSubmit={onSubmit}
          initialValues={seller.data as SellerFormData}
        />
      </div>
    </div>
  );
};

export default EditSellerPage;
