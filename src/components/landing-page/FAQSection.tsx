"use client";

import { useState } from "react";
import { landingContent } from "@/data/landing-content";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUp,
  fadeInScale,
  staggerContainer,
  staggerItem,
  smoothTransition,
  quickTransition,
  defaultViewport,
} from "@/lib/animations";
import { FAQPageSchema } from "@/components/shared/StructuredData";

export default function FAQSection() {
  const { faq } = landingContent;
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (questionId: string) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <>
      <FAQPageSchema
        faqs={faq.questions.map((q) => ({
          question: q.question,
          answer: q.answer,
        }))}
      />
      <section
        id="faq"
        className="relative py-20 md:py-32 bg-neutral-50 dark:bg-neutral-900"
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
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
              <HelpCircle className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {faq.sectionBadge}
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
              {faq.headline}
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ...smoothTransition, delay: 0.3 }}
            >
              {faq.subheadline}
            </motion.p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            className="max-w-3xl mx-auto space-y-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {faq.questions.map((item, index) => {
              const isOpen = openQuestion === item.id;

              return (
                <motion.div
                  key={item.id}
                  className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden transition-all"
                  variants={staggerItem}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="w-full px-3 py-3 flex items-start gap-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      {index + 1}
                    </div>

                    <span className="flex-1 text-base font-semibold text-neutral-900 dark:text-neutral-50 leading-relaxed">
                      {item.question}
                    </span>

                    <ChevronDown
                      className={`flex-shrink-0 w-5 h-5 text-neutral-500 dark:text-neutral-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={quickTransition}
                        className="overflow-hidden"
                      >
                        <div className="pl-14 pr-6 pb-5">
                          <p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
