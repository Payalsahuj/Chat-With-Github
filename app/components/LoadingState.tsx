import React from "react";
import Header from "./Header";

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showBackButton title={`Loading...`} />
      <div className="flex justify-center items-center flex-1">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-navy border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-text-secondary">
            Loading repository information...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
