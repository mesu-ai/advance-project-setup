export const isEmpty = (obj = {}): boolean => {
  if (!obj || typeof obj !== 'object') return true;
  return Object.keys(obj).length === 0;
};
