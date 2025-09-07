'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { FollowModal } from '@/components/FollowModal'
import { useApp } from '@/components/providers/AppProvider'
import { Gift, Copy, Share2, Users } from 'lucide-react'

export default function ReferralsPage() {
  const { user } = useApp()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Referral Rewards
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Earn premium features by referring friends. When 5 friends follow our Instagram, you unlock premium!
            </p>
          </div>

          <div className="card text-center mb-8">
            <Gift className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Referral Code</h2>
            <div className="text-3xl font-mono bg-gray-100 p-4 rounded-lg mb-4">
              {user?.referralCode || 'LOADING'}
            </div>
            <div className="flex gap-4 justify-center">
              <button className="btn-secondary">
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </button>
              <button className="btn-primary">
                <Share2 className="h-4 w-4 mr-2" />
                Share Link
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900">{user?.referralCount || 0}</div>
              <div className="text-gray-600">Referrals Made</div>
            </div>
            <div className="card text-center">
              <Gift className="h-8 w-8 text-green-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900">5</div>
              <div className="text-gray-600">Needed for Premium</div>
            </div>
            <div className="card text-center">
              <div className="text-lg font-semibold text-gray-900 mb-2">Premium Status</div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                user?.isPremium ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {user?.isPremium ? 'Active' : 'Not Active'}
              </div>
            </div>
          </div>
        </div>
      </main>
      <FollowModal />
    </div>
  )
}