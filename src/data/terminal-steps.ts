import { LoadingStep } from "@/types/common.types";

// Rule: outputs describe the ONGOING PROCESS — never fake stats or numbers.
// The actual results (repos, languages, skills) appear in the generated portfolio.
// Only the username/profile confirmation is safe since we have it.

export function getGitHubSteps(username?: string): LoadingStep[] {
  const handle = username || "user";
  return [
    {
      id: "fetch",
      command: `curl api.github.com/users/${handle}`,
      output: `200 OK  ·  @${handle} found`,
      pauseAfter: 700,
    },
    {
      id: "repos",
      command: "reading your repositories...",
      output: "scanning commit history...",
      pauseAfter: 900,
    },
    {
      id: "rank",
      command: "identifying your top projects...",
      output: "ranking by activity + impact...",
      pauseAfter: 850,
    },
    {
      id: "stack",
      command: "detecting your tech stack...",
      output: "reading language data...",
      pauseAfter: 750,
    },
    {
      id: "ai",
      command: "writing project descriptions...",
      output: "AI generating content...",
      pauseAfter: 1100,
    },
    {
      id: "build",
      command: "building your portfolio...",
      output: "compiling sections...",
      pauseAfter: 650,
    },
  ];
}

export function getResumeSteps(): LoadingStep[] {
  return [
    {
      id: "upload",
      command: "uploading resume.pdf",
      output: "received  ·  extracting text...",
      pauseAfter: 700,
    },
    {
      id: "parse",
      command: "parsing document structure...",
      output: "reading sections...",
      pauseAfter: 900,
    },
    {
      id: "experience",
      command: "identifying your experience...",
      output: "mapping career history...",
      pauseAfter: 900,
    },
    {
      id: "skills",
      command: "extracting your skills...",
      output: "building skills list...",
      pauseAfter: 800,
    },
    {
      id: "ai",
      command: "writing AI descriptions...",
      output: "enhancing with context...",
      pauseAfter: 1100,
    },
    {
      id: "build",
      command: "assembling your portfolio...",
      output: "compiling sections...",
      pauseAfter: 650,
    },
  ];
}

// Backwards compat
export const TERMINAL_STEPS: LoadingStep[] = getGitHubSteps();
export const RESUME_TERMINAL_STEPS: LoadingStep[] = getResumeSteps();
