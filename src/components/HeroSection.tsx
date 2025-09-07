'use client'

import React from 'react'
import { Instagram, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'
import { useApp } from './providers/AppProvider'

export const HeroSection: React.FC = () => {
  const { setShowFollowModal, analytics } = useApp()

  return (
    <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="p-3 bg-instagram-gradient rounded-full">
              <Instagram className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold gradient-text">InstaGrow</h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Grow Your Instagram to <span className="gradient-text">10K+ Followers</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Use AI-powered content creation, viral sharing mechanics, and ethical engagement pods 
            to build real influence on Instagram. No shadowbans, no fake followers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => setShowFollowModal(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Start Growing Now
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="h-5 w-5" />
              <span>2-3 months to 10K followers</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{analytics.followers.toLocaleString()}</div>
              <div className="text-gray-600">Followers Gained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{analytics.engagement}%</div>
              <div className="text-gray-600">Avg Engagement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{analytics.referrals}</div>
              <div className="text-gray-600">Referrals Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{analytics.contentGenerated}</div>
              <div className="text-gray-600">Content Created</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}