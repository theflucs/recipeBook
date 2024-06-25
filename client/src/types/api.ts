export type Recipe = {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string;
    cuisineId: number;
    cuisine: string;
    difficultyId: string;
    difficulty: string;
    image: string;
};
