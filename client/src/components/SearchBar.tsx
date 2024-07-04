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
        className="py-2 pl-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearchChange(e.target.value)}
        value={search}
        autoFocus
      />
      {search && (
        <button
          type="button"
          className="p-2 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          onClick={onClear}
          aria-label="Clear search"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
