import { Option } from "../../types/api";
import FilterSelect from "./FilterSelect";

type DifficultiesFilterProps = {
  difficulties: Option[];
  selectedDifficultyId: Option["id"] | "";
  onDifficultyChange: (value: string) => void;
};

const DifficultiesFilter = ({
  difficulties,
  selectedDifficultyId,
  onDifficultyChange,
}: DifficultiesFilterProps) => {
  return (
    <FilterSelect
      label="difficulties"
      options={difficulties}
      value={selectedDifficultyId}
      onChange={onDifficultyChange}
    />
  );
};

export default DifficultiesFilter;
