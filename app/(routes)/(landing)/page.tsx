import React from 'react'
import LandingDetails from './_components/landing-details'
import { Metadata } from 'next';

export const metadata: Metadata = {

  title: "Home | Megha Express",
};

const landingPage = () => {
  return (
    <LandingDetails />
  )
}

export default landingPage