"use client"

import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

const Page = () => {
    const searchParams = useSearchParams()

    return (
        <div className="w-full z-10 flex items-center justify-center min-h-screen overflow-hidden">
            <SignIn
                fallbackRedirectUrl={"/dashboard"}
                forceRedirectUrl={"/dashboard"}
            />
        </div>
    )
}

export default Page