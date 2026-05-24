import BrandForm from '@/features/brands/components/BrandForm';
import type { BrandFormData } from '@/features/brands/schema';
import { useGetBrandByIdQuery } from '@/store/api/endpoints/brandEndpoints';

import { useParams } from 'react-router';

const EditBrandPage = () => {
  const { brandId } = useParams();
  const { data: brand, isLoading } = useGetBrandByIdQuery(brandId!, { skip: !brandId });

  const onSubmit = async (data: BrandFormData) => {
    console.log({ data });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!brand?.data) return <div>Brand not found</div>;

  return (
    <div>
      <h1 className="heading-1">Edit Brand</h1>
      <div className="mt-3">
        <BrandForm mode="edit" onSubmit={onSubmit} initialValues={brand?.data as BrandFormData} />
      </div>
    </div>
  );
};

export default EditBrandPage;
