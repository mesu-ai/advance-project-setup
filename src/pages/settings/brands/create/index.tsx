import BrandForm from '@/features/brands/components/BrandForm';
import type { BrandFormData } from '@/features/brands/schema';

const BrandCreatePage = () => {
  const onSubmit = async (data: BrandFormData) => {
    console.log({ data });
  };

  return (
    <div>
      <h1 className="heading-1">Add New Brand</h1>
      <div className="mt-3">
        <BrandForm mode="create" onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default BrandCreatePage;
