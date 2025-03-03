"use client"

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
      <div className='w-full h-full flex items-center justify-center min-h-screen'>
        <Loader className='size-8 shrink-0 animate-spin' />
      </div>
    )
  }

  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage