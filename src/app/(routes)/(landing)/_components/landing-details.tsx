"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function LandingDetails() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-5 md:px-14 py-10 md:min-h-screen h-[80vh] 2xl:aspect-[5/2] 2xl:min-h-fit flex flex-col justify-center items-center">
      <h1 className="text-[2.4rem] leading-10 sm:leading-[4.5rem] font-bold mb-4 sm:text-6xl text-center">
        Megah Express Panel Dashboard
      </h1>
      <p className="mb-8 sm:text-lg max-w-[800px] text-muted-foreground text-center">
        Megha Express is a logistics company that provides a simple and
        efficient way to ship your products. Our API is designed to help you
        integrate our services into your platform.
      </p>
      <div className="">
        <Link
          href={"/waiting"}
          className={
            buttonVariants({ className: "px-6", size: "lg" }) +
            "active:scale-95"
          }
        >
          Get Stared
        </Link>
      </div>
    </div>
  );
}
