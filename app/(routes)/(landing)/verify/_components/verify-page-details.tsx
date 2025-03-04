"use client";

import KycModal from "@/components/kyc-modal";
import { MaxWidthWrapper } from "@/components/shared/max-wrapper";
import { useUser } from "@/hooks/use-user";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "@pheralb/toast";

const VerifyKycPageDetails = () => {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // Handle redirection if user is not authenticated
    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/onboarding');
        }
    }, [user, isLoading, router]);

    // Open the modal when the component mounts
    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    // const { mutate, isPending } = useMutation({
    //     mutationFn: async (name: string) => {
    //         const res = await api.post("/check/create", { name })
    //         if (res.status !== 200) throw new Error("Failed to create event")
    //         const json = res.data
    //         if (!json.success)
    //             throw new Error(json.message || "Failed to create event")
    //         return json
    //     },
    //     onSuccess: () => {
    //         toast.success({
    //             text: "Event created successfully",
    //         });
    //     },
    //     onError: (error) => toast.error({
    //         text: error.message || "Failed to create event",
    //     }),
    // });

    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     mutate(inputValue);
    // };

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
        return null;
    }

    return (
        <MaxWidthWrapper className="min-h-screen py-6">
            <h1 className="text-3xl font-bold mb-4">Verify KYC</h1>
            <p className="text-muted-foreground text-lg">
                Please complete your verification process.
            </p>

            {/* <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                <Input
                    type="text"
                    placeholder="Enter your KYC info"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button type="submit">Submit</Button>
            </form> */}

            <KycModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </MaxWidthWrapper>
    );
};

export default VerifyKycPageDetails;