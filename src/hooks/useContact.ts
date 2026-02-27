import { useMutation } from "@tanstack/react-query";
import { contactService } from "@/services/contact.service";
import type { ContactFormData } from "@/services/contact.service";
import { toast } from "sonner";

/**
 * Hook to submit contact form to platform admin
 */
export function useSubmitContactForm() {
  return useMutation({
    mutationFn: (data: ContactFormData) =>
      contactService.submitContactForm(data),
    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Thanks for contacting us! We'll respond within 24 hours.",
      );
    },
    onError: (error: any) => {
      toast.error(
        error.userMessage || "Failed to send message. Please try again.",
      );
    },
  });
}

/**
 * Hook to submit contact form to portfolio owner
 */
export function useSubmitPortfolioContact(portfolioSlug: string) {
  return useMutation({
    mutationFn: (
      data: Omit<ContactFormData, "category"> & { category?: string },
    ) => contactService.submitPortfolioContact(portfolioSlug, data),
    onSuccess: (response) => {
      toast.success(
        response.data?.message ||
          "Thanks for contacting us! We'll respond within 24 hours.",
      );
    },
    onError: (error: any) => {
      toast.error(
        error.userMessage || "Failed to send message. Please try again.",
      );
    },
  });
}
