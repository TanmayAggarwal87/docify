import { GitBranch, Github, LogOut } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth, signIn, signOut } from "../../auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className=" bg-[hsla(0,0%,90%,10%)] px-6 py-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="h-6 w-6 " />
          <span className="text-xl  font-semibold font-sans tracking-widest">
            Docify
          </span>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage src={session?.user?.image} alt="image" />
                <AvatarFallback>{session?.user?.name}</AvatarFallback>
              </Avatar>
              <span className="text-md font-sans tracking-wide text-white/70 hidden md:flex">
                {session?.user?.name}
              </span>
              <form
              action={async()=>{
                  "use server"
                  await signOut({redirectTo:"/"})
                }}
              >
                <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground cursor-pointer hover:text-foreground"
                
                
              >
                <LogOut className="size-5" />
              </Button>

              </form>
              
            </div>
          ) : (
            <Button
              className="bg-[#0f0f0f] text-md cursor-pointer font-sans hover:bg-[#0f0f0f] active:bg-[#0a0a0a]"
              onClick={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <Github className=" size-5 md:size-5" />
              <span className="hidden sm:inline">Login with Github</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
