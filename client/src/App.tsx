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

function App() {
  const { data } = useQuery<Recipe[], Error>({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data } = await axios.get<Recipe[]>(
        "http://localhost:8080/recipes"
      );
      return data;
    },
  });
  return (
    <section>
      <h1>Recipes</h1>
      <ul>
        {data?.map((recipe) => (
          <li key={recipe.id} className="py-2">
            {recipe.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
