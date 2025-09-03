"use server";

import { auth } from "../../../auth";

export async function fetchRepos() {
  const session = await auth();

  if (!session) {
    console.log("No access token found.");
  }

  const headers: Record<string, string> = {};

  if (session?.sessionToken) {
    headers.Authorization = `Bearer ${session.sessionToken}`;
  }

  const res = await fetch("https://api.github.com/user/repos", { headers });

  if (!res.ok) {
    console.log(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
