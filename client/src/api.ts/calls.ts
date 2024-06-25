import axiosInstance from "./axios";
import { Recipe } from "../types/api";
import { BASE_API_URL } from "./BASE_API_URL";

type GetRecipesAPI = (page: number) => Promise<Recipe[]>;

export const getRecipes: GetRecipesAPI = async (_page: number) => {
    const response = await axiosInstance.get(
        `${BASE_API_URL}/recipes?_page=${_page}&_limit=6`
    );
    return response.data;
}

type GetRecipeDetailAPI = (id: string) => Promise<Recipe>;
export const getRecipeDetail: GetRecipeDetailAPI = async (id: string) => {
    const response = await axiosInstance.get(
        `${BASE_API_URL}/recipes/${id}`
    );
    return response.data;
}
