import SearchIcon from '@/assets/svg/SearchIcon';
import { cn } from '@/lib/cn';
import type { ComponentPropsWithRef } from 'react';

interface SearchBarProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  className?: string;
}

const SearchBar = ({ className = '', placeholder = 'Search Here', ...props }: SearchBarProps) => {
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
        {...props}
      />
      <SearchIcon className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
    </div>
  );
};

export default SearchBar;
