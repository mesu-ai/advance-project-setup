import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const productSchema = z.object({
  name: z.string().min(3, 'Product name is required'),
  category: z.string().min(1, 'category is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

const CreateProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({ resolver: zodResolver(productSchema) });

  const onSubmit = (data: ProductFormData) => {
    console.log({ data });
  };

  console.log({ isSubmitting });

  return (
    <div>
      <h1 className="heading-1">Add New Product</h1>
      <div className="mt-3 flex gap-5">
        <div className="flex-1 bg-surface rounded-xl border border-border px-5 py-4">
          <h2 className="text-lg font-bold">Basic Information</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Product Name"
              placeholder="EX. Men's Stylish Casual Shirt"
              error={errors.name?.message}
              {...register('name')}
            />
            <Select
              label="Product Category"
              options={[{ label: 'Shirt', value: 'shirt' }]}
              error={errors.category?.message}
              {...register('category')}
            />
          </form>
        </div>
        <div className="bg-surface rounded-xl border border-border px-5 py-4 w-[212px]">
          <h2 className="text-lg font-bold text-primary-500">Basic Information</h2>
          <p className="text-sm mt-3">
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their still
            in their infancy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
