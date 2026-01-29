import SearchIcon from '@/assets/svg/SearchIcon';
import { cn } from '@/lib/cn';
import { debounce } from '@/utils/debounce';
import { useRef, type ChangeEvent, type ComponentPropsWithRef } from 'react';

type DebouncedSearchFn = ((keyword: string) => void) & { cancel: () => void };

interface SearchBarProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  className?: string;
  onSearch: (keyword: string) => void;
  delay?: number;
}

const SearchBar = ({
  className = '',
  placeholder = 'Search Here',
  delay,
  onSearch,
  ...props
}: SearchBarProps) => {
  const debouncedSearchRef = useRef<DebouncedSearchFn>(null);

  if (delay && !debouncedSearchRef.current) {
    debouncedSearchRef.current = debounce((keyword: string) => {
      onSearch?.(keyword);
    }, delay);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    // const deb= debounce(keyword, 1000)
    // console.log(keyword);
    if (delay && debouncedSearchRef.current) {
      debouncedSearchRef.current(keyword);
    } else {
      onSearch?.(keyword);
    }
  };

  return (
    <div
      className={cn(
        'relative w-full flex justify-between border text-neutral-300 border-neutral-300 dark:border-black-300 dark:bg-black-500 focus-within:border-primary-500 rounded-lg text-sm',
        className
      )}
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder={placeholder}
        className="outline-none placeholder:text-neutral-300 w-full py-2 px-3"
        onChange={handleChange}
        {...props}
      />
      <SearchIcon className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
    </div>
  );
};

export default SearchBar;
