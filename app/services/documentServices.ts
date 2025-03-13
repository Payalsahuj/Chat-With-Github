import axios from "axios";
import { createClient } from "@supabase/supabase-js";

export const GetRepoInfo = async (owner: string, repo: string) => {
  let isNew = false;
  const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_KEY || ""
  );

  let response = await supabase
    .from("repos")
    .select("*")
    .eq("owner", owner)
    .eq("repo", repo);
  if (!response?.data?.length) {
    isNew = true;
    await supabase.from("repos").insert([{ owner, repo }]);
    response = await supabase
      .from("repos")
      .select("*")
      .eq("owner", owner)
      .eq("repo", repo);
  }
  return { isNew, repo: response?.data?.[0] };
};

export const TextToEmbedding = async (text: string) => {
  const url = "https://api.openai.com/v1/embeddings";
  const headers = {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json",
  };
  const data = {
    input: JSON.stringify(text),
    model: "text-embedding-3-small",
    encoding_format: "float",
  };
  return axios
    .post(url, data, { headers })
    .then((response) => {
      return response.data?.data?.[0]?.embedding;
    })
    .catch((error) => {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    });
};

export const findSimilarDocs = async (text: string, repoId: number) => {
  const embedding = await TextToEmbedding(text);
  const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_KEY || ""
  );

  const response = await supabase.rpc("search_embeddings_exact", {
    p_query_vector: JSON.stringify(embedding),
    p_repo_id: repoId,
    p_limit: 4,
  });

  return response?.data?.map((val: { content: string }) => {
    return val?.content + "\n\n";
  });
};
