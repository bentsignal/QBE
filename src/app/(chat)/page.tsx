import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { Info } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import XRLink from "@/features/xr/components/xr-link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            {userId ? "Welcome back" : "QBE"}
          </span>
          {!userId && (
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>
                <span className="font-semibold">Like &quot;cube&quot;</span>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <span className="text-muted-foreground text-lg font-semibold">
          {userId
            ? "How can I help you today?"
            : "The first AI Chat app to embrace the z-axis."}
        </span>
        {!userId && (
          <Button asChild className="mt-2">
            <Link href="/sign-up" className="text-lg font-semibold">
              Get Started
            </Link>
          </Button>
        )}
        {userId && <XRLink />}
      </div>
    </>
  );
}
