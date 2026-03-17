export const calculateBurn = (mrp: number | undefined, selling: number | undefined) => {
  if (!selling) return 0;
  return (Number(mrp) || 0) - (Number(selling) || 0);
};

export const calculateCommission = (
  dp: number | undefined,
  mrp: number | undefined,
  selling: number | undefined
) => {
  if (!selling) {
    return (Number(mrp) || 0) - (Number(dp) || 0);
  } else {
    return (Number(selling) || 0) - (Number(dp) || 0);
  }
};
