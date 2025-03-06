import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {

    title: "Verify Success | Megha Express Panel",
};


const VerifySuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold text-center">Verification Successful</h1>
            <p className="text-center">Your account has been verified successfully.</p>
        </div>
    )
}

export default VerifySuccess