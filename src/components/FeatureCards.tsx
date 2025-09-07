'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  Share2, 
  Users, 
  Calendar, 
  Gift, 
  BarChart3,
  Lock,
  Unlock,
  ArrowRight
} from 'lucide-react'
import { useApp } from './providers/AppProvider'

export const FeatureCards: React.FC = () => {
  const { user, setShowFollowModal } = useApp()

  const features = [
    {
      id: 'ai-content',
      title: 'AI Content Generator',
      description: 'Generate viral captions, image edits, wallpapers, filters, and quizzes',
      icon: Sparkles,
      href: '/ai-content',
      requiresFollow: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'viral-sharing',
      title: 'Viral Sharing Loop',
      description: 'Every output has your handle watermarked for maximum exposure',
      icon: Share2,
      href: '/viral-sharing',
      requiresFollow: false,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'engagement-pods',
      title: 'Engagement Pods',
      description: 'Join ethical communities to boost your post engagement',
      icon: Users,
      href: '/engagement-pods',
      requiresFollow: true,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'smart-scheduling',
      title: 'Smart Scheduling',
      description: 'Post at optimal times with AI-powered hashtag suggestions',
      icon: Calendar,
      href: '/scheduling',
      requiresFollow: false,
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'referrals',
      title: 'Referral Rewards',
      description: 'Earn premium features by referring friends who follow you',
      icon: Gift,
      href: '/referrals',
      requiresFollow: false,
      color: 'from-pink-500 to-orange-500'
    },
    {
      id: 'analytics',
      title: 'Growth Analytics',
      description: 'Track followers, engagement, and referral impact',
      icon: BarChart3,
      href: '/analytics',
      requiresFollow: false,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const handleFeatureClick = (feature: typeof features[0]) => {
    if (feature.requiresFollow && !user?.hasFollowed) {
      setShowFollowModal(true)
      return
    }
    // Navigation will be handled by Link component
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            6 Powerful Features to <span className="gradient-text">Explode Your Growth</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each feature is designed to create viral loops and compound growth effects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            const isLocked = feature.requiresFollow && !user?.hasFollowed
            
            return (
              <div key={feature.id} className="card hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  {/* Lock/Unlock indicator */}
                  <div className="absolute top-0 right-0">
                    {isLocked ? (
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <Lock className="h-4 w-4 text-yellow-600" />
                      </div>
                    ) : (
                      <div className="p-2 bg-green-100 rounded-full">
                        <Unlock className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-4 mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>

                  {/* Action */}
                  {isLocked ? (
                    <button
                      onClick={() => handleFeatureClick(feature)}
                      className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors"
                    >
                      <Lock className="h-4 w-4" />
                      <span>Follow to Unlock</span>
                    </button>
                  ) : (
                    <Link
                      href={feature.href}
                      className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group-hover:bg-instagram-gradient group-hover:text-white"
                    >
                      <span>Explore Feature</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to action */}
        {!user?.hasFollowed && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Unlock All Features Now
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Follow our Instagram to unlock AI content generation and engagement pods. 
                Start building your viral growth engine today!
              </p>
              <button
                onClick={() => setShowFollowModal(true)}
                className="btn-primary text-lg px-8 py-4"
              >
                <Instagram className="h-5 w-5 mr-2" />
                Follow & Unlock All Features
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}