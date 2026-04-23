import SellerForm from '@/features/sellers/components/SellerForm';
import type { SellerFormData } from '@/features/sellers/schema';

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
