import {
  useCuisinesQuery,
  useDifficultiesQuery,
  useDietsQuery,
} from "../../hooks/optionsQueries";
import XReset from "../XReset";
import CuisinesFilter from "./CuisinesFilter";
import DietsFilter from "./DietsFilter";
import DifficultiesFilter from "./DifficultiesFilter";

type FiltersProps = {
  cuisineId: string;
  difficultyId: string;
  dietId: string;
  onCuisineChange: (newCuisineId: string) => void;
  onDifficultyChange: (newDifficultyId: string) => void;
  onDietChange: (newDietId: string) => void;
  onReset: () => void;
};

function Filters({
  cuisineId,
  difficultyId,
  dietId,
  onCuisineChange,
  onDifficultyChange,
  onDietChange,
  onReset,
}: FiltersProps) {
  const { data: cuisines } = useCuisinesQuery();
  const { data: difficulties } = useDifficultiesQuery();
  const { data: diets } = useDietsQuery();

  return (
    <section className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-7xl mx-auto">
      <CuisinesFilter
        cuisines={cuisines || []}
        selectedCuisineId={cuisineId}
        onCuisineChange={onCuisineChange}
      />
      <DifficultiesFilter
        difficulties={difficulties || []}
        selectedDifficultyId={difficultyId}
        onDifficultyChange={onDifficultyChange}
      />
      <DietsFilter
        diets={diets || []}
        selectedDietId={dietId}
        onDietChange={onDietChange}
      />
      {(cuisineId || difficultyId || dietId) && (
        <button
          onClick={onReset}
          className="w-full font-semibold text-lg text-gray-700 flex items-center flex-wrap justify-center"
        >
          <XReset />
          <span className="text-sm ml-2">Reset Filters</span>
        </button>
      )}
    </section>
  );
}

export default Filters;
