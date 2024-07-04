import XReset from "./XReset";

type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
};

function SearchBar(props: SearchBarProps) {
  const { search, onSearchChange, onClear } = props;
  return (
    <div className="mb-4 flex justify-center items-center space-x-2">
      <input
        data-cy="search-bar"
        className="py-2 pl-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 inset-y-0"
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearchChange(e.target.value)}
        value={search}
        autoFocus
      />
      {search && (
        <button
          type="button"
          className="py-2 text-gray-700  flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 inset-y-0"
          onClick={onClear}
          aria-label="Clear search"
        >
          <XReset />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
