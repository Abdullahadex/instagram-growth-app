'use client'

import React, { useState } from 'react'
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

interface Hashtag {
  tag: string;
  posts: number;
  difficulty: 'low' | 'medium' | 'high';
  engagement: number;
  trending: boolean;
  competition: number;
}

interface HashtagAnalysis {
  totalReach: number;
  avgEngagement: number;
  bestPerforming: string;
  recommendations: string[];
}

export const HashtagResearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNiche, setSelectedNiche] = useState('fitness')
  const [hashtags, setHashtags] = useState<Hashtag[]>([])
  const [savedHashtags, setSavedHashtags] = useState<string[]>([])
  const [analysis, setAnalysis] = useState<HashtagAnalysis | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const niches = [
    'fitness', 'lifestyle', 'food', 'travel', 'fashion', 'beauty', 
    'business', 'motivation', 'photography', 'art', 'music', 'tech'
  ]

  const difficultyColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800', 
    high: 'bg-red-100 text-red-800'
  }

  const searchHashtags = async () => {
    setIsSearching(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const mockHashtags: Hashtag[] = [
      {
        tag: `#${searchQuery || selectedNiche}`,
        posts: 2500000,
        difficulty: 'high',
        engagement: 8.5,
        trending: true,
        competition: 95
      },
      {
        tag: `#${searchQuery || selectedNiche}motivation`,
        posts: 1800000,
        difficulty: 'high',
        engagement: 7.2,
        trending: false,
        competition: 88
      },
      {
        tag: `#${searchQuery || selectedNiche}daily`,
        posts: 450000,
        difficulty: 'medium',
        engagement: 12.3,
        trending: true,
        competition: 65
      },
      {
        tag: `#${searchQuery || selectedNiche}life`,
        posts: 750000,
        difficulty: 'medium',
        engagement: 9.7,
        trending: false,
        competition: 72
      },
      {
        tag: `#${searchQuery || selectedNiche}tips`,
        posts: 300000,
        difficulty: 'low',
        engagement: 15.6,
        trending: true,
        competition: 45
      },
      {
        tag: `#${searchQuery || selectedNiche}journey`,
        posts: 680000,
        difficulty: 'medium',
        engagement: 11.2,
        trending: false,
        competition: 68
      },
      {
        tag: `#${searchQuery || selectedNiche}community`,
        posts: 220000,
        difficulty: 'low',
        engagement: 18.4,
        trending: true,
        competition: 38
      },
      {
        tag: `#${searchQuery || selectedNiche}goals`,
        posts: 890000,
        difficulty: 'medium',
        engagement: 10.1,
        trending: false,
        competition: 75
      }
    ]

    setHashtags(mockHashtags)
    setIsSearching(false)
  }

  const analyzeHashtags = async () => {
    if (savedHashtags.length === 0) return

    const mockAnalysis: HashtagAnalysis = {
      totalReach: Math.floor(Math.random() * 500000) + 100000,
      avgEngagement: Math.random() * 10 + 5,
      bestPerforming: savedHashtags[0],
      recommendations: [
        'Mix 3-5 high-competition hashtags with 15-20 low-competition ones',
        'Use trending hashtags within 24 hours for maximum reach',
        'Create branded hashtags to build community',
        'Research competitor hashtags weekly',
        'Test different hashtag combinations and track performance'
      ]
    }

    setAnalysis(mockAnalysis)
  }

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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K'
    }
    return num.toString()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Hashtag Research Tool
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find the best hashtags for your niche, analyze competition, and optimize your reach
        </p>
      </div>

      {/* Search Section */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Hashtags
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter keyword (e.g. fitness, travel)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Niche
            </label>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {niches.map(niche => (
                <option key={niche} value={niche}>
                  {niche.charAt(0).toUpperCase() + niche.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={searchHashtags}
              disabled={isSearching}
              className="w-full btn-primary disabled:opacity-50"
            >
              {isSearching ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </div>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Hashtags
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hashtag Results */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Hashtag Results
            </h2>
            
            {hashtags.length > 0 ? (
              <div className="space-y-3">
                {hashtags.map((hashtag, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Hash className="h-4 w-4 text-purple-500" />
                        <span className="font-medium text-gray-900">{hashtag.tag}</span>
                        {hashtag.trending && (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                            <TrendingUp className="h-3 w-3" />
                            <span>Trending</span>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => saveHashtag(hashtag.tag)}
                        className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                      >
                        <Star className="h-3 w-3" />
                        <span>Save</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Posts:</span>
                        <span className="font-medium">{formatNumber(hashtag.posts)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <BarChart3 className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Engagement:</span>
                        <span className="font-medium">{hashtag.engagement}%</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Competition:</span>
                        <span className="font-medium">{hashtag.competition}%</span>
                      </div>
                      
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[hashtag.difficulty]}`}>
                          {hashtag.difficulty.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Hash className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Search for hashtags to see results and recommendations
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
            
            {savedHashtags.length > 0 && (
              <button
                onClick={analyzeHashtags}
                className="w-full btn-primary text-sm"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyze Performance
              </button>
            )}
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Hashtag Analysis
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-700">Estimated Reach</span>
                  <span className="font-bold text-blue-900">{formatNumber(analysis.totalReach)}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-green-700">Avg Engagement</span>
                  <span className="font-bold text-green-900">{analysis.avgEngagement.toFixed(1)}%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-purple-700">Best Performer</span>
                  <span className="font-bold text-purple-900">{analysis.bestPerforming}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-1" />
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}