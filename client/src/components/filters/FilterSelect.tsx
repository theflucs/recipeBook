import { Option } from "../../types/api";

type SelectProps = {
  label: "cuisines" | "difficulties" | "diets";
  options: Option[];
  value: Option["id"] | "";
  onChange: (value: string) => void;
};

function FilterSelect({ label, options, value, onChange }: SelectProps) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">{`All ${label}`}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-5-5h10l-5 5z" />
        </svg>
      </div>
    </div>
  );
}

export default FilterSelect;
