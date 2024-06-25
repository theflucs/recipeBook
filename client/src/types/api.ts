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

export type Comment = {
    id: string;
    recipeId: string;
    comment: string;
    rating: number;
    date: string;
};

export type Option = {
    id: string;
    name: string;
};
