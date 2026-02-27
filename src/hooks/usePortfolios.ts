import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { portfolioService } from "@/services/portfolio.service";
import {
  Portfolio,
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
  DuplicatePortfolioRequest,
} from "@/types/portfolio.types";
import { getNextPageParam } from "@/lib/infinite-query";
import { toast } from "sonner";

export const portfolioKeys = {
  all: ["portfolios"] as const,
  lists: () => [...portfolioKeys.all, "list"] as const,
  list: (status?: string) => [...portfolioKeys.lists(), { status }] as const,
  details: () => [...portfolioKeys.all, "detail"] as const,
  detail: (id: string) => [...portfolioKeys.details(), id] as const,
  preview: (username: string, template?: string) =>
    [...portfolioKeys.all, "preview", username, template ?? "default"] as const,
  public: (slug: string) => [...portfolioKeys.all, "public", slug] as const,
};

export const usePortfolios = (status?: string) => {
  return useQuery({
    queryKey: portfolioKeys.list(status),
    queryFn: () => portfolioService.getPortfolios(status),
  });
};

export const usePortfolioById = (id: string) => {
  return useQuery({
    queryKey: portfolioKeys.detail(id),
    queryFn: () => portfolioService.getPortfolioById(id),
    enabled: !!id,
  });
};

export const usePortfolioPreview = (username: string, template?: string) => {
  return useQuery({
    queryKey: portfolioKeys.preview(username, template),
    queryFn: () => portfolioService.getPortfolioPreview(username, template),
    enabled: !!username,
    staleTime: 10 * 60 * 1000,
  });
};

export const useResumePreview = () => {
  return useMutation({
    mutationFn: ({ file, template }: { file: File; template?: string }) =>
      portfolioService.getResumePreview(file, template),
    onError: (error: any) => {
      console.error("Failed to generate preview from resume:", error);
      // Don't show toast here - let the component handle the error display
    },
  });
};

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePortfolioRequest) =>
      portfolioService.createPortfolio(data),
    onSuccess: (portfolio) => {
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
      queryClient.setQueryData(portfolioKeys.detail(portfolio.id), portfolio);
      // Thumbnail is generated async on the backend (~2–5s). Refetch after 4s
      // so the card swaps from skeleton to the real image automatically.
      if (!portfolio.thumbnail) {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
        }, 4000);
      }
    },
    onError: (error: any) => {
      console.error("Failed to create portfolio:", error);
      toast.error(error.userMessage || "Failed to create portfolio");
    },
  });
};

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePortfolioRequest }) =>
      portfolioService.updatePortfolio(id, data),
    onSuccess: async (updatedPortfolio, { id }) => {
      queryClient.setQueryData(portfolioKeys.detail(id), updatedPortfolio);

      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.detail(id) });

      if (updatedPortfolio.slug) {
        queryClient.invalidateQueries({
          queryKey: portfolioKeys.public(updatedPortfolio.slug),
        });
      }

      if (updatedPortfolio.slug) {
        await portfolioService.revalidatePortfolio(updatedPortfolio.slug);

        if (updatedPortfolio.status === "public") {
          toast.success(
            "Changes saved! Live page will update in a few seconds.",
          );
        } else {
          toast.success("Portfolio updated successfully");
        }
      } else {
        toast.success("Portfolio updated successfully");
      }
    },
    onError: (error: any) => {
      console.error("Failed to update portfolio:", error);
      toast.error(error.userMessage || "Failed to update portfolio");
    },
  });
};

export const useDeletePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => portfolioService.deletePortfolio(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: portfolioKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
      toast.success("Portfolio deleted successfully");
    },
    onError: (error: any) => {
      console.error("Failed to delete portfolio:", error);
      toast.error(error.userMessage || "Failed to delete portfolio");
    },
  });
};

export const usePublishPortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "private" | "public";
    }) => portfolioService.updatePortfolioStatus(id, status),
    onSuccess: async (updatedPortfolio, { id, status }) => {
      queryClient.setQueryData(portfolioKeys.detail(id), updatedPortfolio);
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });

      if (status === "public") {
        await portfolioService.revalidatePortfolio(updatedPortfolio.slug);
      }

      if (status === "public" && updatedPortfolio.isPrimary) {
        toast.success(
          "Portfolio published! Your primary portfolio is now live.",
        );
      } else if (status === "public") {
        toast.success(
          "Portfolio published! Live page will update in a few seconds.",
        );
      } else {
        toast.success("Portfolio is now private");
        // if (updatedPortfolio.isPrimary === false) {
        //   toast.info(
        //     "Another public portfolio (if any) was promoted to primary",
        //   );
        // }
      }
    },
    onError: (error: any) => {
      // PLAN_LIMIT_EXCEEDED is handled by the UI (ProUpgradeModal) — skip toast
      if (error?.response?.data?.error?.code === "PLAN_LIMIT_EXCEEDED") return;
      console.error("Failed to update portfolio status:", error);
      toast.error(error.userMessage || "Failed to update portfolio status");
    },
  });
};

export const useUploadThumbnail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      portfolioService.uploadThumbnail(id, file),
    onSuccess: (updatedPortfolio, { id }) => {
      queryClient.setQueryData(portfolioKeys.detail(id), updatedPortfolio);
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
    },
    onError: (error: any) => {
      console.error("Failed to upload thumbnail:", error);
      toast.error(error.userMessage || "Failed to upload thumbnail");
    },
  });
};

