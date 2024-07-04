import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Spinner from "./Spinner";
import { Recipe } from "../types/api";

type RecipesListProps = {
  recipes: Recipe[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  status: "pending" | "error" | "success";
  handleClick: () => void;
};

function RecipesList(props: RecipesListProps) {
  const { recipes, hasNextPage, isFetchingNextPage, status, handleClick } =
    props;

  if (status === "pending") {
    return <Spinner />;
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-full mt-8">
        <h1 className="font-bold text-2xl">There was an error!</h1>
        <p className="text-xl">Please try refreshing the page.</p>
      </div>
    );
  }
  return (
    <section className="w-full mt-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes?.map((recipe: Recipe) => (
          <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>
      <LoadButton
        fetchNextPage={handleClick}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      {!hasNextPage && !isFetchingNextPage && (
        <p className="text-lg font-bold mt-4 text-center">No more recipes</p>
      )}
    </section>
  );
}

type LoadButtonProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

function LoadButton(props: LoadButtonProps) {
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = props;
  const handleClick = () => {
    fetchNextPage();
  };
  return (
    <button
      type="button"
      className={`
          mx-auto
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
      disabled={!hasNextPage || isFetchingNextPage}
      onClick={handleClick}
    >
      {isFetchingNextPage ? "Loading more..." : "Load more"}
    </button>
  );
}

export default RecipesList;
