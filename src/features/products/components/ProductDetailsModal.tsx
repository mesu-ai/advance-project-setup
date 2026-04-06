import { productSections } from '@/assets/data/products';
import RatingIcon from '@/assets/svg/RatingIcon';
import Image from '@/components/atoms/Image';
import Modal from '@/components/organisms/Modal/Modal';
import { cn } from '@/lib/cn';
import { useGetProductByIdQuery } from '@/store/api/endpoints/productEndpoints';
import type { ProductT } from '@/types';
import { useState } from 'react';

const ListItem = ({ label, value }: { label: string; value?: string }) => (
  <p>
    <span className="font-medium">{label} : </span>
    <span>{value}</span>
  </p>
);

const BasisInfoSection = (product: ProductT) => (
  <div className="px-5">
    {/* main info */}
    <div className="pb-5 border-b border-white-700">
      <h2 className="heading-2 mb-2">Main Info</h2>
      <div className="space-y-2 text-sm">
        <ListItem label="Product Name" value={product.productName} />
        <ListItem
          label="Product Category"
          value="Clothing & Fashion > Men's > Men's Top Wear > Single Ethnic"
        />
        <div className="grid grid-cols-4 gap-4">
          <ListItem label="Product Quantity Unit" value={product.unit} />
          <ListItem label="Shop Name" value="SaRa Lifestyle Ltd" />
          <ListItem label="Display Order" value={product.displayOrder} />
          <p className="flex items-center gap-2">
            <span className="font-medium">Review/Rating:</span>
            <span className="flex items-center gap-1">
              <RatingIcon className="w-5 h-5" />
              <span>4.1/5 (12)</span>
            </span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Product Created By : </span>
            <span>Abdullah Al Momin </span>
            <span className="bg-secondary-50 text-secondary-500 px-2.5 py-1 rounded-md ml-1">
              11.10.2025 10.15 am
            </span>
          </p>
          <p>
            <span className="font-medium">Product Last Updated By : </span>
            <span>Abdullah Al Momin </span>
            <span className="bg-secondary-50 text-secondary-500 px-2.5 py-1 rounded-md ml-1">
              11.11.2025 09.15 am
            </span>
          </p>
        </div>
      </div>
    </div>

    {/* images */}
    <div className="py-5 border-b border-white-700">
      <h2 className="heading-2 mb-2">Images</h2>
      <div className="flex gap-4">
        {product.thumbnailImages.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="Product Image"
            className="rounded-lg"
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>

    {/* brand and attributes */}
    <div className="py-5 border-b border-white-700">
      <h2 className="heading-2 mb-2">Brand & Attributes</h2>
      <div className="grid grid-cols-4 gap-x-4 gap-y-2 text-sm">
        <ListItem label="Product Brand" value="SaRa LifeStyle Ltd" />
        <ListItem label="Fabric" value="Value 1" />
        <ListItem label="Fit Type" value="Value 2" />
        <ListItem label="Product Type" value="Value 3" />
        <ListItem label="Length" value="Value 4" />
        <ListItem label="Sleeve" value="Value 4" />
        <ListItem label="Addition" value="Value 5" />
        <ListItem label="Gender" value="Value 6" />
      </div>
    </div>

    {/* Warranty & Package */}
    <div className="py-5 border-b border-white-700">
      <h2 className="heading-2 mb-2">Warranty & Package</h2>
      <div className="grid grid-cols-4 gap-x-4 gap-y-2 text-sm">
        <ListItem label="Warranty Type" value="No Warranty" />
        <ListItem label="Warranty Period" value="0" />
        <ListItem label="Package Weight (kg)" value="0.5" />
        <ListItem label="Package Length (cm)" value="10" />
        <ListItem label="Package Width (cm)" value="15" />
        <ListItem label="Package Height (cm)" value="5" />
      </div>
    </div>

    {/* URL */}
    <div className="pt-5">
      <h2 className="heading-2 mb-2">URL</h2>
      <div className="text-sm grid grid-cols-2 gap-4">
        <ListItem label="Product URL Slug" value={product.productUrl} />
        <ListItem label="Video URL" value={product.videoUrl} />
      </div>
    </div>
  </div>
);

const VariantsSection = (product: ProductT) => {
  const hasSize = product.variantDimensions.some((dim) => dim.dimensionId === 'size');

  const grouped = product.variantCombinations?.reduce<
    Record<number, { field: (typeof product.variantCombinations)[number]; fieldIndex: number }[]>
  >((acc, field, fieldIndex) => {
    const colorId = field.options?.[0]?.variantOptionId;

    if (!colorId) return acc;
    if (!acc[colorId]) acc[colorId] = [];

    acc[colorId].push({ field, fieldIndex });
    return acc;
  }, {});

  return (
    <div className="px-5 space-y-4">
      {/* variant color wise images */}
      <div className="space-y-4">
        {product.variantImages?.map((variant, index) => (
          <div
            key={index}
            className="relative min-h-[60px] border border-dashed border-neutral-300 text-sm leading-normal rounded-lg px-2 py-[6.5px]"
          >
            <p
              className={`capitalize ${
                variant?.images &&
                variant?.images?.length < 10 &&
                'absolute left-2 top-1/2 -translate-y-1/2'
              }`}
            >
              <span className="text-neutral-300">Color : </span> {variant.variantOptionText}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {variant.images?.map((img, index) => (
                <div
                  key={index}
                  className="size-10 border border-white-700 rounded grid place-items-center"
                >
                  <Image src={img} alt={`img-${index}`} className="rounded aspect-square" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* variants combinations */}
      <div className="border border-neutral-300 rounded-lg overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="table-auto text-sm border-collapse">
            <thead className="whitespace-nowrap bg-background">
              <tr>
                <th className="text-start font-medium py-2.5 px-3">Color</th>
                {hasSize && <th className="text-start font-medium py-2.5 px-3">Size</th>}
                <th className="text-start font-medium py-2.5 px-3">SKU/Barcode</th>
                <th className="text-start font-medium py-2.5 px-3">Sub-Style</th>
                <th className="text-start font-medium py-2.5 px-3">Stock</th>
                <th className="text-start font-medium py-2.5 px-3">
                  DP (<span className="text-lg">৳</span>)
                </th>
                <th className="text-start font-medium py-2.5 px-3">
                  MRP(<span className="text-lg">৳</span>)
                </th>
                <th className="text-start font-medium py-2.5 px-3">
                  Selling Price(<span className="text-lg">৳</span>)
                </th>
                <th className="text-start font-medium py-2.5 px-3">
                  Burn/Disc.(<span className="text-lg">৳</span>)
                </th>
                <th className="text-start font-medium py-2.5 px-3">
                  Commission(<span className="text-lg">৳</span>)
                </th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {Object.entries(grouped).map(([, rows]) =>
                rows?.map(({ field, fieldIndex }, rowIndex) => {
                  const color = field.options?.[0];
                  const size = field.options?.[1];
                  const showColorCell = rowIndex === 0;

                  const isFirstRow = rowIndex === 0;
                  const isLastRow = rowIndex === rows.length - 1;
                  const rowPadding = cn({ 'pt-3': isFirstRow, 'pb-3': isLastRow });

                  return (
                    <tr
                      key={fieldIndex}
                      className={`${
                        field?.status === 'N' &&
                        (showColorCell
                          ? ' [&>td:not(:first-child)]:bg-white-700 dark:[&>td:not(:first-child)]:bg-black-300'
                          : 'bg-white-700 dark:bg-black-300')
                      } 
                      ${showColorCell ? 'border-t border-neutral-300' : ''}`}
                    >
                      {showColorCell && (
                        <td
                          rowSpan={rows.length}
                          className="border-r border-neutral-300 px-3 py-1.5 bg-surface"
                        >
                          {color.variantOptionText}
                        </td>
                      )}
                      {hasSize && (
                        <td className={`px-3 py-1.5 ${rowPadding}`}>{size?.variantOptionText}</td>
                      )}
                      <td className={`px-3 py-1.5 ${rowPadding}`}>
                        <div className="min-w-36 border border-neutral-300 py-1 px-2 leading-normal rounded">
                          {field.sku}
                        </div>
                      </td>
                      <td className={`px-3 py-1.5 ${rowPadding}`}>
                        <div className="min-w-36 border border-neutral-300 py-1 px-2 leading-normal rounded">
                          {field.subStyle}
                        </div>
                      </td>
                      <td className={`px-3 py-1.5 ${rowPadding}`}>
                        <div className="min-w-24 border border-neutral-300 py-1 px-2 leading-normal rounded">
                          {field.stock}
                        </div>
                      </td>
                      <td className={`px-3 py-1.5 ${rowPadding}`}>
                        <div className="min-w-24 border border-neutral-300 py-1 px-2 leading-normal rounded">
                          {field.dpPrice}
                        </div>
                      </td>
                      <td className={`px-3 py-1.5 ${rowPadding}`}>
                        <div className="min-w-24 border border-neutral-300 py-1 px-2 leading-normal rounded">
                          {field.mrp}
                        </div>
                      </td>
                      <td className={`px-3 py-1.5 ${rowPadding}`}>
                        <div className="min-w-24 border border-neutral-300 py-1 px-2 leading-normal rounded">
                          {field.sellingPrice}
                        </div>
                      </td>
                      <td className={`px-3 py-1.5 ${rowPadding}`}>
                        {/* burn= mrp- selling */}
                        <div className="min-w-24 border border-neutral-300 py-1 px-2 leading-normal rounded ">
                          {field.burnAmount || 0}
                        </div>
                      </td>
                      <td className={`px-3 py-1.5 ${rowPadding}`}>
                        {/* commission = selling -dp */}
                        <div className="min-w-24 border border-neutral-300 py-1 px-2 leading-normal rounded ">
                          {field.commissionAmount || 0}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProductInfoSection = (product: ProductT) => (
  <div className="px-5">
    <div className="pb-5 border-b border-white-700">
      <h2 className="heading-2 mb-2">Product Description</h2>
      <div
        className="border border-neutral-300 p-3 rounded-lg min-h-[120px]"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
    </div>
    <div className="pt-5">
      <h2 className="heading-2 mb-2">Product Specification</h2>
      <div
        className="border border-neutral-300 p-3 rounded-lg min-h-[120px]"
        dangerouslySetInnerHTML={{ __html: product.specification }}
      />
    </div>
  </div>
);

const ReturnPolicySection = (product: ProductT) => (
  <div className="px-5 space-y-4">
    <h2 className="mb-2">
      <span className="heading-2">Return Duration :</span> {product.returnDuration} Days
    </h2>
    <div>
      <h2 className="heading-2 mb-2">Return Policy</h2>
      <div
        className="border border-neutral-300 p-3 rounded-lg min-h-[120px]"
        dangerouslySetInnerHTML={{ __html: product.returnPolicy ?? '' }}
      />
    </div>
  </div>
);

const MetadataSection = (product: ProductT) => (
  <div className="px-5">
    <div className="pb-5 border-b border-white-700">
      <h2 className="heading-2 mb-2">Meta Info</h2>
      <div className="text-sm space-y-2">
        <ListItem label="Meta Title" value={product.metaTitle} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <ListItem label="Meta Keywords" />
            <p className="mt-2 border border-neutral-300 rounded-lg p-3 h-[120px] overflow-y-auto">
              {product.metaKeywords}
            </p>
          </div>
          <div>
            <ListItem label="Meta Description" />
            <p className="mt-2 border border-neutral-300 rounded-lg p-3 h-[120px] overflow-y-auto">
              {product.metaDescription}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="pt-5">
      <h2 className="heading-2 mb-2">OG Info</h2>
      <div className="text-sm space-y-2">
        <div className="grid grid-cols-4 gap-4">
          <ListItem label="OG Title" value={product.ogTitle} />
          <ListItem label="OG URL" value={product.ogUrl} />
          <ListItem label="OG Type" value={product.ogType} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <ListItem label="OG Description" />
            <p className="mt-2 border border-neutral-300 rounded-lg p-3 h-[120px] overflow-y-auto">
              {product.ogDescription}
            </p>
          </div>

          <div>
            <ListItem label="OG Image" />
            <div className="mt-2 border border-dashed border-neutral-300 rounded-lg p-3 h-[120px]">
              {product.ogImage ? (
                <Image
                  src={
                    typeof product.ogImage === 'string'
                      ? product.ogImage
                      : URL.createObjectURL(product.ogImage)
                  }
                  alt="OG Image"
                  className="h-full object-contain"
                />
              ) : // <p className="text-muted-foreground">No OG image available</p>
              null}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
}

const ProductDetailsModal = ({ isOpen, onClose, productId }: ProductDetailsModalProps) => {
  const [activeSection, setActiveSection] = useState<string>('basisInfo');

  const { data: product, isLoading } = useGetProductByIdQuery(String(productId)!, {
    skip: !productId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!product?.data) return <div>Product not found</div>;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product View" className="w-[1200px]">
      <div role="tablist" className="px-5 pb-4 flex gap-8 font-medium">
        {productSections.map((sec) => {
          const isActive = activeSection === sec.key;

          return (
            <button
              key={sec.key}
              aria-selected={isActive}
              onClick={() => setActiveSection(sec.key)}
              className={`relative group transition-all duration-300 ease-linear cursor-pointer ${
                isActive
                  ? 'text-primary-500 after:absolute after:top-full after:left-0 after:bg-primary-500 after:h-[2px] after:content-[""] after:w-6'
                  : 'text-neutral-300 hover:text-secondary-500'
              }`}
            >
              {sec.name}
            </button>
          );
        })}
      </div>
      <div className="h-[60vh] overflow-y-auto">
        {activeSection === 'basisInfo' && BasisInfoSection(product.data)}
        {activeSection === 'variants' && VariantsSection(product.data)}
        {activeSection === 'productInfo' && ProductInfoSection(product.data)}
        {activeSection === 'returnPolicy' && ReturnPolicySection(product.data)}
        {activeSection === 'metadata' && MetadataSection(product.data)}
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
