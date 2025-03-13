import React from "react";
import QuickQuestion from "./QuickQuestion";
import ChatInput from "./ChatInput";
import ChatMessageList, { Message } from "./ChatMessageList";

type ChatContainerProps = {
  messages: Message[];
  isTyping: boolean;
  quickQuestions: string[];
  onSendMessage: (text: string) => void;
  onQuickQuestion: (question: string) => void;
};

const ChatContainer = ({
  messages,
  isTyping,
  quickQuestions,
  onSendMessage,
  onQuickQuestion,
}: ChatContainerProps) => {
  return (
    <div className="flex-1 card flex flex-col h-[700px]">
      <div className="border-b border-border-light pb-4 mb-4">
        <h2 className="text-xl font-semibold">Chat about this repository</h2>
        <p className="text-text-secondary text-sm">
          Ask questions about stats, features, or anything related to this repo
        </p>
      </div>

      {/* Messages area */}
      <ChatMessageList messages={messages} isTyping={isTyping} />

      {/* Quick questions */}
      <div className="mb-4 flex flex-wrap gap-2">
        {quickQuestions.map((question) => (
          <QuickQuestion
            key={question}
            question={question}
            onClick={onQuickQuestion}
          />
        ))}
      </div>

      {/* Input area */}
      <div className="mt-auto">
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
