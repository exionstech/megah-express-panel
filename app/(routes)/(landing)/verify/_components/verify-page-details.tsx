"use client";

import KycModal from "@/components/kyc-modal";
import { MaxWidthWrapper } from "@/components/shared/max-wrapper";
import React, { useState, useEffect } from "react";

const VerifyKycPageDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    return (
        <MaxWidthWrapper className="min-h-screen py-6">
            <h1 className="text-3xl font-bold mb-4">Verify KYC</h1>
            <p className="text-muted-foreground text-lg">
                Please complete your verification process.
            </p>

            <KycModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </MaxWidthWrapper>
    );
};

export default VerifyKycPageDetails;
