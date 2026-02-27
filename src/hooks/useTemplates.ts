import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { templateService } from "@/services/template.service";
import { getNextPageParam } from "@/lib/infinite-query";

export const templateKeys = {
  all: ["templates"] as const,
  lists: () => [...templateKeys.all, "list"] as const,
  list: (name?: string, isActive?: boolean) =>
    [...templateKeys.all, "list", name, isActive] as const,
  details: () => [...templateKeys.all, "detail"] as const,
  detail: (id: string) => [...templateKeys.details(), id] as const,
};

export const useTemplates = (
  name?: string,
  isActive?: boolean,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: templateKeys.list(name, isActive),
    queryFn: () => templateService.getTemplates(name, isActive),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export const useInfiniteTemplates = (name?: string, isActive?: boolean) =>
  useInfiniteQuery({
    queryKey: templateKeys.list(name, isActive),
    queryFn: ({ pageParam = 1 }) =>
      templateService.getTemplatesPage({
        page: pageParam as number,
        limit: 12,
        name,
        isActive,
      }),
    getNextPageParam,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });

export const useTemplateById = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: templateKeys.detail(id),
    queryFn: () => templateService.getTemplateById(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
};
