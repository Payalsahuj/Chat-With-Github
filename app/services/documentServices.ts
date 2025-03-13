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
