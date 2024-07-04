import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/calls";
import { Option } from "../types/api";

type UseRecipiesProps = {
  search?: string;
  cuisineId: Option["id"] | string;
  difficultyId: Option["id"] | string;
  dietId: Option["id"] | string;
};

const useRecipesQuery = (props: UseRecipiesProps) => {
  const { search, cuisineId, difficultyId, dietId } = props;
  return useInfiniteQuery({
    queryKey: ["recipes", search, cuisineId, difficultyId, dietId],
    queryFn: async ({ pageParam }) =>
      getRecipes({
        _page: pageParam,
        q: search ? search : undefined,
        cuisineId: cuisineId ? cuisineId : undefined,
        difficultyId: difficultyId ? difficultyId : undefined,
        dietId: dietId ? dietId : undefined,
      }),
    initialPageParam: 0,
    placeholderData: (previousData) => previousData,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 6) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

export default useRecipesQuery;
