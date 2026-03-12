'use client'

import React, { useEffect, useState } from 'react'
import { 
  Search, 
  Hash, 
  TrendingUp, 
  Target, 
  Copy, 
  Star,
  BarChart3,
  Users,
  Eye,
  Zap
} from 'lucide-react'

interface HashtagStat {
  tag: string
  uses: number
  totalEngagement: number
  avgEngagement: number
}

export const HashtagResearch: React.FC = () => {
  const [hashtags, setHashtags] = useState<HashtagStat[]>([])
  const [savedHashtags, setSavedHashtags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/instagram/analytics')
        if (!res.ok) throw new Error('Failed to load hashtag data')
        const json = await res.json()
        setHashtags(json.hashtagStats || [])
      } catch (e) {
        setError('Could not load hashtags from your posts.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const saveHashtag = (hashtag: string) => {
    if (!savedHashtags.includes(hashtag)) {
      setSavedHashtags([...savedHashtags, hashtag])
    }
  }

  const removeHashtag = (hashtag: string) => {
    setSavedHashtags(savedHashtags.filter(h => h !== hashtag))
  }

  const copyHashtagSet = () => {
    const hashtagText = savedHashtags.join(' ')
    navigator.clipboard.writeText(hashtagText)
    // Show toast notification
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Hashtag Research (from your posts)
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find the best hashtags for your niche, analyze competition, and optimize your reach
        </p>
      </div>

      {/* Search Section */}
      <div className="card mb-8">
        <p className="text-sm text-gray-600">
          These suggestions come from the hashtags you already use in your recent posts,
          ranked by how much engagement they bring you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hashtag Results */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Best hashtags from your posts
            </h2>
            
            {loading ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Analyzing your recent posts…</p>
              </div>
            ) : error ? (
              <div className="text-sm text-red-600">{error}</div>
            ) : hashtags.length > 0 ? (
              <div className="space-y-3">
                {hashtags.map((hashtag) => (
                  <div key={hashtag.tag} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Hash className="h-4 w-4 text-purple-500" />
                        <span className="font-medium text-gray-900">{hashtag.tag}</span>
                        <div className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                          <TrendingUp className="h-3 w-3" />
                          <span>Used {hashtag.uses} times</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => saveHashtag(hashtag.tag)}
                        className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                      >
                        <Star className="h-3 w-3" />
                        <span>Save</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Posts:</span>
                        <span className="font-medium">{hashtag.uses}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <BarChart3 className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Avg engagement:</span>
                        <span className="font-medium">
                          {Math.round(hashtag.avgEngagement)} total
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Total engagement:</span>
                        <span className="font-medium">{Math.round(hashtag.totalEngagement)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Hash className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Once you start using hashtags in your posts, we’ll analyze them here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Saved Hashtags & Analysis */}
        <div className="space-y-6">
          {/* Saved Hashtags */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Saved Hashtags ({savedHashtags.length}/30)
              </h2>
              {savedHashtags.length > 0 && (
                <button
                  onClick={copyHashtagSet}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy All</span>
                </button>
              )}
            </div>
            
            {savedHashtags.length > 0 ? (
              <div className="space-y-2 mb-4">
                {savedHashtags.map((hashtag) => (
                  <div key={hashtag} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm">{hashtag}</span>
                    <button
                      onClick={() => removeHashtag(hashtag)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mb-4">
                Save hashtags from the results to build your hashtag set
              </p>
            )}
            
          </div>

          {/* Simple tips */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How to use these hashtags
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Use more of the hashtags at the top of the list – they are bringing you the most engagement.
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Mix 3–5 of your top tags with a few experiment tags each week, then check the analytics page.
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Every month, refresh this page to adjust your hashtag set based on what’s actually working.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

