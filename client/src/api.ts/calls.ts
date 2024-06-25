import axiosInstance from "./axios";
import { Comment, Recipe } from "../types/api";
import { BASE_API_URL } from "./BASE_API_URL";

type GetRecipesAPI = (payload: { _page: number , q?: string}) => Promise<Recipe[]>;

export const getRecipes: GetRecipesAPI = async (payload) => {
    const { _page, q } = payload;
    const response = await axiosInstance.get(
        `${BASE_API_URL}/recipes`,
        { params: { _page, q, _limit: 6 } }
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

type GetRecipeCommentsAPI = (id: string) => Promise<Comment[]>;
export const getRecipeComments: GetRecipeCommentsAPI = async (id: string) => {
    const response = await axiosInstance.get(
        `${BASE_API_URL}/recipes/${id}/comments`
    );
    return response.data;
}
