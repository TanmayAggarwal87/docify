"use server";

import { auth } from "../../../auth";

export async function fetchRepos() {
  const session = await auth();

  if (!session) {
    console.log("No access token found. Please log in.");
  }

  const res = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${session?.sessionToken}`,
    },
  });

  if (!res.ok) {
    console.log(`GitHub API error: ${res.statusText}`);
  }

  return res.json();
}
