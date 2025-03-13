import React from "react";
import Header from "./Header";
import { useRouter } from "next/navigation";

type ErrorStateProps = {
  errorMessage: string;
};

const ErrorState = ({ errorMessage }: ErrorStateProps) => {
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showBackButton />
      <div className="flex justify-center items-center flex-1">
        <div className="card max-w-md w-full text-center p-8">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-text-secondary mb-6">{errorMessage}</p>
          <button onClick={() => navigate.push("/")} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
