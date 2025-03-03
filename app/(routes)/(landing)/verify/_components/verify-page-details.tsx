"use client";

import KycModal from "@/components/kyc-modal";
import { MaxWidthWrapper } from "@/components/shared/max-wrapper";
import { useUser } from "@/hooks/use-user";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const VerifyKycPageDetails = () => {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle redirection if user is not authenticated
    useEffect(() => {
        // Only redirect if we've finished loading and the user doesn't exist
        if (!isLoading && !user) {
            router.replace('/onboarding');
        }
    }, [user, isLoading, router]);

    // Open the modal when the component mounts
    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className='w-full h-full flex items-center justify-center min-h-screen'>
                <Loader className='size-8 shrink-0 animate-spin' />
            </div>
        );
    }

    // Don't render the page content if user is not authenticated
    if (!user && !isLoading) {
        return null; // Return nothing while redirecting
    }

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