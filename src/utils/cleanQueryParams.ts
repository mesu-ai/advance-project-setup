export const cleanQueryParams = (data: Record<string, unknown>) => {
  return Object.entries(data).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      acc[key] = String(value);
    }
    return acc;
  }, {});
};
