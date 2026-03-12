'use client'

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { BarChart3, TrendingUp, Users, Heart } from 'lucide-react'

interface AnalyticsResponse {
  profile: {
    username: string
    followers: number
    mediaCount: number
    accountType: string
  }
  summary: {
    avgEngagementRate: number
    avgEngagementPerPost: number
    postsAnalyzed: number
    bestHours: {
      hour: number
      avgEngagement: number
      posts: number
    }[]
    bestWeekdays: {
      dayIndex: number
      dayName: string
      avgEngagement: number
      posts: number
    }[]
  }
  topPosts: {
    id: string
    caption?: string
    permalink: string
    engagement: number
    likes: number
    comments: number
    timestamp: string
  }[]
  hashtagStats: {
    tag: string
    uses: number
    totalEngagement: number
    avgEngagement: number
  }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/instagram/analytics')
        if (!res.ok) throw new Error('Failed to load analytics')
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError('Could not load analytics. Token may be expired or permissions missing.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Instagram analytics
            </h1>
            {data && (
              <p className="text-sm text-gray-600">
                @{data.profile.username} • {data.profile.followers.toLocaleString()} followers •{' '}
                {data.profile.mediaCount} posts
              </p>
            )}
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center text-gray-500 text-sm">
              Loading analytics…
            </div>
          ) : data ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="card text-center">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold gradient-text">
                    {data.profile.followers.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Followers</div>
                </div>

                <div className="card text-center">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold gradient-text">
                    {data.summary.avgEngagementRate.toFixed(2)}%
                  </div>
                  <div className="text-gray-600">Avg engagement rate</div>
                </div>

                <div className="card text-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold gradient-text">
                    {data.summary.postsAnalyzed}
                  </div>
                  <div className="text-gray-600">Recent posts analyzed</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Engagement overview
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    Average likes + comments per post:{' '}
                    <span className="font-semibold">
                      {Math.round(data.summary.avgEngagementPerPost)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Based on your latest {data.summary.postsAnalyzed} posts.
                  </p>
                </div>

                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Top performing posts
                  </h2>
                  <div className="space-y-3 max-h-72 overflow-y-auto">
                    {data.topPosts.map((post) => (
                      <a
                        key={post.id}
                        href={post.permalink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                      >
                        <div className="mr-3">
                          <p className="text-xs text-gray-500 mb-1">
                            {new Date(post.timestamp).toLocaleDateString()}
                          </p>
                          {post.caption && (
                            <p className="text-sm text-gray-800 line-clamp-2">
                              {post.caption}
                            </p>
                          )}
                        </div>
                        <div className="text-right text-xs text-gray-600 min-w-[90px]">
                          <div>👍 {post.likes}</div>
                          <div>💬 {post.comments}</div>
                          <div className="font-semibold text-gray-800">
                            {post.engagement} total
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Best times to post
                  </h2>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>
                      <div className="font-medium mb-1">By day of week</div>
                      <ul className="space-y-1">
                        {data.summary.bestWeekdays.slice(0, 3).map((d) => (
                          <li key={d.dayIndex} className="flex justify-between">
                            <span>{d.dayName}</span>
                            <span className="text-gray-500">
                              {d.posts} posts • avg {Math.round(d.avgEngagement)} engagements
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="font-medium mb-1">By hour of day</div>
                      <ul className="space-y-1">
                        {data.summary.bestHours.slice(0, 4).map((h) => (
                          <li key={h.hour} className="flex justify-between">
                            <span>
                              {h.hour.toString().padStart(2, '0')}:00
                            </span>
                            <span className="text-gray-500">
                              {h.posts} posts • avg {Math.round(h.avgEngagement)} engagements
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Top hashtags you use
                  </h2>
                  {data.hashtagStats.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No hashtags found in your recent posts yet.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto text-sm">
                      {data.hashtagStats.slice(0, 15).map((h) => (
                        <div
                          key={h.tag}
                          className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                        >
                          <span className="font-mono">{h.tag}</span>
                          <span className="text-gray-500">
                            {h.uses} posts • avg {Math.round(h.avgEngagement)} engagements
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  )
}