export const useUnpublishPortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => portfolioService.unpublishPortfolio(id),
    onSuccess: async (unpublishedPortfolio, id) => {
      queryClient.setQueryData(portfolioKeys.detail(id), unpublishedPortfolio);
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });

      await portfolioService.revalidatePortfolio(unpublishedPortfolio.slug);

      toast.success("Portfolio unpublished. Public page is now hidden.");
      // if (unpublishedPortfolio.isPrimary === false) {
      //   toast.info("Another public portfolio (if any) was promoted to primary");
      // }
    },
    onError: (error: any) => {
      console.error("Failed to unpublish portfolio:", error);
      toast.error(error.userMessage || "Failed to unpublish portfolio");
    },
  });
};

export const useSetPrimaryPortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => portfolioService.setPrimaryPortfolio(id),
    onSuccess: async (primaryPortfolio, id) => {
      queryClient.setQueryData(portfolioKeys.detail(id), primaryPortfolio);
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });

      if (primaryPortfolio.status === "public") {
        await portfolioService.revalidatePortfolio(primaryPortfolio.slug);
      }

      toast.success("This is now your primary portfolio!");
    },
    onError: (error: any) => {
      console.error("Failed to set portfolio as primary:", error);
      toast.error(
        error.userMessage ||
          "Failed to set portfolio as primary. Make sure it's public first.",
      );
    },
  });
};

export const usePrimaryPortfolio = () => {
  return useQuery({
    queryKey: [...portfolioKeys.all, "primary"],
    queryFn: () => portfolioService.getPrimaryPortfolio(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMakePrimaryPortfolio = () => {
  // Deprecated: Use useSetPrimaryPortfolio instead
  return useSetPrimaryPortfolio();
};

export const useInfinitePortfolios = (status?: string) => {
  return useInfiniteQuery({
    queryKey: portfolioKeys.list(status),
    queryFn: ({ pageParam = 1 }) =>
      portfolioService.getPortfoliosPage({
        page: pageParam as number,
        limit: 10,
        status,
      }),
    getNextPageParam,
    initialPageParam: 1,
  });
};

export const useUpdateShowcaseVisibility = () => {
  const queryClient = useQueryClient();
  const primaryKey = [...portfolioKeys.all, "primary"];

  return useMutation({
    mutationFn: ({
      id,
      hideFromShowcase,
    }: {
      id: string;
      hideFromShowcase: boolean;
    }) => portfolioService.updateShowcaseVisibility(id, hideFromShowcase),
    onMutate: async ({ id, hideFromShowcase }) => {
      await queryClient.cancelQueries({ queryKey: primaryKey });
      await queryClient.cancelQueries({ queryKey: portfolioKeys.lists() });

      const previousPrimary = queryClient.getQueryData(primaryKey);
      const previousLists = queryClient.getQueriesData<Portfolio[]>({
        queryKey: portfolioKeys.lists(),
      });

      queryClient.setQueryData(primaryKey, (old: any) =>
        old ? { ...old, hideFromShowcase } : old,
      );

      queryClient.setQueriesData<Portfolio[]>(
        { queryKey: portfolioKeys.lists() },
        (old) =>
          Array.isArray(old)
            ? old.map((p) => (p.id === id ? { ...p, hideFromShowcase } : p))
            : old,
      );

      return { previousPrimary, previousLists };
    },
    onError: (error: any, _vars, context) => {
      if (context?.previousPrimary !== undefined) {
        queryClient.setQueryData(primaryKey, context.previousPrimary);
      }
      if (context?.previousLists) {
        for (const [queryKey, data] of context.previousLists) {
          queryClient.setQueryData(queryKey, data);
        }
      }
      toast.error(error.userMessage || "Failed to update visibility");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: primaryKey });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
    },
    onSuccess: () => {
      toast.success("Showcase visibility updated");
    },
  });
};

export const usePublicPortfolio = (slug: string) => {
  return useQuery({
    queryKey: portfolioKeys.public(slug),
    queryFn: () => portfolioService.getPublicPortfolio(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

export const useDuplicatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      portfolioId,
      data,
    }: {
      portfolioId: string;
      data?: DuplicatePortfolioRequest;
    }) => portfolioService.duplicatePortfolio(portfolioId, data),
    onSuccess: (duplicatedPortfolio) => {
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
      queryClient.setQueryData(
        portfolioKeys.detail(duplicatedPortfolio.id),
        duplicatedPortfolio,
      );
      toast.success("Portfolio duplicated successfully");
    },
    onError: (error: any) => {
      console.error("Failed to duplicate portfolio:", error);
      toast.error(error.userMessage || "Failed to duplicate portfolio");
    },
  });
};

export const useImportGitHubProject = (portfolioId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (repoId: number) =>
      portfolioService.importGitHubProject(portfolioId!, repoId),
    onSuccess: () => {
      // Invalidate the portfolio detail to reflect the new project
      if (portfolioId) {
        queryClient.invalidateQueries({
          queryKey: portfolioKeys.detail(portfolioId),
        });
      }
      toast.success("GitHub project imported successfully!");
    },
    onError: (error: any) => {
      if (error?.response?.data?.error?.code === "PLAN_LIMIT_EXCEEDED") return;
      console.error("Failed to import GitHub project:", error);
      toast.error(error.userMessage || "Failed to import GitHub project");
    },
  });
};
