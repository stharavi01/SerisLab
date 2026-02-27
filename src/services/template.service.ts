import { TemplateListResponse } from "../types/template.types";
import { Template } from "@/types/template.types";
import { PaginatedResponse } from "@/types/common.types";
import axiosInstance from "@/lib/axios";

export const templateService = {
  getTemplates: async (
    name?: string,
    isActive?: boolean,
  ): Promise<TemplateListResponse> => {
    const response = await axiosInstance.get("/templates", {
      params: { name, isActive },
    });
    return response.data.data.items;
  },

  getTemplatesPage: async (params: {
    page: number;
    limit: number;
    name?: string;
    isActive?: boolean;
  }): Promise<PaginatedResponse<Template>> => {
    const response = await axiosInstance.get("/templates", { params });
    return response.data.data;
  },

  getTemplateById: async (id: string): Promise<Template> => {
    const response = await axiosInstance.get(`/templates/${id}`);
    return response.data.data;
  },
};
