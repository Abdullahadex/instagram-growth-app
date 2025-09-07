'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { ContentScheduler } from '@/components/ContentScheduler'
import { FollowModal } from '@/components/FollowModal'

export default function ContentSchedulerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <ContentScheduler />
      </main>
      <FollowModal />
    </div>
  )
}