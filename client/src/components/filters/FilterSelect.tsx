import { Option } from "../../types/api";

type SelectProps = {
  label: "cuisines" | "difficulties" | "diets";
  options: Option[];
  value: Option["id"] | "";
  onChange: (value: string) => void;
};

function FilterSelect({ label, options, value, onChange }: SelectProps) {
  return (
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
  );
}

export default FilterSelect;
