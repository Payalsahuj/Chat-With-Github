import Link from "next/link";

type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
};

const Header = ({ title, showBackButton = false }: HeaderProps) => {
  return (
    <header className="w-full py-4 border-b border-border-light bg-white">
      <div className="container mx-auto px-4 max-w-5xl flex items-center justify-between">
        {showBackButton ? (
          <Link
            href="/"
            className="flex items-center text-text-secondary hover:text-text-primary transition-default"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Search
          </Link>
        ) : (
          <div className="flex items-center">
            <svg
              className="h-6 w-6 mr-2 text-navy"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <h1 className="text-xl font-semibold">
              {title || "GitHub Repo Chat"}
            </h1>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
