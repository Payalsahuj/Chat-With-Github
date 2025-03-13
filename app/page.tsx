"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import axios from "axios";

const Index = () => {
  const [repoInput, setRepoInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 max-w-5xl py-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-semibold mb-3 text-navy">
            GitHub Repo Chat
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Enter any GitHub repository or select from popular ones to chat
            about its stats and details
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
