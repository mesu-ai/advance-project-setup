import SearchBar from '../molecules/SearchBar';

const SelectSearch = () => {
  return (
    <div>
      <SearchBar onSearch={(keyword) => console.log(keyword)} />
      <div className="rounded-lg bg-white"></div>
    </div>
  );
};

export default SelectSearch;
