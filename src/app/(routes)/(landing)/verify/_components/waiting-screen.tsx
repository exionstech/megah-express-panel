
import { MaxWidthWrapper } from "@/components/shared/max-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WaitingScreen = () => {
  return (
    <MaxWidthWrapper className="min-h-[90vh] py-6">
      <div className="flex flex-col items-center mt-10 justify-center">
        <Image
          src="/kyc/kyc-succes.png"
          width={400}
          height={400}
          alt="Verify Success"
        />
        <h1 className="text-2xl font-bold mt-4">
          Hang Tight! We’re Reviewing Your KYC
        </h1>
        <p className="text-center mt-4 md:w-[70%]">
          We’re on it! 🔍 Your KYC is currently under review, and we’ll update
          you as soon as it’s done. This usually takes 2-3 business days, so sit
          back and relax—we’ve got you covered!
        </p>
        <Link
          target="_blank"
          href="https://meghaexpress.in/contact-us">
          <Button className="mt-4">
            Contact For Query
          </Button>
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default WaitingScreen;
