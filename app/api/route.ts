import { GetRepoInfo } from "../services/documentServices";
import { getRepoFilesContent } from "../services/githubServices";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  if (!repo || !owner) {
    return new Response(
      JSON.stringify({
        data: null,
        error: "Invalid Request",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
  const response = await GetRepoInfo(owner, repo);

  // find similar docs
  if (response.isNew) {
    await getRepoFilesContent(owner, repo, null, 4, response?.repo?.id);
  }
  return new Response(
    JSON.stringify({
      data: response,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
