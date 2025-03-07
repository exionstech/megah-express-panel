"use client"

import { SignUp } from "@clerk/nextjs"

const Page = () => {
    return (

        <div className="w-full z-10 flex items-center justify-center min-h-screen overflow-hidden">
            <SignUp
                fallbackRedirectUrl={"/onboarding"}
                forceRedirectUrl={"/onboarding"}
            />
        </div>
    )
}

export default Page