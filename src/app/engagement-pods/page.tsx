'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { EngagementPods } from '@/components/EngagementPods'
import { FollowModal } from '@/components/FollowModal'
import { useApp } from '@/components/providers/AppProvider'
import { Lock, Users } from 'lucide-react'

export default function EngagementPodsPage() {
  const { user, setShowFollowModal } = useApp()

  if (!user?.hasFollowed) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-12 w-12 text-yellow-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Engagement Pods
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join ethical engagement communities to boost your post reach and engagement. 
                Follow our Instagram to unlock this feature.
              </p>
              <button
                onClick={() => setShowFollowModal(true)}
                className="btn-primary text-lg px-8 py-4"
              >
                <Users className="h-5 w-5 mr-2" />
                Follow to Unlock
              </button>
            </div>
          </div>
        </main>
        <FollowModal />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <EngagementPods />
      </main>
      <FollowModal />
    </div>
  )
}