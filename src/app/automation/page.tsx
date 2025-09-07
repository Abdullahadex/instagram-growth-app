'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { AutomationDashboard } from '@/components/AutomationDashboard'
import { FollowModal } from '@/components/FollowModal'

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <AutomationDashboard />
      </main>
      <FollowModal />
    </div>
  )
}