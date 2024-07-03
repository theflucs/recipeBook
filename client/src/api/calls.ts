import axiosInstance from "./axios";
import { Comment, Option, Recipe } from "../types/api";

type RecipesPayload = {
    _page: number;
    q?: string;
    cuisineId?: string;
    difficultyId?: string;
    dietId?: string;
};

type GetRecipesAPI = (payload: RecipesPayload) => Promise<Recipe[]>;
export const getRecipes: GetRecipesAPI = async (payload) => {
    try {
        const response = await axiosInstance.get(`/recipes`, {
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


type GetRecipeDetailAPI = (id: string) => Promise<Recipe>;
export const getRecipeDetail: GetRecipeDetailAPI = async (id) => {
    try {
        const response = await axiosInstance.get(`/recipes/${id}?_expand=cuisine`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching recipe detail for recipe ID ${id}:`, error);
        throw new Error('Failed to fetch recipe detail. Please try again later.');
    }
};

type GetRecipeCommentsAPI = (id: string) => Promise<Comment[]>;
export const getRecipeComments: GetRecipeCommentsAPI = async (id) => {
    try {
        const response = await axiosInstance.get(`/recipes/${id}/comments`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching comments for recipe ID ${id}:`, error);
        throw new Error('Failed to fetch recipe comments. Please try again later.');
    }
};

export type PostRecipeCommentPayload = {
    id: string;
    comment: string;
    rating: number;
    date: string;
};

type PostRecipeCommentAPI = (payload: PostRecipeCommentPayload) => Promise<Comment>;
export const postComment: PostRecipeCommentAPI = async (payload) => {
    const { id, comment, rating, date } = payload;
    try {
        const response = await axiosInstance.post(`/recipes/${id}/comments`, { comment, rating, date });
        return response.data;
    } catch (error) {
        console.error(`Error posting comment for recipe ID ${id}:`, error);
        throw new Error('Failed to post comment. Please try again later.');
    }
};

type GetOptionsAPI = () => Promise<Option[]>;
export const getCuisines: GetOptionsAPI = async () => {
    try {
        const response = await axiosInstance.get(`/cuisines`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cuisines:', error);
        throw new Error('Failed to fetch cuisines. Please try again later.');
    }
};

export const getDifficulties: GetOptionsAPI = async () => {
    try {
        const response = await axiosInstance.get(`/difficulties`);
        return response.data;
    } catch (error) {
        console.error('Error fetching difficulties:', error);
        throw new Error('Failed to fetch difficulties. Please try again later.');
    }
};

export const getDiets: GetOptionsAPI = async () => {
    try {
        const response = await axiosInstance.get(`/diets`);
        return response.data;
    } catch (error) {
        console.error('Error fetching diets:', error);
        throw new Error('Failed to fetch diets. Please try again later.');
    }
};
