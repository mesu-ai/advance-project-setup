import DeleteIcon from '@/assets/svg/DeleteIcon';
import Input from '@/components/atoms/Input';
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Controller, useFieldArray, useWatch, type Control } from 'react-hook-form';
import SellingPriceModal, { type PriceFormData } from './ProductSellingPriceModal';
import Select from '@/components/atoms/Select';
import EditIcon from '@/assets/svg/EditIcon';
import { calculateBurn, calculateCommission } from '../utils/priceHelpers';
import Switch from '@/components/atoms/Switch';
import type { ProductFormData } from '../schema';
import type { VariantOptionT } from '../types';
import { getCombinationKey, shopProductSkuGenerator } from '../utils/variantHelpers';
import { useGetInventoryStockMutation } from '@/store/api/endpoints/inventoryEndpoints';
import { useApiError } from '@/hooks/useApiError';
import toast from 'react-hot-toast';
import { cn } from '@/lib/cn';

interface VariantPriceTableProps {
  colors: VariantOptionT[];
  sizes?: VariantOptionT[];
  control: Control<ProductFormData>;
}

const createCombination = (options: VariantOptionT[]) => ({
  sku: '',
  shopProductSku: shopProductSkuGenerator(options),
  subStyle: '',
  stock: undefined,
  dpPrice: undefined,
  mrp: undefined,
  sellingPrice: undefined,
  startDate: undefined,
  endDate: undefined,
  burnAmount: 0,
  commissionAmount: undefined,
  options: options,
  inventoryTypeId: 1,
  status: 'Y' as const,
});

