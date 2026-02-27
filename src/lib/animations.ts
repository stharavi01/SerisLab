import { Variants } from "framer-motion";

// Reusable animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const scaleInPerspective: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// Preset transition configs
export const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
};

export const smoothTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const quickTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const,
};

export const slowSmoothTransition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const, // Very smooth easing curve
};

// Viewport settings for scroll animations
export const defaultViewport = {
  once: true,
  amount: 0.1, // Trigger when 10% visible for earlier animation start
};

export const partialViewport = {
  once: true,
  amount: 0.1,
};

export const mockupViewport = {
  once: true, // Only animate once to prevent scroll flickering
  amount: 0.2, // Requires 20% of element visible before animating
};
