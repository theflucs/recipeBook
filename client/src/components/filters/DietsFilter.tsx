import { Option } from "../../types/api";
import FilterSelect from "./FilterSelect";

type CuisineFilterProps = {
  diets: Option[];
  selectedDietId: Option["id"] | "";
  onDietChange: (value: string) => void;
};

const DietsFilter = ({
  diets,
  selectedDietId,
  onDietChange,
}: CuisineFilterProps) => {
  return (
    <FilterSelect
      label="diets"
      options={diets}
      value={selectedDietId}
      onChange={onDietChange}
    />
  );
};

export default DietsFilter;
