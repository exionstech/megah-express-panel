"use client"

import LoaderPage from '@/components/shared/loader'
import { useUser } from '@/hooks/use-user'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const DashboardPageDetails = () => {
  const router = useRouter()
  const { user, isLoading } = useUser()

  // useEffect(() => {
  //   if (user?.kycStatus === "PENDING") {
  //     router.replace('/verify')
  //   }
  // }, [user, router])


  if (isLoading) {
    return (
      <LoaderPage />
    )
  }


  return (
    <div>DashboardPageDetails</div>
  )
}

export default DashboardPageDetails