import { useQuery } from "@tanstack/react-query";
import { getRecipeComments } from "../api/calls";

export const useCommentsQuery = (id: string) => {
    return useQuery({
        queryKey: ["comments", id],
        queryFn: () => getRecipeComments(id),
        staleTime: 1000 * 60 * 60 * 1, // 1 hour
    });
};
