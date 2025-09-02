"use client";

import { useEffect, useState } from "react";
import { fetchRepos } from "@/app/api/token";

export default function Repos({ session }: { session: any }) {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    if (!session) return;

    (async () => {
      try {
        const data = await fetchRepos();
        setRepos(data);
      } catch (err) {
        console.error("Error fetching repos:", err);
      }
    })();
  }, [session]);

  if (!session) {
    return <p>Please log in to view your repositories.</p>;
  }

  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>{repo.name}</li>
      ))}
    </ul>
  );
}
