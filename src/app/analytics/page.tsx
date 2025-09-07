'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { FollowModal } from '@/components/FollowModal'
import { useApp } from '@/components/providers/AppProvider'
import { BarChart3, TrendingUp, Users, Heart } from 'lucide-react'

export default function AnalyticsPage() {
  const { analytics } = useApp()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Growth Analytics
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track your Instagram growth and see what's working best for your account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card text-center">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold gradient-text">{analytics.followers.toLocaleString()}</div>
              <div className="text-gray-600">Total Followers</div>
              <div className="text-green-500 text-sm mt-1">+12% this week</div>
            </div>
            
            <div className="card text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-4" />
              <div className="text-3xl font-bold gradient-text">{analytics.engagement}%</div>
              <div className="text-gray-600">Engagement Rate</div>
              <div className="text-green-500 text-sm mt-1">+0.8% this week</div>
            </div>
            
            <div className="card text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-4" />
              <div className="text-3xl font-bold gradient-text">{analytics.referrals}</div>
              <div className="text-gray-600">Referrals Made</div>
              <div className="text-green-500 text-sm mt-1">+5 this week</div>
            </div>
            
            <div className="card text-center">
              <BarChart3 className="h-8 w-8 text-purple-500 mx-auto mb-4" />
              <div className="text-3xl font-bold gradient-text">{analytics.contentGenerated}</div>
              <div className="text-gray-600">Content Created</div>
              <div className="text-green-500 text-sm mt-1">+23 this week</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Growth Trend</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Content</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">AI Caption: "Sunset vibes..."</span>
                  <span className="text-green-600 font-medium">1.2K likes</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Quiz: "What's your 2025 vibe?"</span>
                  <span className="text-green-600 font-medium">890 shares</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Wallpaper: "Minimalist mountain"</span>
                  <span className="text-green-600 font-medium">654 saves</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FollowModal />
    </div>
  )
}