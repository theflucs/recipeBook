import axiosInstance from "./axios";
import { Comment, Option, Recipe } from "../types/api";
import { BASE_API_URL } from "./BASE_API_URL";

type RecipesPayload = {
    _page: number;
    q?: string;
    cuisineId?: string;
    difficultyId?: string;
    dietId?: string;
};

type GetRecipesAPI = (payload: RecipesPayload) => Promise<Recipe[]>;
type GetRecipeDetailAPI = (id: string) => Promise<Recipe>;
type GetRecipeCommentsAPI = (id: string) => Promise<Comment[]>;
export type PostCommentPayload = {
    id: string;
    comment: string;
    rating: number;
    date: string;
};
type GetOptionsAPI = () => Promise<Option[]>;

export const getRecipes: GetRecipesAPI = async (payload) => {
    try {
        const response = await axiosInstance.get(`${BASE_API_URL}/recipes`, {
            params: {
                ...payload,
                _limit: 6,
                _expand: ["cuisine", "difficulty", "diet"],
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw new Error('Failed to fetch recipes. Please try again later.');
    }
};

export const getRecipeDetail: GetRecipeDetailAPI = async (id) => {
    try {
        const response = await axiosInstance.get(`${BASE_API_URL}/recipes/${id}?_expand=cuisine`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching recipe detail for recipe ID ${id}:`, error);
        throw new Error('Failed to fetch recipe detail. Please try again later.');
    }
};

export const getRecipeComments: GetRecipeCommentsAPI = async (id) => {
    try {
        const response = await axiosInstance.get(`${BASE_API_URL}/recipes/${id}/comments`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching comments for recipe ID ${id}:`, error);
        throw new Error('Failed to fetch recipe comments. Please try again later.');
    }
};

export const postComment = async (payload: PostCommentPayload): Promise<void> => {
    const { id, comment, rating, date } = payload;
    try {
        const response = await axiosInstance.post(`${BASE_API_URL}/recipes/${id}/comments`, { comment, rating, date });
        return response.data;
    } catch (error) {
        console.error(`Error posting comment for recipe ID ${id}:`, error);
        throw new Error('Failed to post comment. Please try again later.');
    }
};

export const getCuisines: GetOptionsAPI = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_API_URL}/cuisines`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cuisines:', error);
        throw new Error('Failed to fetch cuisines. Please try again later.');
    }
};

export const getDifficulties: GetOptionsAPI = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_API_URL}/difficulties`);
        return response.data;
    } catch (error) {
        console.error('Error fetching difficulties:', error);
        throw new Error('Failed to fetch difficulties. Please try again later.');
    }
};

export const getDiets: GetOptionsAPI = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_API_URL}/diets`);
        return response.data;
    } catch (error) {
        console.error('Error fetching diets:', error);
        throw new Error('Failed to fetch diets. Please try again later.');
    }
};
