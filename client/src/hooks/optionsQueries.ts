import { useQuery } from "@tanstack/react-query";
import { getCuisines, getDiets, getDifficulties } from "../api/calls";

export const useCuisinesQuery = () => {
  return useQuery({
    queryKey: ["cuisines"],
    queryFn: getCuisines,
  });
};

export const useDifficultiesQuery = () => {
  return useQuery({
    queryKey: ["difficulties"],
    queryFn: getDifficulties,
  });
};

export const useDietsQuery = () => {
  return useQuery({
    queryKey: ["diets"],
    queryFn: getDiets,
  });
};
