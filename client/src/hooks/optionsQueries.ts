import { useQuery } from "@tanstack/react-query";
import { getCuisines, getDiets, getDifficulties } from "../api/calls";

export const useCuisinesQuery = () => {
  return useQuery({
    queryKey: ["cuisines"],
    queryFn: getCuisines,
    staleTime: 1000 * 60 * 60 * 24 * 1, // 1 day
  });
};

export const useDifficultiesQuery = () => {
  return useQuery({
    queryKey: ["difficulties"],
    queryFn: getDifficulties,
    staleTime: 1000 * 60 * 60 * 24 * 1, // 1 day
  });
};

export const useDietsQuery = () => {
  return useQuery({
    queryKey: ["diets"],
    queryFn: getDiets,
    staleTime: 1000 * 60 * 60 * 24 * 1, // 1 day
  });
};
