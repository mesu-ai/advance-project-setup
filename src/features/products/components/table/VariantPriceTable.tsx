const VariantPriceTable = () => {
  const colors = ['Red', 'Blue'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="rounded-lg border border-neutral-300 overflow-hidden">
      <table className="w-full text-sm py-3 ">
        <thead className="whitespace-nowrap bg-background border-b border-neutral-300">
          <tr>
            <th className="text-start font-medium py-3 px-4">Color Family</th>
            <th className="text-start font-medium py-3 px-4">Size</th>
            <th className="text-start font-medium py-3 px-4">SKU/Barcode</th>
            <th className="text-start font-medium py-3 px-4">Stock</th>
            <th className="text-start font-medium py-3 px-4">DP(৳)</th>
            <th className="text-start font-medium py-3 px-4">MRP(৳)</th>
            <th className="text-start font-medium py-3 px-4">Selling Price(৳)</th>
            <th className="text-start font-medium py-3 px-4">Burn/Disc.(৳)</th>
            <th className="text-start font-medium py-3 px-4">Commission(৳)</th>
            <th className="text-start font-medium py-3 px-4">Inventory Updated By </th>
            <th className="text-start font-medium py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap ">
          {colors.map((c, colorIndex) =>
            sizes.map((s, sizeIndex) => (
              <tr
                className={sizeIndex === 0 && colorIndex !== 0 ? 'border-t border-neutral-300' : ''}
              >
                {sizeIndex === 0 && (
                  <td rowSpan={sizes.length} className="px-4 py-3 border-r border-neutral-300">
                    {c}
                  </td>
                )}
                <td className="px-4 py-3">{s}</td>
                <td className="px-4 py-3">Sub-001</td>
                <td className="px-4 py-3">100</td>
                <td className="px-4 py-3">2500</td>
                <td className="px-4 py-3">3000</td>
                <td className="px-4 py-3">2700</td>
                <td className="px-4 py-3">300</td>
                <td className="px-4 py-3">20</td>
                <td className="px-4 py-3">Self</td>
                <td className="px-4 py-3">Delete</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VariantPriceTable;
