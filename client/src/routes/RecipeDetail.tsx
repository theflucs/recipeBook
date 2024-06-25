import { useParams } from "react-router-dom";
import { getRecipeComments, getRecipeDetail } from "../api.ts/calls";
import { useQuery } from "@tanstack/react-query";
import DifficultyCardBadge from "../components/DifficultyBadge";
import { BASE_API_URL } from "../api.ts/BASE_API_URL";
import { format, parseISO } from "date-fns";

function ReceipeDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, error } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeDetail(id as string),
  });

  if (!data) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading recipe</p>;
  }
  const { name, image, difficultyId, instructions, ingredients } = data;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative">
          <img
            loading="lazy"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            src={`${BASE_API_URL}${image}`}
            alt={name}
          />
          <DifficultyCardBadge difficultyId={difficultyId} />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
          <ul className="list-disc pl-8">
            {ingredients?.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mb-2 mt-2">Instructions:</h2>
          <p>{instructions}</p>
          <div className="mt-4"></div>
        </div>
      </div>

      <Comments id={id} />
    </section>
  );
}

function Comments(props: { id: string | undefined }) {
  const { id } = props;

  const { data, error } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getRecipeComments(id as string),
  });

  if (!data) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading recipe</p>;
  }
  return (
    <section className="max-w-7xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      {data.map((comment) => (
        <div className="mb-6 pb-4 border-b" key={comment.id}>
          <p className="font-bold text-lg mb-2">{comment.comment}</p>
          <p className="text-gray-500 mb-2">
            {format(parseISO(comment.date), "dd/MM/yyyy HH:mm")}
          </p>
          <p className="text-gray-500 mb-2">Rating: {comment.rating}</p>
        </div>
      ))}
    </section>
  );
}

export default ReceipeDetail;
