"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import { useSubmitContactForm } from "@/hooks/useContact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fadeInUp,
  fadeInScale,
  fadeIn,
  smoothTransition,
  defaultViewport,
} from "@/lib/animations";

type ContactCategory = "general" | "bug" | "feature" | "question";

interface FormData {
  name: string;
  email: string;
  message: string;
  category: ContactCategory;
}

const categories = [
  { value: "general" as ContactCategory, label: "General Inquiry", icon: "💬" },
  { value: "bug" as ContactCategory, label: "Bug Report", icon: "🐛" },
  { value: "feature" as ContactCategory, label: "Feature Request", icon: "💡" },
  { value: "question" as ContactCategory, label: "Question", icon: "❓" },
];

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    category: "general",
  });

  const submitContactMutation = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitContactMutation.mutateAsync(formData);

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        message: "",
        category: "general",
      });
    } catch (error: any) {
      // Error is handled by the hook's onError callback
      console.error("Failed to submit contact form:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-white dark:bg-neutral-950"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-100/50 via-transparent to-transparent dark:from-neutral-900/50 dark:via-transparent dark:to-transparent pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          transition={smoothTransition}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-6 shadow-sm"
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
          >
            <Mail className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.2 }}
          >
            We&apos;d Love to Hear From You
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-neutral-600 dark:text-neutral-400"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.3 }}
          >
            Have questions, feedback, or need help? Drop us a message and
            we&apos;ll get back to you within 24 hours.
          </motion.p>
        </motion.div>

        {/* Contact Form Container */}
        <motion.div
          className="max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={smoothTransition}
        >
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 px-5 py-6 md:px-10 md:py-10 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Your Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full h-auto px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-sage))] focus:border-[hsl(var(--accent-sage))] shadow-none"
                />
              </div>

              {/* Email Field */}
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full h-auto px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-sage))] focus:border-[hsl(var(--accent-sage))] shadow-none"
                />
              </div>

              {/* Category Field */}
              <div>
                <Label
                  htmlFor="category"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  What&apos;s this about?
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: value as ContactCategory,
                    }))
                  }
                >
                  <SelectTrigger className="w-full !h-auto px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-sage))] focus-visible:border-[hsl(var(--accent-sage))] shadow-none cursor-pointer min-h-[44px] md:min-h-[48px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message Field */}
              <div>
                <Label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-sage))] focus-visible:border-[hsl(var(--accent-sage))] shadow-none resize-none min-h-[160px]"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={submitContactMutation.isPending}
                className="w-full px-6 py-2.5 md:py-3 h-auto rounded-xl bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 text-white dark:text-neutral-900 disabled:text-neutral-500 dark:disabled:text-neutral-400 font-semibold text-sm md:text-base shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 hover:scale-[1.02] disabled:scale-100"
              >
                {submitContactMutation.isPending ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Additional Contact Info */}
          <motion.div
            className="mt-8 text-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.4 }}
          >
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Prefer email?{" "}
              <a
                href="mailto:hello@serislab.com"
                className="font-medium text-neutral-900 dark:text-neutral-50 hover:text-[hsl(var(--accent-sage))] dark:hover:text-[hsl(var(--accent-sage))] transition-colors"
              >
                hello@serislab.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
