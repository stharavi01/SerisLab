"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PortfolioContentProps {
  portfolio: any;
  isInitialState?: boolean;
  screenshotPath?: string;
}

export function PortfolioContent({
  portfolio,
  isInitialState = false,
  screenshotPath,
}: PortfolioContentProps) {
  if (isInitialState && screenshotPath) {
    return (
      <div className="h-full w-full bg-white dark:bg-neutral-950">
        <Image
          src={screenshotPath}
          alt="Serislab Editor Preview"
          fill
          className="object-cover object-top"
          priority
          quality={75}
        />
      </div>
    );
  }

  if (portfolio) {
    const hero = portfolio.sections?.find((s: any) => s.type === "hero");
    const about = portfolio.sections?.find((s: any) => s.type === "about");
    const skills = portfolio.sections?.find((s: any) => s.type === "skills");
    const projects = portfolio.sections?.find((s: any) => s.type === "projects");

    const name = hero?.data?.name || portfolio.title || "Portfolio";
    const title = hero?.data?.title || hero?.data?.subtitle || "";
    const bio = about?.data?.bio || hero?.data?.bio || "";
    const avatar = hero?.data?.avatar || portfolio.user?.avatar || null;
    const skillList: string[] = skills?.data?.skills?.slice(0, 8) || [];
    const projectList: any[] = projects?.data?.projects?.slice(0, 3) || [];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-full bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 p-6 space-y-6"
      >
        {/* Hero */}
        <div className="flex items-center gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          {avatar && (
            <Image
              src={avatar}
              alt={name}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-lg font-bold leading-tight">{name}</h1>
            {title && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {title}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-4">
            {bio}
          </p>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skillList.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projectList.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
              Projects
            </p>
            <div className="space-y-2">
              {projectList.map((project: any, i: number) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
                >
                  <p className="text-sm font-semibold truncate">
                    {project.name || project.title}
                  </p>
                  {project.description && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return null;
}
