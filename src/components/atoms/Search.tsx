import SearchIcon from '@/assets/svg/SearchIcon';
import { cn } from '@/lib/cn';
import { type ChangeEvent, type ComponentPropsWithRef } from 'react';

interface SearchProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  onSearch: (keyword: string) => void;
}

const Search = ({
  className = '',
  placeholder = 'Search Here',
  onSearch,
  ...props
}: SearchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    onSearch?.(keyword);
  };

  return (
    <div
      className={cn(
        'relative flex justify-between px-2 py-[7px] w-full border text-neutral-300 focus-within:text-foreground border-neutral-300 dark:border-black-300 dark:bg-black-500 focus-within:border-primary-500 rounded-lg text-sm',
        className
      )}
    >
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        className="outline-none placeholder:text-neutral-300 w-full"
        onChange={handleChange}
        {...props}
      />
      <SearchIcon className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none" />
    </div>
  );
};

export default Search;
