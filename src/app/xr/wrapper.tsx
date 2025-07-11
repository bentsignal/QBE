"use client";

import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { PointerEvents } from "@react-three/xr";
import XRComposer from "@/features/composer/components/xr-composer";

const store = createXRStore();

export default function XRPage() {
  const router = useRouter();
  const hideCanvas = true;
  return (
    <>
      <div className="mx-2 my-2 flex flex-col gap-2 text-center">
        <span className="text-muted-foreground text-lg font-semibold">
          Stay on this page while using the XR app.
        </span>
        <span className="text-muted-foreground text-lg font-semibold">
          To view threads, open a new tab.
        </span>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <Button
          className="h-full"
          variant="outline"
          onClick={() => router.push("/")}
        >
          Back to home
        </Button>
        <Button className="" onClick={() => store.enterAR()}>
          <Box className="h-4 w-4" />
          Enter XR
        </Button>
      </div>
      <Canvas
        className={cn(
          "!absolute inset-0 top-0",
          hideCanvas ? "-z-50 opacity-0" : "",
        )}
        style={{ height: "100dvh", touchAction: "none" }}
        gl={{ localClippingEnabled: true }}
      >
        <PointerEvents />
        <XR store={store}>
          <XRComposer />
        </XR>
      </Canvas>
    </>
  );
}
