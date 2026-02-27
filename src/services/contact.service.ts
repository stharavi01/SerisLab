import axiosInstance from "@/lib/axios";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  category: "general" | "bug" | "feature" | "question";
}

export interface ContactResponse {
  success: boolean;
  data: {
    success: boolean;
    message: string;
  };
  message: string;
  timestamp: string;
  path: string;
  statusCode: number;
}

export const contactService = {
  /**
   * Submit contact form to platform admin
   */
  submitContactForm: async (
    data: ContactFormData,
  ): Promise<ContactResponse> => {
    const response = await axiosInstance.post("/contact", data);
    return response.data;
  },

  /**
   * Submit contact form to portfolio owner
   */
  submitPortfolioContact: async (
    portfolioSlug: string,
    data: Omit<ContactFormData, "category"> & { category?: string },
  ): Promise<ContactResponse> => {
    const response = await axiosInstance.post(
      `/portfolios/${portfolioSlug}/contact`,
      data,
    );
    return response.data;
  },
};
