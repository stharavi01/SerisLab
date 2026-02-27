import { useInfiniteQuery } from "@tanstack/react-query";
import { portfolioService } from "@/services/portfolio.service";
import { getNextPageParam } from "@/lib/infinite-query";

export const showcaseKeys = {
  all: ["showcase"] as const,
  list: (template?: string, sort?: string) =>
    [...showcaseKeys.all, "list", { template, sort }] as const,
};

export const useShowcase = (
  template?: string,
  sort?: "trending" | "newest",
) => {
  return useInfiniteQuery({
    queryKey: showcaseKeys.list(template, sort),
    queryFn: ({ pageParam = 1 }) =>
      portfolioService.getShowcase({
        page: pageParam as number,
        limit: 12,
        template,
        sort,
      }),
    getNextPageParam,
    initialPageParam: 1,
    staleTime: 0,
  });
};
