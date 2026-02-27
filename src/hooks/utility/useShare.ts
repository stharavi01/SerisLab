import { useState } from "react";
import { toast } from "sonner";

interface ShareData {
  title: string;
  text?: string;
  url: string;
}

interface UseShareReturn {
  share: (data: ShareData) => Promise<void>;
  isSharing: boolean;
  canShare: boolean;
  isSupported: boolean;
}

export function useShare(): UseShareReturn {
  const [isSharing, setIsSharing] = useState(false);

  const isSupported = typeof navigator !== "undefined" && !!navigator.share;
  const canShare = isSupported;

  const share = async (data: ShareData) => {
    setIsSharing(true);

    try {
      if (navigator.share) {
        await navigator.share({
          title: data.title,
          text: data.text || data.title,
          url: data.url,
        });
      } else {
        await navigator.clipboard.writeText(data.url);
        toast.success("Link copied to clipboard");
      }
    } catch (err) {
      const error = err as Error;

      if (error.name !== "AbortError") {
        console.error("Error sharing:", error);

        try {
          await navigator.clipboard.writeText(data.url);
          toast.success("Link copied to clipboard");
        } catch (clipboardErr) {
          toast.error("Failed to share. Please try again.");
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  return {
    share,
    isSharing,
    canShare,
    isSupported,
  };
}
