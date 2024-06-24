import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  cuisineId: number;
  cuisine: string;
  difficultyId: number;
  difficulty: string;
  image: string;
};

function Home() {
  const { data, error, isLoading } = useQuery<Recipe[], Error>({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data } = await axios.get<Recipe[]>(
        "http://localhost:8080/recipes"
      );
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching recipes: {error.message}</div>;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-teal-500 text-3xl mb-4">Recipes</h1>
      <ul className="w-full max-w-lg">
        {data?.map((recipe) => (
          <li key={recipe.id} className="py-2 text-center">
            {recipe.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Home;
