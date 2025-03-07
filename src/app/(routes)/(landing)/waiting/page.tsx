import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WaitingPage = () => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto md:px-14 px-5 py-10 flex flex-col items-center justify-center gap-6">
      <div>
        <Image
          src="/waiting/waiting.png"
          width={300}
          height={300}
          alt="Waiting"
          className="shrink-0"
        />
      </div>
      <div className="flex flex-col gap-3 items-center text-center justify-center">
        <h1 className="text-2xl font-bold">
          Hang Tight! Our admin is reviewing your request
        </h1>
        <p className="md:w-[70%]">
          Thank you for your application! Our team is reviewing your request for
          the admin role. Once approved, you will receive access to your
          dashboard. We appreciate your patience!
        </p>
        <Link href={"/"} className="flex items-center gap-2 bg-brandred rounded-md px-3 py-2 text-white w-fit">
        Contact Us
        <ChevronRight className="w-5 h-5" color="white"/>
        </Link>
      </div>
    </section>
  );
};

export default WaitingPage;
