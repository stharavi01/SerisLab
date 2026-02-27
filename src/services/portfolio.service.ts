import {
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
  PortfolioListResponse,
  Portfolio,
  ShowcaseItem,
} from "@/types/portfolio.types";
import type { PaginatedResponse } from "@/types/common.types";
import axiosInstance from "@/lib/axios";

export const portfolioService = {
  getPortfolios: async (status?: string): Promise<PortfolioListResponse> => {
    const params = status ? { status } : undefined;
    const response = await axiosInstance.get("/portfolios", { params });
    return response.data.data.items;
  },

  getPortfoliosPage: async (params: {
    page: number;
    limit: number;
    status?: string;
  }): Promise<PaginatedResponse<Portfolio>> => {
    const response = await axiosInstance.get("/portfolios", { params });
    return response.data.data;
  },

  getShowcase: async (params: {
    page: number;
    limit: number;
    template?: string;
    sort?: "trending" | "newest";
  }): Promise<PaginatedResponse<ShowcaseItem>> => {
    const response = await axiosInstance.get("/public/showcase", { params });
    return response.data.data;
  },

  updateShowcaseVisibility: async (
    id: string,
    hideFromShowcase: boolean,
  ): Promise<Portfolio> => {
    const response = await axiosInstance.patch(
      `/portfolios/${id}/showcase-visibility`,
      { hideFromShowcase },
    );
    return response.data.data;
  },

  getPortfolioById: async (id: string): Promise<Portfolio> => {
    const response = await axiosInstance.get(`/portfolios/${id}`);
    return response.data.data;
  },

  createPortfolio: async (data: CreatePortfolioRequest): Promise<Portfolio> => {
    const response = await axiosInstance.post("/portfolios", data);
    return response.data.data;
  },

  updatePortfolio: async (
    id: string,
    data: UpdatePortfolioRequest,
  ): Promise<Portfolio> => {
    const response = await axiosInstance.put(`/portfolios/${id}`, data);
    return response.data.data;
  },

  deletePortfolio: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/portfolios/${id}`);
  },

  // Update status: Use PUT endpoint for status changes
  updatePortfolioStatus: async (
    id: string,
    status: "private" | "public",
  ): Promise<Portfolio> => {
    const response = await axiosInstance.put(`/portfolios/${id}`, { status });
    return response.data.data;
  },

  unpublishPortfolio: async (id: string): Promise<Portfolio> => {
    const response = await axiosInstance.post(`/portfolios/${id}/unpublish`);
    return response.data.data;
  },

  // Set a portfolio as primary (must be public)
  setPrimaryPortfolio: async (id: string): Promise<Portfolio> => {
    const response = await axiosInstance.post(`/portfolios/${id}/set-primary`);
    return response.data.data;
  },

  // Get current user's primary portfolio
  getPrimaryPortfolio: async (): Promise<Portfolio> => {
    const response = await axiosInstance.get("/portfolios/me/primary");
    return response.data.data;
  },

  // for landing page preview (GitHub username)
  getPortfolioPreview: async (
    username: string,
    template?: string,
  ): Promise<Portfolio> => {
    const response = await axiosInstance.get(
      `/portfolios/preview/${username}`,
      {
        params: template ? { template } : undefined,
      },
    );
    return response.data.data;
  },

  // for landing page preview (Resume upload)
  getResumePreview: async (
    file: File,
    template?: string,
  ): Promise<Portfolio> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(
      "/portfolios/preview/resume",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        params: template ? { template } : undefined,
      },
    );
    return response.data.data;
  },

  uploadThumbnail: async (id: string, file: File): Promise<Portfolio> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(
      `/portfolios/${id}/upload-thumbnail`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.data.portfolio;
  },

  getPublicPortfolio: async (
    slug: string,
  ): Promise<{
    portfolio: Portfolio;
    isOwner: boolean;
    isPreview: boolean;
  }> => {
    const response = await axiosInstance.get(`/public/${slug}`);
    const data = response.data.data;

    const { isOwner, isPreview, ...portfolioData } = data;

    return {
      portfolio: portfolioData,
      isOwner: isOwner || false,
      isPreview: isPreview || false,
    };
  },

  // Duplicate portfolio
  duplicatePortfolio: async (
    portfolioId: string,
    data?: { newSlug?: string; newTitle?: string },
  ): Promise<Portfolio> => {
    const response = await axiosInstance.post(
      `/portfolios/${portfolioId}/duplicate`,
      data,
    );
    return response.data.data;
  },

  importGitHubProject: async (
    portfolioId: string,
    repoId: number,
  ): Promise<any> => {
    const response = await axiosInstance.post(
      `/portfolios/${portfolioId}/projects/import-github-repo`,
      { repoId },
    );
    return response.data;
  },
};
