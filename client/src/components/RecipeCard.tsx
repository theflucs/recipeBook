import { Link } from "react-router-dom";
import { BASE_API_URL } from "../api/BASE_API_URL";
import { Recipe } from "../types/api";
import DifficultyCardBadge from "./DifficultyBadge";

function RecipeCard(props: { recipe: Recipe }) {
  const { id, name, difficultyId, image } = props.recipe;
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
      <div className="px-6 py-4 flex flex-col items-center">
        <div className="font-bold text-xl mb-2">{name}</div>
        <DifficultyCardBadge difficultyId={difficultyId} />
      </div>
      <div className="mt-auto">
        <Link
          to={`/recipes/${id}`}
          className="block w-full text-center bg-amber-400 hover:bg-amber-500 text-white py-2 rounded-b-lg"
        >
          See Details
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;
