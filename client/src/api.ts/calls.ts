import axiosInstance from "./axios";
import { Recipe } from "../types/api";
import { BASE_API_URL } from "./BASE_API_URL";

type GetRecipesAPI = (page: number) => Promise<Recipe[]>;

export const getRecipes: GetRecipesAPI = async (_page: number) => {
    const response = await axiosInstance.get(
        `${BASE_API_URL}/recipes?_page=${_page}&_limit=10`
    );
    return response.data;
}
