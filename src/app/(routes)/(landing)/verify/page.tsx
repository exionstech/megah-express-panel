import { Metadata } from 'next';
import React from 'react'
import VerifyKycPageDetails from './_components/verify-page-details';

export const metadata: Metadata = {

    title: "Verify KYC | Megha Express Panel",
};


const VeirfyKycPage = () => {
    return (
        <VerifyKycPageDetails />
    )
}

export default VeirfyKycPage