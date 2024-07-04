import {
  useCuisinesQuery,
  useDifficultiesQuery,
  useDietsQuery,
} from "../../hooks/optionsQueries";
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
    <section className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
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
            className="p-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
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
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </section>
  );
}

export default Filters;
