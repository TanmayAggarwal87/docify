"use server";

import { auth } from "../../../auth";

export type RepoTreeItem = {
  type: "file" | "dir";
  name: string;
  path: string;
  children?: RepoTreeItem[];
};

export async function fetchRepoContents(
  owner: string,
  repo: string,
  path: string = ""
): Promise<RepoTreeItem[]> {
  const session = await auth();

  if (!session) {
    console.log("No GitHub access token found.");
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.sessionToken} ?? ""`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) {
    console.log(`GitHub api error`);
  }

  const data = await res.json();

  if (Array.isArray(data)) {
    return await Promise.all(
      data.map(async (item: any): Promise<RepoTreeItem> => {
        if (item.type === "dir") {
          return {
            type: "dir",
            name: item.name,
            path: item.path,
            children: await fetchRepoContents(owner, repo, item.path),
          };
        } else {
          return {
            type: "file",
            name: item.name,
            path: item.path,
          };
        }
      })
    );
  }

  return [];
}
