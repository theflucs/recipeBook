import { Recipe } from "../types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecipes } from "../api.ts/calls";

function Home() {
  const {
    data,
    fetchNextPage,
    isFetched,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipes"],
    queryFn: async ({ pageParam }) => getRecipes(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length <= 0) {
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
      <h1>Home</h1>
      {isError && <p>Error</p>}
      {isFetching && <p>Loading...</p>}
      <ul>
        {isFetched &&
          data?.pages?.map((page: Recipe[]) =>
            page.map((recipe: Recipe) => {
              return (
                <li key={recipe.id} className="py-2">
                  {recipe.name}
                </li>
              );
            })
          )}
      </ul>
      <div>
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
                ? "py-3 px-6 rounded-full text-white text-lg"
                : "hidden"
            }
          `}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : null}
        </button>
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
export default Home;
