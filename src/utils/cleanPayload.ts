export const cleanPayload = <T extends object>(data: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => {
      if (value === null || value === undefined || value === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
  ) as Partial<T>;
};
