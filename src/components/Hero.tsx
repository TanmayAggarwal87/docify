"use client";

import { GitBranch, Sparkles, FileText, Cpu } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4">

      <div className="flex justify-center items-center flex-row gap-3 mb-8">
        <GitBranch className="w-12 h-12 text-blue-400" />
        <h1 className="font-sans text-5xl text-white font-semibold tracking-tight">
          Docify
        </h1>
      </div>

      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 font-sans">
        AI-Powered README Generator
      </h2>

      <p className="text-white/70 max-w-xl mb-10 font-sans leading-relaxed">
        Create clean, professional, and customizable README files for your GitHub repositories 
        in seconds. Focus on your code, let <span className="text-blue-400 font-medium">Docify </span> 
        handle the documentation.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 max-w-3xl">
        <div className="flex flex-col items-center text-white/80">
          <FileText className="w-8 h-8 text-blue-400 mb-2" />
          <p className="font-sans text-sm">Professional Markdown Output</p>
        </div>
        <div className="flex flex-col items-center text-white/80">
          <Cpu className="w-8 h-8 text-green-400 mb-2" />
          <p className="font-sans text-sm">Powered by AI (Gemini)</p>
        </div>
        <div className="flex flex-col items-center text-white/80">
          <Sparkles className="w-8 h-8 text-yellow-400 mb-2" />
          <p className="font-sans text-sm">Fast & Easy to Use</p>
        </div>
      </div>
    </section>
  );
}
