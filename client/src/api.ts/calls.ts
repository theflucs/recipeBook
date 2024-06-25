import axiosInstance from "./axios";
import { Comment, Option, Recipe } from "../types/api";
import { BASE_API_URL } from "./BASE_API_URL";

type RecipesPayoload = {
    _page: number;
    q?: string;
    cuisineId?: string;
    difficultyId?: string;
    dietId?: string;
}
type GetRecipesAPI = (payload: RecipesPayoload) => Promise<Recipe[]>;

export const getRecipes: GetRecipesAPI = async (payload) => {
    const response = await axiosInstance.get(
        `${BASE_API_URL}/recipes`,
        {
            params:
            {
                ...payload,
                _limit: 6,
            }
        }
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

export type PostCommentPayload = {
    id: string;
    comment: string;
    rating: number;
    date: string;
}
export const postComment: (payload: PostCommentPayload) => Promise<void> = async (payload) => {
    const { id, comment, rating, date } = payload;
    const response = await axiosInstance.post(
        `${BASE_API_URL}/recipes/${id}/comments`,
        { comment, rating, date }
    );
    return response.data;
}

type GetOptionsAPI = () => Promise<Option[]>;

export const getCuisines: GetOptionsAPI = async () => {
    const response = await axiosInstance.get(
        `${BASE_API_URL}/cuisines`
    );
    return response.data;
}
export const getDifficulties: GetOptionsAPI = async () => {
    const response = await axiosInstance.get(
        `${BASE_API_URL}/difficulties`
    );
    return response.data;
}
export const getDiets: GetOptionsAPI = async () => {
    const response = await axiosInstance.get(
        `${BASE_API_URL}/diets`
    );
    return response.data;
}

