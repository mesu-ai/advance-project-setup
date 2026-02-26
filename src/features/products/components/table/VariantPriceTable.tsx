import DeleteIcon from '@/assets/svg/DeleteIcon';
import Input from '@/components/atoms/Input';
import type { ProductFormData } from '@/pages/products/create';
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Controller, useFieldArray, useWatch, type Control } from 'react-hook-form';
import SellingPriceModal, { type PriceFormData } from '../modal/SellingPriceModal';
import Select from '@/components/atoms/Select';
import EditIcon from '@/assets/svg/EditIcon';

type VariantOption = { variantOptionId: number; variantOptionText: string };

interface VariantPriceTableProps {
  colors: VariantOption[];
  sizes?: VariantOption[];
  control: Control<ProductFormData>;
}

const getCombinationKey = (options: VariantOption[]): string => {
  return options
    .map((o) => o.variantOptionId)
    .sort((a, b) => a - b)
    .join('-');
};

const createCombination = (options: VariantOption[]) => ({
  sku: '',
  subStyle: '',
  stock: 0,
  dpPrice: 0,
  mrp: 0,
  sellingPrice: 0,
  sellingDate: '',
  burnAmount: 0,
  commissionAmount: 0,
  options: options,
});

const VariantPriceTable = ({ colors, sizes, control }: VariantPriceTableProps) => {
  const [activeFieldIndex, setActiveFieldIndex] = useState<number | null>(null);
  const { fields, replace, remove, update } = useFieldArray({
    control,
    name: 'variantCombinations',
  });

  const prevSignatureRef = useRef<string>('');
  const fieldsRef = useRef(fields);

  const watchCombinations = useWatch({ control, name: 'variantCombinations' });

  const grouped = fields.reduce<
    Record<number, { field: (typeof fields)[number]; fieldIndex: number }[]>
  >((acc, field, fieldIndex) => {
    const colorId = field.options?.[0]?.variantOptionId;

    if (!colorId) return acc;

    if (!acc[colorId]) acc[colorId] = [];

    acc[colorId].push({ field, fieldIndex });
    return acc;
  }, {});

  const handleSellingPriceReset = (index: number, sellingPrice: number = 0) => {
    if (index === null || index === undefined) return;
    const currField = fields[index];

    update(index, {
      ...currField,
      sellingPrice: sellingPrice,
      sellingDate: '',
      burnAmount: currField.mrp - sellingPrice,
      commissionAmount: sellingPrice - currField.dpPrice,
    });
  };

  const handleSellingPriceSubmit = (data: PriceFormData) => {
    if (activeFieldIndex === null) return;

    const currField = fields[activeFieldIndex];
    console.log(data, currField);
    update(activeFieldIndex, {
      ...currField,
      sellingPrice: data.sellingPrice,
      sellingDate: data.sellingDate,
      burnAmount: currField.mrp - data.sellingPrice,
      commissionAmount: data.sellingPrice - currField.dpPrice,
    });

    setActiveFieldIndex(null);
  };

  const handleUpdateThrough = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    console.log(e.target.value, index);
  };

  const expectedCombinations = useMemo(() => {
    if (!colors.length) return [];
    return sizes?.length
      ? colors.flatMap((color) => sizes.map((size) => ({ options: [color, size] })))
      : colors.map((color) => ({ options: [color] }));
  }, [colors, sizes]);

  const expectedSignatureKeys = useMemo(
    () =>
      expectedCombinations
        .map((combo) => getCombinationKey(combo.options))
        .sort()
        .join('|'),
    [expectedCombinations]
  );

  useEffect(() => {
    fieldsRef.current = fields;
  });

  useEffect(() => {
    if (!expectedCombinations.length) return;

    if (prevSignatureRef.current === expectedSignatureKeys) return;

    const currentSignatureKeys = fieldsRef.current
      .map((f) => getCombinationKey(f.options))
      .sort()
      .join('|');

    if (currentSignatureKeys === expectedSignatureKeys) return;

    const existingMap = new Map(fieldsRef.current.map((f) => [getCombinationKey(f.options), f]));

    const mergedCombinations = expectedCombinations.map((combo) => {
      const key = getCombinationKey(combo.options);

      return existingMap.get(key) ?? createCombination(combo.options);
    });

    replace(mergedCombinations);
    prevSignatureRef.current = expectedSignatureKeys;
  }, [expectedCombinations, expectedSignatureKeys, replace]);

  console.log({ fields, grouped, watchCombinations });

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto text-sm border-collapse">
          <thead className="whitespace-nowrap bg-background">
            <tr>
              {/* burn= mrp- selling
              discount= mrp - selling
              commission = selling -dp */}
              <th className="text-start font-medium py-2.5 px-3">Color Family</th>
              {sizes?.length ? <th className="text-start font-medium py-2.5 px-3">Size</th> : null}
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
              <th className="text-start font-medium py-2.5 px-3">Inventory Updated By </th>
              <th className="text-start font-medium py-2.5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {Object.entries(grouped).map(([, rows]) =>
              rows?.map(({ field, fieldIndex }, rowIndex) => {
                const color = field.options?.[0];
                const size = field.options?.[1];
                const showColorCell = rowIndex === 0;

                const activeField = watchCombinations[fieldIndex];
                const burnAmount = activeField?.mrp - activeField?.sellingPrice;
                const commissionAmount = activeField?.sellingPrice - activeField?.dpPrice;

                return (
                  <tr
                    key={fieldIndex}
                    className={`${showColorCell ? 'border-t border-neutral-300' : ''}`}
                  >
                    {showColorCell && (
                      <td
                        rowSpan={rows.length}
                        className="border-r border-neutral-300 px-3 pb-3 pt-3"
                      >
                        {color.variantOptionText}
                      </td>
                    )}
                    {sizes?.length ? (
                      <td className={`px-3 pb-3 ${rowIndex === 0 && 'pt-3'}`}>
                        {size?.variantOptionText}
                      </td>
                    ) : null}
                    <td className={`px-3 pb-3 ${rowIndex === 0 && 'pt-3'}`}>
                      <Controller
                        name={`variantCombinations.${fieldIndex}.sku`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="SKU/Barcode"
                            className="min-w-36 rounded py-1 mt-0"
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td className={`px-3 pb-3 ${rowIndex === 0 && 'pt-3'}`}>
                      <Controller
                        name={`variantCombinations.${fieldIndex}.subStyle`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="Sub-Style"
                            className="min-w-36 rounded py-1 mt-0"
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td className={`px-3 pb-3 ${rowIndex === 0 && 'pt-3'}`}>
                      <Controller
                        name={`variantCombinations.${fieldIndex}.stock`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="Stock"
                            className="min-w-24 rounded py-1 mt-0"
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td className={`px-3 pb-3 ${rowIndex === 0 && 'pt-3'}`}>
                      <Controller
                        name={`variantCombinations.${fieldIndex}.dpPrice`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="DP"
                            className="min-w-24 rounded py-1 mt-0"
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td className={`px-3 pb-3 ${rowIndex === 0 && 'pt-3'}`}>
                      <Controller
                        name={`variantCombinations.${fieldIndex}.mrp`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="MRP"
                            className="min-w-24 rounded py-1 mt-0"
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td className={`px-3 pb-3 ${rowIndex === 0 && 'pt-3'}`}>
                      {field.sellingPrice ? (
                        <div className="min-w-28 flex items-center border border-neutral-300 py-1 px-2 leading-normal rounded hover:bg-white-700">
                          <span>{field.sellingPrice}</span>
                          <button
                            type="button"
                            onClick={() => setActiveFieldIndex(fieldIndex)}
                            aria-label={`Edit-selling-price-${fieldIndex}`}
                            className="ms-auto cursor-pointer text-neutral-300 hover:text-secondary-500"
                          >
                            <EditIcon className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSellingPriceReset(fieldIndex)}
                            aria-label={`Edit-selling-price-${fieldIndex}`}
                            className="ms-1 cursor-pointer text-neutral-300 hover:text-danger-500"
                          >
                            <DeleteIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveFieldIndex(fieldIndex)}
                          className="w-fit cursor-pointer text-secondary-500 hover:text-secondary-600 text-sm font-medium"
                        >
                          Add Selling Price
                        </button>
                      )}
                    </td>
                    <td className={`px-3 pb-3 ${rowIndex === 0 && 'pt-3'}`}>
                      {/* burn= mrp- selling */}
                      <div className="border border-neutral-300 py-1 px-2 leading-normal rounded bg-white-700">
                        {burnAmount || 0}
                      </div>
                    </td>
                    <td className={`px-3 pb-3 ${rowIndex === 0 && 'pt-3'}`}>
                      {/* commission = selling -dp */}
                      <div className="border border-neutral-300 py-1 px-2 leading-normal rounded bg-white-700">
                        {commissionAmount || 0}
                      </div>
                    </td>
                    <td className={`px-3 pb-3 ${rowIndex === 0 && 'pt-3'}`}>
                      <Select
                        options={[
                          { label: 'Self', value: 'self' },
                          { label: 'Through API', value: 'api' },
                        ]}
                        optionKeys={{ label: 'label', value: 'value' }}
                        placeholder="Select"
                        className="rounded py-1 mt-0"
                        onChange={(e) => handleUpdateThrough(e, fieldIndex)}
                      />
                    </td>
                    <td className={`text-neutral-300 px-3 pb-3 ${rowIndex === 0 && 'pt-3'}`}>
                      <button
                        type="button"
                        onClick={() => remove(fieldIndex)}
                        className="cursor-pointer hover:text-danger-500"
                        aria-label={`Delete varient-${fieldIndex}`}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* <DataTable
          header={[
            'Color Family',
            'Size',
            'SKU/Barcode',
            'Sub-Style',
            'Stock',
            'DP(৳)',
            'MRP(৳)',
            'Selling Price(৳)',
            'Burn/Disc.(৳)',
            'Commission(৳)',
            'Inventory Updated By',
            'Action',
          ]}
        >
          {Object.entries(grouped).map(([, rows]) =>
            rows?.map(({ field, fieldIndex }, rowIndex) => {
              const color = field.options?.[0];
              const size = field.options?.[1];
              const showColorCell = rowIndex === 0;

              return (
                <tr key={fieldIndex} className={showColorCell ? 'border-t border-neutral-300' : ''}>
                  {showColorCell && (
                    <td rowSpan={rows.length} className="px-4 py-3 border-r border-neutral-300">
                      {color.variantOptionText}
                    </td>
                  )}
                  {sizes?.length ? <td className="px-4 py-3">{size?.variantOptionText}</td> : null}
                  <td className="px-4 py-3">
                    <Controller
                      name={`variantCombinations.${fieldIndex}.sku`}
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="SKU/Barcode" className="min-w-36" {...field} />
                      )}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Controller
                      name={`variantCombinations.${fieldIndex}.subStyle`}
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Sub-Style" className="min-w-36" {...field} />
                      )}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Controller
                      name={`variantCombinations.${fieldIndex}.stock`}
                      control={control}
                      render={({ field }) => <Input placeholder="Stock" {...field} />}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Controller
                      name={`variantCombinations.${fieldIndex}.dpPrice`}
                      control={control}
                      render={({ field }) => <Input placeholder="DP" {...field} />}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Controller
                      name={`variantCombinations.${fieldIndex}.mrp`}
                      control={control}
                      render={({ field }) => <Input placeholder="MRP" {...field} />}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setPriceOpen(true)}
                      className="w-fit cursor-pointer text-secondary-500 hover:text-secondary-600 text-sm font-medium"
                    >
                      Add Selling Price
                    </button>

                    <Controller
                      name={`variantCombinations.${fieldIndex}.sellingPrice`}
                      control={control}
                      render={({ field }) => <Input placeholder="DP" {...field} />}
                    />
                  </td>
                  <td className="px-4 py-3">20</td>
                  <td className="px-4 py-3">20</td>
                  <td className="px-4 py-3">Self</td>
                  <td className="px-4 py-3 text-neutral-300">
                    <button
                      type="button"
                      onClick={() => remove(fieldIndex)}
                      className="cursor-pointer hover:text-danger-500"
                      aria-label={`Delete varient-${fieldIndex}`}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </DataTable> */}
      </div>
      {activeFieldIndex !== null && (
        <SellingPriceModal
          isOpen={activeFieldIndex !== null}
          onClose={() => setActiveFieldIndex(null)}
          onSubmit={handleSellingPriceSubmit}
          initialValues={{
            sellingPrice: fields[activeFieldIndex].sellingPrice,
            sellingDate: fields[activeFieldIndex].sellingDate,
          }}
        />
      )}
    </>
  );
};

export default VariantPriceTable;
