"use client"

import LoaderPage from '@/components/shared/loader'
import { useUser } from '@/hooks/use-user'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const DashboardPage = () => {
  const router = useRouter()
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (user?.kycStatus === "PENDING") {
      router.replace('/verify')
    }
  }, [user, router])


  if (isLoading) {
    return (
     <LoaderPage/>
    )
  }

  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage