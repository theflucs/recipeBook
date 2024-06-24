export type Recipe = {
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
