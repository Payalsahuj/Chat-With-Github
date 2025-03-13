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
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className="input-field rounded-r-none"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className={`btn px-6 py-3 rounded-l-none flex items-center justify-center ${
          message.trim()
            ? "bg-navy text-white hover:bg-navy-light"
            : "bg-gray-200 text-text-tertiary cursor-not-allowed"
        }`}
      >
        <span>Send</span>
      </button>
    </form>
  );
};

export default ChatInput;
