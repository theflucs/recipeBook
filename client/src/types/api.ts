export type Recipe = {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string;
    image: string;
    cuisineId: number;
    difficultyId: string;
    dietId: string;
    cuisine?: Option;
    difficulty?: Option;
    diet?: Option
};

export type Comment = {
    id: string;
    recipeId: string;
    comment: string;
    rating: Rating;
    date: string;
};

export type Option = {
    id: string;
    name: string;
    code?: string;
};

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;
