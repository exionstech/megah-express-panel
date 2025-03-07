"use client"

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen px-2 sm:py-28 py-36 flex flex-col gap-4 items-center justify-center w-full h-full">
      <div className="text-center flex flex-col items-center justify-center w-fit gap-2">
        <h2 className="text-7xl font-bold pr-1">404</h2>
        <p className="text-muted-foreground text-md font-medium">
          Page not found {":("}
        </p>
        <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      </div>
      <div className="flex items-center justify-center gap-3 cursor-pointer active:scale-95">
        <div onClick={() => router.back()} className={buttonVariants({
          variant: "secondary",
          className: "px-6",
          size: "lg",
        })}>
          Go Back
        </div>
        <Link href="/" className={buttonVariants({}) + ' active:scale-95'}>
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
