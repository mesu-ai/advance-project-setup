import { useEffect, useState } from 'react';

const useSearchKeyword = (delay: number, minLength: number = 1) => {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeword] = useState('');

  const trimmed = keyword.trim();
  const isValid = trimmed.length >= minLength;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeword(isValid ? trimmed.toLowerCase() : '');
    }, delay);
    return () => clearTimeout(handler);
  }, [delay, isValid, trimmed]);

  return { debouncedKeyword, keyword, setKeyword };
};

export default useSearchKeyword;
