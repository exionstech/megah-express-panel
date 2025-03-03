"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function LandingDetails() {
  return (
    <div className="flex sm:min-h-[85.5vh] min-h-[82vh] flex-col sm:items-center justify-center text-center px-2 sm:py-8 py-12">
      <h1 className="text-[2.4rem] leading-10 sm:leading-[4.5rem] font-bold mb-4 sm:text-6xl text-left sm:text-center">
        Megah Express Dashboard
      </h1>
      <p className="mb-8 sm:text-lg max-w-[800px] text-muted-foreground text-left sm:text-center">
        Megha Express is a logistics company that provides a simple and
        efficient way to ship your products. Our API is designed to help you
        integrate our services into your platform.
      </p>
      <div className="sm:flex sm:flex-row grid grid-cols-2 items-center sm;gap-5 gap-3 mb-8">
        <Link
          href={"/verify"}
          className={
            buttonVariants({ className: "px-6", size: "lg" }) +
            "active:scale-95"
          }
        >
          Get Stared
        </Link>

        <Link
          href="https://docs.meghaexpress.in/"
          target="_blank"
          className={
            buttonVariants({
              variant: "secondary",
              className: "px-6",
              size: "lg",
            }) + "active:scale-95"
          }
        >
          View Documentation
        </Link>
      </div>
    </div>
  );
}