const ProductVariantPriceTable = ({ colors, sizes, control }: VariantPriceTableProps) => {
  const [activeFieldIndex, setActiveFieldIndex] = useState<number | null>(null);
  const { fields, replace, update } = useFieldArray({
    control,
    name: 'variantCombinations',
  });

  const watchCombinations = useWatch({ control, name: 'variantCombinations' });

  const prevSignatureRef = useRef<string>('');
  // ✅ Tracks live store values (not the stale `fields` snapshot)
  const watchCombinationsRef = useRef(watchCombinations);

  const { handleApiError } = useApiError();
  const [checkInventory] = useGetInventoryStockMutation();

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

    const currField = watchCombinations[index];

    const dpPrice = Number(currField.dpPrice) || 0;
    const mrp = Number(currField.mrp) || 0;

    update(index, {
      ...currField,
      sellingPrice: sellingPrice,
      startDate: undefined,
      endDate: undefined,
      burnAmount: mrp - sellingPrice,
      // commissionAmount: sellingPrice - dpPrice,
      commissionAmount: mrp - dpPrice,
    });
  };

  const handleSellingPriceSubmit = (data: PriceFormData) => {
    if (activeFieldIndex === null) return;

    const currField = watchCombinations[activeFieldIndex];
    const dpPrice = Number(currField.dpPrice) || 0;
    const mrp = Number(currField.mrp) || 0;
    const sellingPrice = Number(data.sellingPrice) || 0;

    update(activeFieldIndex, {
      ...currField,
      sellingPrice: sellingPrice,
      startDate: data.startDate,
      endDate: data.endDate,
      burnAmount: mrp - sellingPrice,
      commissionAmount: sellingPrice - dpPrice,
    });

    setActiveFieldIndex(null);
  };

  const handleUpdateBy = async (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    const inventoryTypeId = Number(e.target.value);
    const currField = watchCombinations[index];

    if (!currField.sku) return toast.error('Invalid SKU/Barcode');

    try {
      if (inventoryTypeId === 1) {
        update(index, {
          ...currField,
          subStyle: '',
          stock: undefined,
          dpPrice: undefined,
          mrp: undefined,
          sellingPrice: undefined,
          startDate: '',
          endDate: '',
          inventoryTypeId,
        });
        return;
      }

      const { data } = await checkInventory({ sellerProductSku: currField.sku });

      if (!data?.success) {
        return toast.error('Something went wrong');
      }

      const mrp = data.data?.salePrice ?? 0;
      const discountAmount = mrp * ((data.data?.discountPercentage ?? 0) / 100);
      const sellingPrice = mrp - discountAmount;

      update(index, {
        ...currField,
        subStyle: data.data?.subStyle,
        stock: data.data?.currentStock,
        mrp,
        sellingPrice,
        startDate: data.data?.startingDate ?? '',
        endDate: data.data?.expiringDate ?? '',
        inventoryTypeId,
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  const expectedCombinations = useMemo(() => {
    if (!colors?.length) return [];
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

  // ✅ Keep watchCombinationsRef in sync with the latest live values on every render
  useEffect(() => {
    watchCombinationsRef.current = watchCombinations;
  });

  const expectedKeys = useMemo(
    () => new Set(expectedCombinations.map((combo) => getCombinationKey(combo.options))),
    [expectedCombinations]
  );

  useEffect(() => {
    if (!expectedCombinations.length) {
      replace([]);
      prevSignatureRef.current = expectedSignatureKeys;
      return;
    }

    if (prevSignatureRef.current === expectedSignatureKeys) return;

    // ✅ Use live values from watchCombinationsRef — not the stale `fields` snapshot
    const liveValues = watchCombinationsRef.current ?? [];

    const currentSignatureKeys = liveValues
      .map((f) => getCombinationKey(f.options))
      .sort()
      .join('|');

    if (currentSignatureKeys === expectedSignatureKeys) {
      prevSignatureRef.current = expectedSignatureKeys;
      return;
    }

    // ✅ Create a Set of expected combination keys
    // const expectedKeys = new Set(
    //   expectedCombinations.map((combo) => getCombinationKey(combo.options))
    // );

    // ✅ Build existingMap from live values so user-entered data is preserved
    const existingMap = new Map(liveValues.map((f) => [getCombinationKey(f.options), f]));

    // ✅ Keep existing combinations that are still valid (preserve their order + user data)
    const validExisting = liveValues.filter((f) => expectedKeys.has(getCombinationKey(f.options)));

    // ✅ Find NEW combinations that don't exist yet
    const newCombinations = expectedCombinations
      .filter((combo) => !existingMap.has(getCombinationKey(combo.options)))
      .map((combo) => createCombination(combo.options));

    // ✅ Merge: Keep existing order + append new ones at the END
    const mergedCombinations = [...validExisting, ...newCombinations];

    replace(mergedCombinations);
    prevSignatureRef.current = expectedSignatureKeys;
  }, [expectedCombinations, expectedSignatureKeys, replace, expectedKeys]);

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="table-auto text-sm border-collapse">
          <thead className="whitespace-nowrap bg-background">
            <tr>
              {/* burn= mrp- selling
              discount= mrp - selling
              commission = selling -dp */}
              <th className="text-start font-medium py-2.5 px-3">Color</th>
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

                const fieldValue = watchCombinations[fieldIndex];
                const { dpPrice, mrp, sellingPrice } = fieldValue || {};

                const burnAmount = calculateBurn(mrp, sellingPrice);
                const commissionAmount = calculateCommission(dpPrice, mrp, sellingPrice);

                const isFirstRow = rowIndex === 0;
                const isLastRow = rowIndex === rows.length - 1;
                const rowPadding = cn({ 'pt-3': isFirstRow, 'pb-3': isLastRow });

                return (
                  <tr
                    key={field?.id}
                    className={`${
                      fieldValue?.status === 'N' &&
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
                    {sizes?.length ? (
                      <td className={`px-3 py-1.5 ${rowPadding}`}>{size?.variantOptionText}</td>
                    ) : null}
                    <td className={`px-3 py-1.5 ${rowPadding}`}>
                      <Controller
                        name={`variantCombinations.${fieldIndex}.sku`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="SKU/Barcode"
                            className="min-w-36 rounded py-1 mt-0"
                            disabled={fieldValue?.status === 'N'}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td className={`px-3 py-1.5 ${rowPadding}`}>
                      <Controller
                        name={`variantCombinations.${fieldIndex}.subStyle`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="Sub-Style"
                            className="min-w-36 rounded py-1 mt-0"
                            disabled={fieldValue?.status === 'N'}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td className={`px-3 py-1.5 ${rowPadding}`}>
                      <Controller
                        name={`variantCombinations.${fieldIndex}.stock`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="Stock"
                            className="min-w-24 rounded py-1 mt-0"
                            disabled={fieldValue?.status === 'N'}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td className={`px-3 py-1.5 ${rowPadding}`}>
                      <Controller
                        name={`variantCombinations.${fieldIndex}.dpPrice`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="DP"
                            className="min-w-24 rounded py-1 mt-0"
                            disabled={fieldValue?.status === 'N'}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td className={`px-3 py-1.5 ${rowPadding}`}>
                      <Controller
                        name={`variantCombinations.${fieldIndex}.mrp`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="MRP"
                            className="min-w-24 rounded py-1 mt-0"
                            disabled={fieldValue?.status === 'N'}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td className={`px-3 py-1.5 min-w-28 ${rowPadding}`}>
                      {fieldValue?.sellingPrice ? (
                        <div className=" flex items-center border border-neutral-300 py-1 px-2 leading-normal rounded hover:bg-white-700">
                          <span>{fieldValue?.sellingPrice}</span>
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
                            aria-label={`Reset-selling-price-${fieldIndex}`}
                            className="ms-1 cursor-pointer text-neutral-300 hover:text-danger-500"
                          >
                            <DeleteIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled={fieldValue?.status === 'N'}
                          onClick={() => setActiveFieldIndex(fieldIndex)}
                          className="w-fit cursor-pointer text-secondary-500 hover:text-secondary-600 disabled:text-secondary-200 text-sm font-medium"
                        >
                          Add Selling Price
                        </button>
                      )}
                    </td>
                    <td className={`px-3 py-1.5 ${rowPadding}`}>
                      {/* burn= mrp- selling */}
                      <div className="border border-neutral-300 py-1 px-2 leading-normal rounded bg-white-700 dark:bg-black-300">
                        {burnAmount || 0}
                      </div>
                    </td>
                    <td className={`px-3 py-1.5 ${rowPadding}`}>
                      {/* commission = selling -dp */}
                      <div className="border border-neutral-300 py-1 px-2 leading-normal rounded bg-white-700 dark:bg-black-300">
                        {commissionAmount || 0}
                      </div>
                    </td>
                    <td className={`px-3 py-1.5 ${rowPadding}`}>
                      <Select
                        options={[
                          { label: 'Self', value: '1' },
                          { label: 'Through API', value: '2' },
                        ]}
                        optionKeys={{ label: 'label', value: 'value' }}
                        placeholder="Select"
                        className="rounded py-1 mt-0 "
                        disabled={fieldValue?.status === 'N'}
                        value={fieldValue?.inventoryTypeId}
                        onChange={(e) => handleUpdateBy(e, fieldIndex)}
                      />
                    </td>
                    <td className={` px-3 py-1.5 ${rowPadding}`}>
                      <Controller
                        name={`variantCombinations.${fieldIndex}.status`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Switch
                            isEnabled={value === 'Y'}
                            onEnabled={() => onChange(value === 'Y' ? 'N' : 'Y')}
                          />
                        )}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {activeFieldIndex !== null && (
        <SellingPriceModal
          isOpen={activeFieldIndex !== null}
          onClose={() => setActiveFieldIndex(null)}
          onSubmit={handleSellingPriceSubmit}
          initialValues={{
            sellingPrice: watchCombinations[activeFieldIndex].sellingPrice,
            startDate: watchCombinations[activeFieldIndex].startDate ?? '',
            endDate: watchCombinations[activeFieldIndex].endDate ?? '',
          }}
        />
      )}
    </>
  );
};

export default ProductVariantPriceTable;
