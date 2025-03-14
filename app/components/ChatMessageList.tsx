import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  tomorrowNightBright,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehype from "rehype-raw";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

type ChatMessageListProps = {
  messages: Message[];
  isTyping: boolean;
};

const ChatMessageList = ({ messages, isTyping }: ChatMessageListProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on new messages
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto mb-4 chat-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-4 ${
            message.sender === "user" ? "ml-4 sm:ml-12" : "mr-4 sm:mr-12"
          } animate-slide-in-right`}
        >
          <div
            className={`p-3 rounded-lg ${
              message.sender === "user"
                ? "bg-navy text-white ml-auto rounded-tr-none"
                : "bg-card-light text-text-primary rounded-tl-none"
            } max-w-[85%] w-fit ${
              message.sender === "user" ? "ml-auto" : "mr-auto"
            }`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehype]}
              components={{
                code: (props: any) => (
                  <code className="text-[14px] font-mono">
                    <SyntaxHighlighter
                      language="javascript"
                      style={vs}
                      wrapLongLines={true}
                    >
                      {props?.children}
                    </SyntaxHighlighter>
                  </code>
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>

          <div
            className={`text-xs text-text-tertiary mt-1 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex items-center mb-4 ml-4">
          <div className="bg-card-light p-3 rounded-lg text-text-secondary">
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-text-secondary rounded-full animate-pulse"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 bg-text-secondary rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-text-secondary rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatMessageList;
