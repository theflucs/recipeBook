import { Recipe } from "../types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecipes } from "../api.ts/calls";
import { BASE_API_URL } from "../api.ts/BASE_API_URL";
import DifficultyCardBadge from "../components/DifficultyBadge";
import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipes", search],
    queryFn: async ({ pageParam }) =>
      getRecipes({ _page: pageParam, q: search }),
    initialPageParam: 0,
    placeholderData: (previousData) => previousData,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 6) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const handleClick = () => {
    fetchNextPage();
  };

  return (
    <section>
      {isError && <p>Error</p>}
      <div className="bg-gray-100 flex items-center justify-center text-center">
        <div className="px-2 py-4">
          <h2 className="text-lg md:text-2xl">Welcome to your Recipe Book</h2>
          <h3 className="text-md md:text-xl font-semibold">
            Explore our recipes online!
          </h3>
        </div>
      </div>
      <input
        className="w-full py-2 pl-10 pr-4 mb-4 rounded-lg focus:outline-none focus:bg-white"
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
        value={search}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.pages?.map((page: Recipe[]) =>
          page.map((recipe: Recipe) => {
            const { id, name, image, difficultyId } = recipe;
            return (
              <article
                key={id}
                className="max-w-xs w-full overflow-hidden shadow-lg bg-white flex flex-col justify-between mx-auto mb-4 rounded-b-lg"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover"
                    src={`${BASE_API_URL}${image}`}
                    alt={name}
                  />
                </div>
                <div className="px-6 py-4 flex flex-col justify-center">
                  <div className="font-bold text-xl mb-2">{name}</div>
                  <DifficultyCardBadge difficultyId={difficultyId.toString()} />
                </div>
                <div className="mt-auto">
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="block w-full text-center bg-amber-400 hover:bg-amber-500 text-white py-2 rounded-b-lg"
                  >
                    See Details
                  </Link>
                </div>
              </article>
            );
          })
        )}

        {!data && <p>Loading...</p>}
      </div>
      <div className="my-6 flex justify-center">
        <button
          onClick={() => handleClick()}
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
        </button>
      </div>
    </section>
  );
}

export default Home;
