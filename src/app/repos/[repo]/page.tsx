import { fetchRepoContents } from "@/app/api/fetchReposContent";
import FileTree from "@/components/FileTree";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { auth } from "../../../../auth";
import ReadmeButton from "@/components/ReadmeButton";

export default async function RepoPage({
  params,
}: {
  params: { repo: string };
}) {
  const session = await auth();
  const owner = `${session?.user?.login}`;
  const repo = params.repo;
  const contents = await fetchRepoContents(owner, repo);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-2">
      <div className="border-r pr-2">
        <div className="ml-2 mt-2 mb-4">
          <Link href={`/`}>
            <Button className="font-sans cursor-pointer flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Repositories
            </Button>
          </Link>
        </div>
        <FileTree nodes={contents} />
      </div>
      <div className="lg:col-span-3 pl-0 lg:pl-4">
        <div className="mt-2 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <ReadmeButton repo={repo} contents={contents} />
        </div>
      </div>
    </div>
  );
}
