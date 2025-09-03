"use client";

import { File, FolderClosed, FolderOpen } from "lucide-react";
import { useState } from "react";

export default function FileTree({ nodes }: { nodes: any[] }) {
  return (
    <ul className="ml-2 flex gap-2 flex-col text-white/80 overflow-y-auto">
      {nodes.map((node) =>
        node.type === "dir" ? (
          <Folder key={node.path} node={node} />
        ) : (
          <li
            key={node.path}
            className="py-1 flex justify-start items-start font-sans flex-row ml-1"
          >
            <File size={20} /> {node.name}
          </li>
        )
      )}
    </ul>
  );
}

function Folder({ node }: { node: any }) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 font-sans cursor-pointer ml-1"
      >
        {open ? <FolderOpen size={24} /> : <FolderClosed size={24} />}{" "}
        {node.name}
      </button>
      {open && node.children && <FileTree nodes={node.children} />}
    </li>
  );
}
