'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { HashtagResearch } from '@/components/HashtagResearch'
import { FollowModal } from '@/components/FollowModal'

export default function HashtagResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <HashtagResearch />
      </main>
      <FollowModal />
    </div>
  )
}