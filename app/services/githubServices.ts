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

// Function to get repository information
export const getRepositoryInfo = async (
  owner: string,
  repo: string
): Promise<Repository> => {
  try {
    // Add a timestamp to prevent caching issues
    const timestamp = new Date().getTime();
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}?timestamp=${timestamp}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository ${owner}/${repo} not found`);
      } else if (response.status === 403) {
        throw new Error("API rate limit exceeded. Please try again later.");
      } else {
        throw new Error(
          `Failed to fetch repository: ${response.status} ${response.statusText}`
        );
      }
    }

    const data = await response.json();

    // Ensure all required fields exist, setting defaults for nullable fields
    return {
      id: data.id,
      name: data.name,
      full_name: data.full_name,
      owner: {
        login: data.owner.login,
        avatar_url: data.owner.avatar_url,
      },
      description: data.description || "No description provided",
      html_url: data.html_url,
      stargazers_count: data.stargazers_count || 0,
      watchers_count: data.watchers_count || 0,
      forks_count: data.forks_count || 0,
      open_issues_count: data.open_issues_count || 0,
      language: data.language || "Not specified",
      topics: data.topics || [],
      created_at: data.created_at,
      updated_at: data.updated_at,
      visibility: data.visibility || "public",
    };
  } catch (error) {
    console.error("Error fetching repository:", error);
    throw error;
  }
};
