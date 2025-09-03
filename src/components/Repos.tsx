"use client";

import { useEffect, useState } from "react";
import { fetchRepos } from "@/app/api/token";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Eye, GitFork, Star } from "lucide-react";
import Hero from "./Hero";

export default function Repos({ session }: { session: any }) {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    if (!session) return;

    (async () => {
      try {
        const data = await fetchRepos();
        console.log("Fetched repos:", data);
        setRepos(data);
      } catch (err) {
        console.error("Error fetching repos:", err);
      }
    })();
  }, [session]);

  if (!session) {
    return(
      <Hero/>
    )
  }

  return (
    <div className="flex justify-center items-center my-4  mx-2 ">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
        {repos.map((repo) => (
          <li className="h-full w-[400px] " key={repo.id}>
            <Link href={`/repos/${repo.name}`}>
              <Card className="w-full max-w-md text-white/95 bg-[hsla(0,0%,95%,5%)] rounded-xl hover:bg-[hsla(0,0%,95%,10%)] transition-all duration-300 shadow-md border border-gray-700 hover:shadow-lg h-full">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold hover:underline transition-all duration-300 cursor-pointer">
                      {repo.name}
                    </h2>
                    <span className="text-xs border px-2 py-0.5 rounded-full border-gray-600">
                      {repo.visibility}
                    </span>
                  </div>

                  <p className="text-sm text-white/65 line-clamp-2">
                    {repo.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-white/50">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                        {repo.language}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center gap-1">
                        <Star size={14} /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={14} /> {repo.forks}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} /> {repo.watchers}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
