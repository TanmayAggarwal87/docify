"use client";

import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import ReadmeContent from "./ReadmeContent";

export default function ReadmeButton({ repo, contents }: { repo: string, contents: any }) {
    const [loading, setLoading] = useState(false);
   const [readme, setReadme] = useState<string | null>(null);

  async function handleGenerateReadme() {
    setLoading(true)
    const res = await fetch("/api/generateReadme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo, contents }),
    });

    const data = await res.json();
    setReadme(data.readme);
    setLoading(false)
  }

  return (
    <div className="ml-0 w-full">
        <div className="flex justify-between items-center flex-row">
            <h2 className="text-2xl font-bold font-sans text-white/90">{repo}</h2>
      <Button onClick={handleGenerateReadme} className="font-sans cursor-pointer">
        <File /> Generate README File
      </Button>

        </div>
        

      {loading && (
        <div className="animate-pulse p-6 rounded-xl bg-zinc-800/50 border border-zinc-700 mt-10 text-white/60">
          Generating README...
        </div>
      )}

      {!loading && readme && <ReadmeContent content={readme} />}
    </div> 
  );
}
