"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Copy,
  Check,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title: string;
  description?: string;
}

/**
 * Reusable share modal for desktop
 * Shows copy link + social media share options
 */
export function ShareModal({
  open,
  onOpenChange,
  url,
  title,
  description,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const shareOptions = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-black/10 hover:text-black dark:hover:text-white",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-blue-700/10 hover:text-blue-700",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "hover:bg-green-500/10 hover:text-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "hover:bg-gray-500/10 hover:text-gray-600",
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this portfolio: ${url}`)}`,
    },
  ];

  const handleSocialShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Portfolio</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="space-y-4">
          {/* Copy Link Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Link</label>
            <div className="flex items-center gap-2">
              <Input
                value={url}
                readOnly
                className="flex-1"
                onClick={(e) => e.currentTarget.select()}
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Social Share Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share via</label>
            <div className="grid grid-cols-4 gap-2">
              {shareOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.name}
                    variant="outline"
                    className={`flex flex-col items-center gap-2 h-auto py-3 ${option.color} transition-colors`}
                    onClick={() => handleSocialShare(option.url)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{option.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
