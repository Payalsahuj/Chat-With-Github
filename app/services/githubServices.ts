// Types
export type Repository = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string | null;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  visibility: string;
};

export type PopularRepo = {
  name: string;
  owner: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
};

// Popular repos data
export const popularRepos: PopularRepo[] = [
  {
    name: "next.js",
    owner: "vercel",
    description: "The React Framework for the Web",
    language: "JavaScript",
    stars: 114000,
    forks: 25000,
  },
  {
    name: "react",
    owner: "facebook",
    description: "A JavaScript library for building user interfaces",
    language: "JavaScript",
    stars: 215000,
    forks: 45000,
  },
  {
    name: "vscode",
    owner: "microsoft",
    description: "Visual Studio Code",
    language: "TypeScript",
    stars: 152000,
    forks: 28000,
  },
];
