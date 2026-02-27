import type { PaginatedResponse } from "@/types/common.types";
import type { InfiniteData } from "@tanstack/react-query";

export const getNextPageParam = <T>(last: PaginatedResponse<T>) =>
  last.meta.hasNext ? last.meta.page + 1 : undefined;

export const flattenPages = <T>(
  data: InfiniteData<PaginatedResponse<T>> | undefined,
): T[] => data?.pages.flatMap((p) => p.items) ?? [];
