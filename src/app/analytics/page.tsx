'use client'

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { FollowModal } from '@/components/FollowModal'
import { useApp } from '@/components/providers/AppProvider'
import { BarChart3, TrendingUp, Users, Heart } from 'lucide-react'

type Account = { id: string; username: string; profile_picture_url?: string }
type MediaItem = { id: string; caption?: string; media_type: string; media_url: string; permalink: string; timestamp: string }

export default function AnalyticsPage() {
  const { analytics } = useApp()
  const [account, setAccount] = useState<Account | null>(null)
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'
        const res = await fetch(`${base}/instagram/me`)
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'Failed to load')
        setAccount(data.account)
        setMedia(Array.isArray(data.media?.data) ? data.media.data : [])
      } catch (e: any) {
        setError(e?.message || 'Error fetching data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

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
                {loading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : error ? (
                  <p className="text-red-600">{error}</p>
                ) : account ? (
                  <div className="text-center">
                    <p className="text-gray-800 font-medium">@{account.username}</p>
                    <p className="text-gray-500 text-sm">Connected Instagram account</p>
                  </div>
                ) : (
                  <p className="text-gray-500">Connect your Instagram to load data</p>
                )}
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Content</h2>
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : media.length > 0 ? (
                <div className="space-y-4">
                  {media.slice(0, 5).map((m) => (
                    <div key={m.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <a href={m.permalink} target="_blank" className="text-sm text-blue-600 hover:underline">
                        {m.caption?.slice(0, 60) || m.media_type}
                      </a>
                      <span className="text-gray-600 text-sm">{new Date(m.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No media yet. Create and publish to see performance here.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <FollowModal />
    </div>
  )
}