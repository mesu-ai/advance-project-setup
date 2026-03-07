export const calculateBurn = (mrp: number | undefined, selling: number | undefined) =>
  (Number(mrp) || 0) - (Number(selling) || 0);

export const calculateCommission = (selling: number | undefined, dp: number | undefined) =>
  (Number(selling) || 0) - (Number(dp) || 0);
