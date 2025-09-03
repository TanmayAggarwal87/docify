"use client";

import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { CopyButton } from "./CopyButton";

export default function ReadmeContent({ content }: { content: string }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (content) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [content]);

  return (
    <div className=" sm:mt-6 w-full lg:w-[90%] mx-auto text-white/80 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-900/40 border border-zinc-800 overflow-x-auto">
      <CopyButton text={content} />

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-5 bg-zinc-700/40 rounded w-3/4"></div>
          <div className="h-5 bg-zinc-700/40 rounded w-1/2"></div>
          <div className="h-5 bg-zinc-700/40 rounded w-2/3"></div>
        </div>
      ) : (
        <article className="prose prose-invert prose-sm sm:prose-base max-w-none break-words">
          <Markdown>{content}</Markdown>
        </article>
      )}
    </div>
  );
}
