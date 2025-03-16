"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import RepoInfo from "../components/RepoInfo";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import ChatContainer from "../components/ChatContainer";
import { Message } from "../components/ChatMessageList";
import { Repository, getRepositoryInfo } from "../services/githubServices";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const Chat = () => {
  const params = useSearchParams();

  const owner = params.get("owner");
  const repo = params.get("repo");

  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  const quickQuestions = [
    "What are the main features?",
    "How popular is it?",
    "Languages used?",
  ];

  useEffect(() => {
    const fetchRepository = async () => {
      if (!owner || !repo) {
        setError("Invalid repository information");
        setLoading(false);
        return;
      }
      await axios.get(`/api?owner=${owner}&repo=${repo}`).then((response) => {
        localStorage.setItem("repoId", response.data?.data?.repo?.id);
      });
      try {
        const repoData = await getRepositoryInfo(owner, repo);
        setRepository(repoData);

        // Add initial welcome message
        setMessages([
          {
            id: "0",
            text: `Welcome! Ask me anything about ${owner}/${repo}. You can ask about stats, features, or anything related to this repository.`,
            sender: "assistant",
            timestamp: new Date(),
          },
        ]);
      } catch (err) {
        setError(
          `Failed to load repository information. The repository may not exist or there might be connection issues.`
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepository();
  }, [owner, repo]);

  useEffect(() => {
    // modify last messages to include the answer
    if (answer && !isTyping) {
      const updatedMessages = [...messages];
      updatedMessages[updatedMessages.length - 1].sender = "assistant";
      updatedMessages[updatedMessages.length - 1].text = answer;
      setMessages(updatedMessages);
    }
  }, [answer, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!repository) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setIsTyping(true);
    setTimeout(() => {
      fetchResponseFromAI(updatedMessages);
    });
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  function extractTextOnly(data: string) {
    return data
      .split("\n") // Split by new lines
      .filter((line) => line.includes("0:")) // Keep only lines containing text data
      .map((line) => line.replace(/^.*0:"/, "").replace(/"$/, "")) // Remove prefixes and surrounding quotes
      .join("")
      ?.replaceAll("\\n", "\n")
      ?.replaceAll('\\"', '"');
  }

  const fetchResponseFromAI = async (messages: Message[]) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: messages?.slice(1)?.map((msg) => {
          return {
            content: msg.text,
            role: msg.sender,
          };
        }),
        repository,
        repoId: localStorage.getItem("repoId"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: "Sorry, I'm having trouble processing your request.",
          sender: "assistant",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
      return;
    }
    const reader = response?.body?.getReader();
    const decoder = new TextDecoder();

    let message = "";

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        text: "",
        sender: "assistant",
        timestamp: new Date(),
      },
    ]);
    setIsTyping(false);
    while (true && reader) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      message += extractTextOnly(decoder.decode(value));
      setAnswer(message);
    }
    setAnswer("");
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState errorMessage={error} />;
  }

  if (!repository) {
    return null; // Should never happen due to loading/error states above
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showBackButton title={`${owner}/${repo}`} />

      <main className="flex-1 container mx-auto px-4 max-w-5xl py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Repository information sidebar */}
          <aside className="w-full md:w-1/3">
            <RepoInfo repository={repository} />
          </aside>

          {/* Chat section */}
          <ChatContainer
            messages={messages}
            isTyping={isTyping}
            quickQuestions={quickQuestions}
            onSendMessage={handleSendMessage}
            onQuickQuestion={handleQuickQuestion}
          />
        </div>
      </main>
    </div>
  );
};

export default Chat;
