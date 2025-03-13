import { streamText } from "ai";
import { openai } from "@ai-sdk/openai"; // Ensure OPENAI_API_KEY environment variable is set
import { findSimilarDocs } from "@/app/services/documentServices";

export async function POST(req: Request) {
  const request = await req.json();
  const { messages, repoId, repository } = request;
  const contextText = await findSimilarDocs(messages?.at(-1)?.content, repoId);

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: `You are a very enthusiastic representative who loves to help people! Given the following sections from the github repo, answer the question using only that information, outputted in markdown format."

    Context sections:
    ${contextText}

    Repository Info: ${JSON.stringify(repository)}

    Answer as markdown (including related code snippets if available):`,
    messages: messages,
  });

  return result.toDataStreamResponse();
}
