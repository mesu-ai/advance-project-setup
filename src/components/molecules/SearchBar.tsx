import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import Search from '../atoms/Search';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordParam = searchParams.get('keyword') ?? '';

  const [keyword, setKeyword] = useState(keywordParam);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextKeyword = keyword.trim();
    const currentKeyword = keywordParam.trim();

    if (!nextKeyword && !currentKeyword) return;
    if (nextKeyword === currentKeyword) return;

    setSearchParams((prev) => {
      if (nextKeyword) {
        prev.set('keyword', nextKeyword);
      } else {
        prev.delete('keyword');
      }
      prev.delete('page');

      return prev;
    });
  };

  useEffect(() => {
    // Keep local input state in sync with URL keyword param
    setKeyword(keywordParam);
  }, [keywordParam]);

  return (
    <form onSubmit={handleSearch} className="w-full max-w-[350px]">
      <Search className="my-auto" value={keyword} onSearch={setKeyword} />
    </form>
  );
};

export default SearchBar;
