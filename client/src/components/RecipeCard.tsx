import { BASE_API_URL } from "../api/BASE_API_URL";
import { Comment, Rating, Recipe } from "../types/api";
import DifficultyCardBadge from "./DifficultyBadge";
import CountryFlag from "./CountryFlag";
import { useCommentsQuery } from "../hooks/useCommentsQuery";
import Ratings from "./Ratings";

function RecipeCard(props: { recipe: Recipe }) {
  const { id, name, difficultyId, image, cuisine } = props.recipe;
  const { data } = useCommentsQuery(id.toString());
  let averageRating: Rating = 0;

  if (data) {
    averageRating = calculateAverageRating(data);
  }

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
      <div className="mt-4">
        <h2 className="text-center font-bold text-xl mb-4">{name}</h2>
        {data && averageRating > 0 && (
          <div className="flex justify-center">
            <Ratings rating={averageRating} />
          </div>
        )}
        <div className="flex bg-amber-400 text-white justify-center py-4">
          <CountryFlag cuisine={cuisine} />
          <DifficultyCardBadge difficultyId={difficultyId} />
        </div>
      </div>
    </article>
  );
}

function calculateAverageRating(comments: Comment[]): Rating {
  if (comments.length === 0) return 0;

  const totalRating = comments.reduce(
    (sum, comment) => sum + comment.rating,
    0
  );
  const numberOfComments = comments.length;
  const averageRating = totalRating / numberOfComments;

  return Math.round(averageRating) as Rating;
}

export default RecipeCard;
