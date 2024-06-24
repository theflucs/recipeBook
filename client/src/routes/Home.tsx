import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../types/api";
import axiosInstance from "../api.ts/axios";

function Home() {
  const { data, error, isLoading } = useQuery<Recipe[], Error>({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Recipe[]>("/recipes");
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
