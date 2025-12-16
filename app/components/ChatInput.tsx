import React, { useState } from "react";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  placeholder?: string;
};

const ChatInput = ({
  onSendMessage,
  placeholder = "Ask about this repository...",
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-stretch">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-l-xl rounded-r-none border border-border bg-white focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-border shadow-input flex-1"
        style={{ transition: "none", borderRadius: "12px 0 0 12px" }}
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className={`px-6 py-3 rounded-r-xl rounded-l-none flex items-center justify-center font-medium transition-default focus:outline-none whitespace-nowrap ${
          message.trim()
            ? "bg-navy text-white hover:bg-navy-light"
            : "bg-gray-200 text-text-tertiary cursor-not-allowed"
        }`}
        style={{ borderRadius: "0 12px 12px 0" }}
      >
        <span>Send</span>
      </button>
    </form>
  );
};

export default ChatInput;
