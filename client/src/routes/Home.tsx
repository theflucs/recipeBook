import { useSearchParams } from "react-router-dom";
import useRecipesQuery from "../hooks/useRecipesQuery";
import Filters from "../components/filters/Filters";
import RecipesList from "../components/RecipesList";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") || "";
  const cuisineId = searchParams.get("cuisineId") || "";
  const difficultyId = searchParams.get("difficultyId") || "";
  const dietId = searchParams.get("dietId") || "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useRecipesQuery({ search, cuisineId, difficultyId, dietId });

  const handleFilterChange = (filter: string, newFilterId: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newFilterId) {
      newParams.set(filter, newFilterId);
    } else {
      newParams.delete(filter);
    }
    setSearchParams(newParams);
  };

  const handleCuisineChange = (newCuisineId: string) => {
    handleFilterChange("cuisineId", newCuisineId);
  };

  const handleDifficultyChange = (newDifficultyId: string) => {
    handleFilterChange("difficultyId", newDifficultyId);
  };

  const handleDietChange = (newDietId: string) => {
    handleFilterChange("dietId", newDietId);
  };

  const resetFilters = () => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  const handleClick = () => {
    fetchNextPage();
  };

  return (
    <div className="container mx-auto flex flex-col p-4 md:p-8">
      <div className="bg-gray-100 flex items-center justify-center text-center">
        <div className="px-2 py-4">
          <h2 data-cy="homepage-title" className="text-xl md:text-2xl">
            Welcome to your Recipe Book
          </h2>
          <h3
            data-cy="homepage-subtitle"
            className="text-lg md:text-xl font-semibold text-orange-700"
          >
            Explore our recipes online!
          </h3>
        </div>
      </div>

      {data && (
        <>
          <Filters
            cuisineId={cuisineId}
            difficultyId={difficultyId}
            dietId={dietId}
            onCuisineChange={handleCuisineChange}
            onDifficultyChange={handleDifficultyChange}
            onDietChange={handleDietChange}
            onReset={resetFilters}
          />
          <RecipesList
            recipes={data.pages.flat() || []}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            status={status}
            handleClick={handleClick}
          />
        </>
      )}
    </div>
  );
}

export default Home;
