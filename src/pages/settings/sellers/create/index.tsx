import SellerForm from '@/features/seller/components/SellerForm';
import type { SellerFormData } from '@/features/seller/schema';

const CreateSellerPage = () => {
  const onSubmit = async (data: SellerFormData) => {
    console.log({ data });
  };

  return (
    <div>
      <h1 className="heading-1">Add New Seller</h1>
      <div className="mt-3">
        <SellerForm mode="create" onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CreateSellerPage;
