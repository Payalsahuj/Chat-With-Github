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
