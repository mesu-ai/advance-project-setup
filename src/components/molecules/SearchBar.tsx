import SearchIcon from '@/assets/svg/SearchIcon';

const SearchBar = () => {
  return (
    <form
      action=""
      className="relative w-full flex justify-between border text-neutral-300 border-neutral-300 dark:border-black-300 dark:bg-black-500 focus-within:border-primary-500 rounded-lg text-sm max-w-[350px]"
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search Here"
        className="outline-none placeholder:text-neutral-300 w-full py-2 px-3"
      />
      <SearchIcon className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
    </form>
  );
};

export default SearchBar;
