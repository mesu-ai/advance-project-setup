import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import toast from 'react-hot-toast';

type ErrorDataT = {
  message?: string;
};

export const useApiError = () => {
  const handleApiError = (error: unknown) => {
    let msg = 'Something went wrong';
    if (error && typeof error === 'object' && 'data' in error) {
      const e = error as FetchBaseQueryError;
      if (typeof e.data === 'string') {
        msg = e.data;
      } else if (typeof e.data === 'object' && e.data !== null) {
        msg = (e.data as ErrorDataT).message ?? msg;
      }
    }
    toast.error(msg);
  };
  return { handleApiError };
};
