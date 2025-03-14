import Link from "next/link";
import { PopularRepo } from "../services/githubServices";

type RepoCardProps = {
  repo: PopularRepo;
};

const RepoCard = ({ repo }: RepoCardProps) => {
  return (
    <Link
      href={`/chat?owner=${repo.owner}&repo=${repo.name}`}
      className="card hover:shadow-hover animate-on-hover group"
    >
      <div className="mb-2 flex justify-between items-center">
        <h3 className="font-semibold text-lg group-hover:text-navy transition-default">
          {repo.name}
        </h3>
        <span className="badge bg-card-light text-text-secondary">
          {repo.language}
        </span>
      </div>

      <p className="text-sm text-text-secondary mb-2">{repo.owner}</p>
      <p className="text-sm mb-4">{repo.description}</p>

      <div className="flex items-center space-x-4 text-sm text-text-secondary">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {repo.stars.toLocaleString()}
        </div>

        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {repo.forks.toLocaleString()}
        </div>
      </div>
    </Link>
  );
};

export default RepoCard;
