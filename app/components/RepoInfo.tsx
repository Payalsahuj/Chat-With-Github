import { Repository } from "../services/githubServices";

type RepoInfoProps = {
  repository: Repository;
};

const RepoInfo = ({ repository }: RepoInfoProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center mb-4">
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <h2 className="text-xl font-semibold">{repository.name}</h2>
          <p className="text-text-secondary">@{repository.owner.login}</p>
        </div>
      </div>

      <p className="text-text-primary text-[12px] mb-2 border-l-2 border-navy-light pl-3 italic">
        {repository.description || "No description provided."}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div>
            <div className="text-sm text-text-secondary">Stars</div>
            <div className="font-semibold">
              {repository.stargazers_count.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <div className="text-sm text-text-secondary">Forks</div>
            <div className="font-semibold">
              {repository.forks_count.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-purple-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <div className="text-sm text-text-secondary">Issues</div>
            <div className="font-semibold">
              {repository.open_issues_count.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <div className="text-sm text-text-secondary">Watchers</div>
            <div className="font-semibold">
              {repository.watchers_count.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-text-secondary mb-1">
          Primary language:
        </div>
        <div className="tag">
          <span className="inline-block w-3 h-3 rounded-full bg-github-green mr-2"></span>
          {repository.language || "Not specified"}
        </div>
      </div>

      {repository.topics && repository.topics.length > 0 && (
        <div className="mb-4">
          <div className="text-sm text-text-secondary mb-1">Topics:</div>
          <div className="flex flex-wrap gap-2">
            {repository.topics.map((topic) => (
              <span key={topic} className="tag">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 text-sm">
        <div>
          <span className="text-text-secondary">Created:</span>{" "}
          {formatDate(repository.created_at)}
        </div>
        <div>
          <span className="text-text-secondary">Updated:</span>{" "}
          {formatDate(repository.updated_at)}
        </div>
      </div>

      <a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full mt-4 inline-flex justify-center items-center text-center"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        View on GitHub
      </a>
    </div>
  );
};

export default RepoInfo;
