import { Option } from "../../types/api";
import FilterSelect from "./FilterSelect";

type CuisinesFilterProps = {
  cuisines: Option[];
  selectedCuisineId: Option["id"] | "";
  onCuisineChange: (value: string) => void;
};

const CuisinesFilter = ({
  cuisines,
  selectedCuisineId,
  onCuisineChange,
}: CuisinesFilterProps) => {
  return (
    <FilterSelect
      label="cuisines"
      options={cuisines}
      value={selectedCuisineId}
      onChange={onCuisineChange}
    />
  );
};

export default CuisinesFilter;
