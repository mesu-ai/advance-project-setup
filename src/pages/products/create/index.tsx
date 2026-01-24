import ArrowIcon from '@/assets/svg/ArrowIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import SearchBar from '@/components/molecules/SearchBar';
import { useGetCategoriesQuery } from '@/store/api/endpoints/categoryEndpoints';
import type { CategoryT, FirstChildT, SecondChildT, ThirdChildT } from '@/types/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Editor from 'textcrafter';
import * as z from 'zod';

const productSchema = z.object({
  name: z.string().min(3, 'Product name is required'),
  categoryId: z.string().min(1, 'Category is required'),
  description: z.string().min(3, 'Description is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

const CreateProductPage = () => {
  const [editorContent, setEditorContent] = useState('');

  const [firstChild, setFirstChild] = useState<FirstChildT[]>([]);
  const [secondChild, setSecondChild] = useState<SecondChildT[]>([]);
  const [thirdChild, setThirdChild] = useState<ThirdChildT[]>([]);
  const [selectedCategory, setSelectedCategory] = useState({
    base: '',
    first: '',
    second: '',
    third: '',
  });

  const { data: categoies, isLoading } = useGetCategoriesQuery('Categories');
  console.log({ categoies, isLoading });

  const handleBaseCategory = (category: CategoryT) => {
    setFirstChild(category.firstChildren);
    setSelectedCategory(() => ({ base: category.categoryName, first: '', second: '', third: '' }));
    setSecondChild([]);
    setThirdChild([]);
  };

  const handleFirstChild = (category: FirstChildT) => {
    setSecondChild(category.secondChildren);
    setSelectedCategory((prev) => ({
      ...prev,
      first: category.categoryName,
      second: '',
      third: '',
    }));
    setThirdChild([]);
  };

  const handleSecondChild = (category: SecondChildT) => {
    setThirdChild(category.thirdChild);
    setSelectedCategory((prev) => ({ ...prev, second: category.categoryName, third: '' }));
  };

  const handleThirdChild = (category: ThirdChildT) => {
    setSelectedCategory((prev) => ({ ...prev, third: category.categoryName }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({ resolver: zodResolver(productSchema) });

  const onSubmit = (data: ProductFormData) => {
    console.log({ data });
  };

  // const onSelect=()=>console.log()

  console.log({ isSubmitting, selectedCategory });

  return (
    <div>
      <h1 className="heading-1">Add New Product</h1>
      <div className="mt-3 flex gap-5">
        <div className="flex-1 bg-surface rounded-xl border border-border px-5 py-4">
          <h2 className="text-lg font-bold">Basic Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Product Name"
              placeholder="EX. Men's Stylish Casual Shirt"
              error={errors.name?.message}
              {...register('name')}
            />

            {/* <Select
              label="Product Category"
              options={[{ label: 'Shirt', value: 'shirt' }]}
              error={errors.category?.message}
              {...register('category')}
            /> */}
            <div className="">
              <Input
                label="Product Category"
                placeholder="Please Select Category or Search Here"
                error={errors.name?.message}
                disabled
                className=""
                {...register('categoryId')}
              />

              <div className="mt-3 border border-neutral-300 p-5 rounded-xl space-y-4">
                <div>
                  <SearchBar />
                </div>
                <div className="text-sm flex items-center gap-4">
                  <p>Recently Used:</p>
                  <ul className="text-neutral-300 flex gap-4">
                    <li className="rounded px-2 py-0.5 bg-white-600 w-fit">Casual Shirt</li>
                    <li className="rounded px-2 py-0.5 bg-white-600 w-fit">Casual Shirt</li>
                    <li className="rounded px-2 py-0.5 bg-white-600 w-fit">Casual Shirt</li>
                    <li className="rounded px-2 py-0.5 bg-white-600 w-fit">Casual Shirt</li>
                  </ul>
                </div>
                <div className="text-sm border border-neutral-300 rounded-lg grid grid-cols-4 divide-x divide-neutral-300">
                  <div className="">
                    <SearchBar className="rounded-none border-0 border-b border-neutral-300" />
                    <ul className="max-h-[320px] overflow-y-auto">
                      {categoies?.data?.map((category: CategoryT) => {
                        const isSelected = selectedCategory?.base === category.categoryName;

                        return (
                          <li
                            role="button"
                            key={category.categoryId}
                            onClick={() => handleBaseCategory(category)}
                            className={`flex justify-between py-1.5 px-3 hover:bg-primary-50 hover:text-primary-500 ${isSelected && 'bg-primary-50 text-primary-500'}`}
                          >
                            {category?.categoryName} <ArrowIcon className="w-4 h-4 rotate-90" />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <SearchBar
                      className="rounded-none border-0 border-b border-neutral-300"
                      disabled={!firstChild.length}
                    />
                    <ul className="max-h-[320px] overflow-y-auto">
                      {firstChild?.map((category: FirstChildT) => {
                        const isSelected = selectedCategory?.first === category.categoryName;
                        return (
                          <li
                            role="button"
                            key={category.categoryId}
                            onClick={() => handleFirstChild(category)}
                            className={`flex justify-between py-1.5 px-3 hover:bg-primary-50 hover:text-primary-500 ${isSelected && 'bg-primary-50 text-primary-500'}`}
                          >
                            {category?.categoryName}
                            {category.secondChildren.length > 0 && (
                              <ArrowIcon className="w-4 h-4 rotate-90" />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <SearchBar
                      className="rounded-none border-0 border-b border-neutral-300"
                      disabled={!secondChild.length}
                    />
                    <ul className="max-h-[320px] overflow-y-auto">
                      {secondChild?.map((category: SecondChildT) => {
                        const isSelected = selectedCategory?.second === category.categoryName;
                        return (
                          <li
                            role="button"
                            key={category.categoryId}
                            onClick={() => handleSecondChild(category)}
                            className={`flex justify-between py-1.5 px-3 hover:bg-primary-50 hover:text-primary-500 ${isSelected && 'bg-primary-50 text-primary-500'}`}
                          >
                            {category?.categoryName}{' '}
                            {category.thirdChild.length > 0 && (
                              <ArrowIcon className="w-4 h-4 rotate-90" />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <SearchBar
                      className="rounded-none border-0 border-b border-neutral-300"
                      disabled={!thirdChild.length}
                    />
                    <ul className="max-h-[320px] overflow-y-auto">
                      {thirdChild?.map((category: ThirdChildT) => {
                        const isSelected = selectedCategory?.third === category.categoryName;
                        return (
                          <li
                            role="button"
                            key={category.categoryId}
                            onClick={() => handleThirdChild(category)}
                            className={`flex justify-between py-1.5 px-3 hover:bg-primary-50 hover:text-primary-500 ${isSelected && 'bg-primary-50 text-primary-500'}`}
                          >
                            {category?.categoryName}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div>
                  <p>
                    Selected Category :{' '}
                    {selectedCategory?.base ? (
                      <span className="px-2.5 py-1 rounded bg-secondary-500 text-white text-sm">
                        {selectedCategory?.base && `${selectedCategory.base}`}{' '}
                        {selectedCategory?.first && `> ${selectedCategory.first}`}{' '}
                        {selectedCategory?.second && `> ${selectedCategory.second}`}{' '}
                        {selectedCategory?.third && `> ${selectedCategory?.third}`}
                      </span>
                    ) : (
                      '---'
                    )}
                  </p>
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="cancel">Cancel</Button>
                  <Button variant="confirm" disabled={!selectedCategory?.base}>
                    Confirm
                  </Button>
                </div>
              </div>
            </div>

            <div></div>

            <div>
              <label className="">
                Description <span className="text-danger-500">*</span>
              </label>
              <Editor
                value={editorContent}
                onChange={setEditorContent}
                toolbarClassName="custom-toolbar"
                editorClassName="custom-editor"
              />
            </div>
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
