import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserProfile, UserButton } from "@clerk/nextjs";

export default async function Settings() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <div className="flex h-screen w-screen flex-1 flex-col items-center justify-center gap-4">
      <UserProfile />
      <div className="absolute right-4 bottom-4">
        <UserButton />
      </div>
    </div>
  );
}
