import { Recipe } from "../types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecipes } from "../api.ts/calls";
import { BASE_API_URL } from "../api.ts/BASE_API_URL";
import DifficultyCardBadge from "../components/DifficultyBadge";

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
      {isError && <p>Error</p>}
      {isFetching && <p>Loading...</p>}
      <div className="bg-gray-100 flex items-center justify-center text-center">
        <div className="px-2 py-4">
          <h2 className="text-lg md:text-2xl">Welcome to your Recipe Book</h2>
          <h3 className="text-md md:text-xl font-semibold">
            Explore our recipes online!
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isFetched &&
          data?.pages?.map((page: Recipe[]) =>
            page.map((recipe: Recipe) => {
              const { id, name, image, difficultyId } = recipe;
              return (
                <article
                  key={id}
                  className="max-w-xs w-full overflow-hidden shadow-lg bg-white flex flex-col justify-between mx-auto mb-4"
                >
                  <div className="w-full h-48 overflow-hidden rounded-md">
                    <img
                      loading="lazy"
                      className="w-full h-full object-cover"
                      src={`${BASE_API_URL}${image}`}
                      alt={name}
                    />
                  </div>
                  <div className="px-6 py-4 flex flex-col justify-center">
                    <div className="font-bold text-xl mb-2">{name}</div>
                    <DifficultyCardBadge
                      difficultyId={difficultyId.toString()}
                    />
                  </div>
                </article>
              );
            })
          )}
      </div>
      <div className="my-6 text-center">
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
