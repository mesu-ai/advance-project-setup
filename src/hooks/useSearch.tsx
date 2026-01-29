import { useEffect, useState } from 'react';

const useSearch = <T,>(items: T[], searchBy: (item: T) => string, delay: number) => {
  const [keyword, setKeyword] = useState<string>('');
  const [result, setResult] = useState<T[]>(items);

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimKeyword = keyword.trim().toLowerCase();

      if (!trimKeyword) {
        setResult(items);
        return;
      }
      setResult(items.filter((item) => searchBy(item).toLowerCase().includes(trimKeyword)));
    }, delay);
    return () => clearTimeout(handler);
  }, [delay, items, keyword, searchBy]);

  return { keyword, result, setKeyword };
};

export default useSearch;
