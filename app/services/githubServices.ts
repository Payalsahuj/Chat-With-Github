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

// Function to parse a GitHub repository URL or "owner/repo" format
export const parseGitHubRepo = (
  input: string
): { owner: string; repo: string } | null => {
  // Cleanup the input
  const cleanInput = input.trim();

  // Check if it's in "owner/repo" format
  const simpleFormat = /^([^\/]+)\/([^\/]+)$/;
  const simpleMatch = cleanInput.match(simpleFormat);

  if (simpleMatch) {
    return { owner: simpleMatch[1], repo: simpleMatch[2] };
  }

  // Check if it's a GitHub URL
  // This regex handles various GitHub URL formats including:
  // - https://github.com/owner/repo
  // - http://github.com/owner/repo
  // - github.com/owner/repo
  // - www.github.com/owner/repo
  const urlFormat =
    /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/\?#]+)/;
  const urlMatch = cleanInput.match(urlFormat);

  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2] };
  }

  return null;
};

export async function getRepoFilesContent(
  owner: string,
  repo: string,
  branch = null,
  maxFiles = 6,
  id = 0
) {
  const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_KEY || ""
  );
  try {
    // Get the default branch if none specified
    if (!branch) {
      const repoResponse = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            // Add token for higher rate limits if needed
            // 'Authorization': 'token YOUR_GITHUB_TOKEN'
          },
        }
      );
      branch = repoResponse.data.default_branch;
    }

    console.log(`Getting files from ${owner}/${repo}, branch: ${branch}`);

    // Get the tree of all files in the repository
    const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
    const treeResponse = await axios.get(treeUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        // 'Authorization': 'token YOUR_GITHUB_TOKEN'
      },
    });

    if (treeResponse.data.truncated) {
      console.warn(
        "Warning: The repository tree is too large and was truncated by GitHub API"
      );
    }

    // Array to hold all file content
    const files = [];
    let count = 0;
    // Process each file
    for (const item of treeResponse.data.tree) {
      // Skip directories package-lock, yarn lock etc
      const toAvoidFiles = ["yarn.lock", "package-lock.json"];
      if (item.type !== "blob" || toAvoidFiles.includes(item.path)) continue;
      count++;

      if (count > maxFiles) break;
      try {
        // Get raw file content
        const contentUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${item.path}`;
        const contentResponse = await axios.get(contentUrl, {
          responseType: "text",
          // Handle binary files gracefully
          transformResponse: [(data: any) => data],
        });
        const embedding = await TextToEmbedding(
          `//${item.path}\n${contentResponse.data}`
        );
        console.log({ id });
        await supabase
          .from("embeddings")
          .insert({
            repo_id: id,
            content: `//${item.path}\n${contentResponse.data}`,
            embedding,
          })
          .then((res) => {
            console.log(res);
          });

        // Add to our files array
        files.push({
          path: item.path,
          name: item.path.split("/").pop(),
          size: item.size,
          content: contentResponse.data,
          sha: item.sha,
        });

        console.log(`Processed: ${item.path}`);

        // Add a small delay to avoid hitting rate limits
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error: any) {
        console.error(`Error processing file ${item.path}:`);
        // Add file with error information
        files.push({
          path: item.path,
          name: item.path.split("/").pop(),
          size: item.size,
          error: error.message,
          sha: item.sha,
        });
      }
    }

    return {
      repository: `${owner}/${repo}`,
      branch: branch,
      fileCount: files.length,
      files: files,
    };
  } catch (error: any) {
    console.error("Error fetching repository:", error.message);
    if (error.response && error.response.status === 403) {
      console.error(
        "Rate limit may have been exceeded. Current rate limit status:"
      );
      console.error(
        `Remaining: ${error.response.headers["x-ratelimit-remaining"]}`
      );
      console.error(
        `Resets at: ${new Date(
          error.response.headers["x-ratelimit-reset"] * 1000
        )}`
      );
    }
    throw error;
  }
}
