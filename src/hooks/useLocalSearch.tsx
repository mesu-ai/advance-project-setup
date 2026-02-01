import { useEffect, useState } from 'react';

const useLocalSearch = <T,>(items: T[], searchBy: (item: T) => string, delay: number) => {
  const [keyword, setKeyword] = useState<string>('');
  const [result, setResult] = useState<T[]>(items);

  useEffect(() => {
    if (!items) {
      setResult([]);
      return;
    }

    const handler = setTimeout(() => {
      const trimed = keyword.trim();

      if (!trimed) {
        setResult(items);
        return;
      }
      setResult(
        items.filter((item) => searchBy(item).toLowerCase().includes(trimed.toLowerCase()))
      );
    }, delay);

    return () => clearTimeout(handler);
  }, [keyword, delay, items, searchBy]);

  return { keyword, result, setKeyword };
};

export default useLocalSearch;
