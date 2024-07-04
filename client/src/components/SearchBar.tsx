import { useState } from "react";
import XReset from "./XReset";

type SearchBarProps = {
  search: string;
  onSearchSubmit: (value: string) => void;
  onClear: () => void;
};

function SearchBar({ search, onSearchSubmit, onClear }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(search);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchSubmit(inputValue);
    }
  };

  return (
    <div className="flex items-center w-full max-w-xs space-x-2">
      <input
        data-cy="search-bar"
        className="py-2 pl-4 pr-10 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
        type="text"
        placeholder="Search... (press Enter)"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
        autoFocus
      />
      {inputValue && (
        <button
          type="button"
          className="py-2 px-3 text-gray-700 flex items-center border border-gray-300 bg-white rounded-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          onClick={() => {
            setInputValue("");
            onClear();
          }}
          aria-label="Clear search"
        >
          <XReset />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
