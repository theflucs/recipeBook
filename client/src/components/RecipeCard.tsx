import { BASE_API_URL } from "../api/BASE_API_URL";
import { Recipe } from "../types/api";
import DifficultyCardBadge from "./DifficultyBadge";
import CountryFlag from "./CountryFlag";

function RecipeCard(props: { recipe: Recipe }) {
  const { id, name, difficultyId, image, cuisine } = props.recipe;
  return (
    <article
      key={id}
      className="max-w-xs w-full overflow-hidden shadow-lg bg-white flex flex-col justify-between mx-auto mb-4 rounded-lg"
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          loading="lazy"
          className="w-full h-full object-cover rounded-t-lg"
          src={`${BASE_API_URL}${image}`}
          alt={name}
        />
      </div>
      <div className="px-6 py-4 flex flex-col items-center text-center">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div className="flex">
          <CountryFlag cuisine={cuisine} />
          <DifficultyCardBadge difficultyId={difficultyId} />
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
