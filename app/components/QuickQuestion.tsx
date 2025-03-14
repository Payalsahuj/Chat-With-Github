import React from "react";

type QuickQuestionProps = {
  question: string;
  onClick: (question: string) => void;
};

const QuickQuestion = ({ question, onClick }: QuickQuestionProps) => {
  return (
    <button
      className="px-4 py-2 bg-card-light text-text-primary rounded-full hover:bg-gray-200 focus:outline-none transition-default text-sm"
      onClick={() => onClick(question)}
    >
      {question}
    </button>
  );
};

export default QuickQuestion;
