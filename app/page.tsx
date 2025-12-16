"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import RepoCard from "./components/RepoCard";
import { popularRepos, parseGitHubRepo } from "./services/githubServices";
import { useRouter } from "next/navigation";
import axios from "axios";

const Index = () => {
  const [repoInput, setRepoInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useRouter();

  const handleStartChatting = async () => {
    const parsedRepo = parseGitHubRepo(repoInput);

    if (!parsedRepo) {
      setError(
        'Please enter a valid GitHub repository URL or "owner/repo" format'
      );
      return;
    }

    setError("");
    navigate.push(`/chat?owner=${parsedRepo.owner}&repo=${parsedRepo.repo}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 max-w-5xl py-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-semibold mb-3 text-navy">
            Chat with Github Repo
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Enter any GitHub repository or select from popular ones to chat
            about its stats and details
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-card border border-border-light p-8 mb-10 animate-slide-up">
          <h2 className="text-xl font-semibold mb-2">
            Enter a GitHub Repository
          </h2>
          <p className="text-text-secondary mb-6">
            {`Paste a GitHub repository URL or enter in "owner/repo" format`}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStartChatting();
            }}
            className="flex flex-col sm:flex-row items-center mb-2"
          >
            <div className="flex items-center w-full mb-4 sm:mb-0">
              <div className="bg-card-light p-3 rounded-l border border-r-0 border-border">
                <svg
                  className="w-6 h-6 text-text-secondary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="https://github.com/vercel/next.js or vercel/next.js"
                value={repoInput}
                onChange={(e) => {
                  setRepoInput(e.target.value);
                  if (error) setError("");
                }}
                className="w-full px-4 py-3 rounded-l-none rounded-r-none border border-border bg-white focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-border shadow-input flex-1"
                style={{ transition: "none" }}
              />
            </div>
            <button
              type="submit"
              className="btn-primary sm:rounded-l-none w-full sm:w-auto whitespace-nowrap"
            >
              Start Chatting
            </button>
          </form>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>

        <div
          className="mb-8 animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <h2 className="text-xl font-semibold mb-6">Popular Repositories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularRepos.map((repo, index) => (
              <RepoCard key={index} repo={repo} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
