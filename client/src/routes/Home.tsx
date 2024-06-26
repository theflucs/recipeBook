import { Option, Recipe } from "../types/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getCuisines,
  getDiets,
  getDifficulties,
  getRecipes,
} from "../api/calls";
import { useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Option["id"] | string
  >("");
  const [selectedCuisine, setSelectedCuisine] = useState<Option["id"] | string>(
    ""
  );
  const [selectedDiet, setSelectedDiet] = useState<Option["id"] | string>("");

  const {
    data,
    fetchNextPage,
    isError,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useRecipies({
    search,
    selectedDifficulty,
    selectedCuisine,
    selectedDiet,
  });

  const handleClick = () => {
    fetchNextPage();
  };
  const resetFilters = () => {
    setSelectedCuisine("");
    setSelectedDifficulty("");
    setSelectedDiet("");
  };

  return (
    <section className="min-h-screen flex flex-col">
      {isError && <p>Error</p>}
      <div className="bg-gray-100 flex items-center justify-center text-center">
        <div className="px-2 py-4">
          <h2 id="homepage-title" className="text-xl md:text-2xl">
            Welcome to your Recipe Book
          </h2>
          <h3
            id="homepage-subtitle"
            className="text-lg md:text-xl font-semibold text-orange-700"
          >
            Explore our recipes online!
          </h3>
        </div>
      </div>
      {data && (
        <input
          id="search-bar"
          className="py-2 pl-10 pr-4 mb-4 rounded-lg focus:outline-none focus:bg-white mx-8"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
          value={search}
        />
      )}
      <button
        id="reset-filters-button"
        onClick={resetFilters}
        className="flex justify-end items-center space-x-2 mr-8"
      >
        <span>Reset Filters</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <section className="flex justify-between space-x-4 mb-4 mx-8">
        <div className="w-1/3">
          <CuisineFilterSelect
            value={selectedCuisine}
            setValue={setSelectedCuisine}
          />
        </div>
        <div className="w-1/3">
          <DifficultyFilterSelect
            value={selectedDifficulty}
            setValue={setSelectedDifficulty}
          />
        </div>
        <div className="w-1/3">
          <DietFilterSelect value={selectedDiet} setValue={setSelectedDiet} />
        </div>
      </section>
      {!data && isLoading && (
        <div className="flex justify-center items-center w-full">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      )}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.pages?.map((page: Recipe[]) =>
          page.map((recipe: Recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))
        )}
      </section>
      <div className="my-6 flex justify-center">
        <button
          onClick={handleClick}
          disabled={!hasNextPage || isFetchingNextPage}
          className={`
            ${
              isFetchingNextPage
                ? "bg-gray-300 cursor-wait"
                : "bg-orange-500 hover:bg-orange-600 focus:outline-none"
            }
            ${
              hasNextPage
                ? "py-3 px-6 rounded-full text-white text-lg flex items-center justify-center"
                : "hidden"
            }
          `}
        >
          {isFetchingNextPage ? (
            <>
              <div
                className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
              <span>Loading more...</span>
            </>
          ) : (
            "Load More"
          )}
        </button>{" "}
        {!hasNextPage && !isFetchingNextPage && (
          <div className="mt-4">
            <p className="font-semibold">No more recipes</p>
          </div>
        )}
      </div>

      <div>
        {isFetching && !isFetchingNextPage ? "Loading more recipes..." : null}
      </div>
    </section>
  );
}

type UseRecipiesProps = {
  search: string;
  selectedDifficulty: Option["id"] | string;
  selectedCuisine: Option["id"] | string;
  selectedDiet: Option["id"] | string;
};

function useRecipies(props: UseRecipiesProps) {
  const { search, selectedDifficulty, selectedCuisine, selectedDiet } = props;
  return useInfiniteQuery({
    queryKey: [
      "recipes",
      search,
      selectedDifficulty,
      selectedCuisine,
      selectedDiet,
    ],
    queryFn: async ({ pageParam }) =>
      getRecipes({
        _page: pageParam,
        q: search,
        difficultyId: selectedDifficulty ? selectedDifficulty : undefined,
        cuisineId: selectedCuisine ? selectedCuisine : undefined,
        dietId: selectedDiet ? selectedDiet : undefined,
      }),
    initialPageParam: 0,
    placeholderData: (previousData) => previousData,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 6) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
}

function CuisineFilterSelect(props: {
  value: Option["id"] | string;
  setValue: React.Dispatch<React.SetStateAction<Option["id"] | string>>;
}) {
  const { value, setValue } = props;

  const { data } = useQuery({
    queryKey: ["cuisines"],
    queryFn: () => getCuisines(),
  });

  return (
    <div>
      <h3 className="mb-2">Cuisine</h3>
      <select
        name="cuisine"
        className="block w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        <option value="">All</option>
        {data?.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function DifficultyFilterSelect(props: {
  value: Option["id"] | string;
  setValue: React.Dispatch<React.SetStateAction<Option["id"] | string>>;
}) {
  const { value, setValue } = props;

  const { data } = useQuery({
    queryKey: ["difficulty"],
    queryFn: () => getDifficulties(),
  });

  return (
    <div>
      <h3 className="mb-2">Difficulty</h3>
      <select
        name="difficulty"
        className="block w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        <option value="">All</option>
        {data?.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function DietFilterSelect(props: {
  value: Option["id"] | string;
  setValue: React.Dispatch<React.SetStateAction<Option["id"] | string>>;
}) {
  const { value, setValue } = props;
  const { data } = useQuery({
    queryKey: ["diet"],
    queryFn: () => getDiets(),
  });

  return (
    <div>
      <h3 className="mb-2">Diet</h3>
      <select
        className="block w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        <option value="">All</option>
        {data?.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Home;
