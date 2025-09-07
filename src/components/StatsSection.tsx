'use client'

import React from 'react'
import { TrendingUp, Users, Heart, Share2 } from 'lucide-react'

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '10K+',
      label: 'Followers in 2-3 months',
      description: 'Average growth rate with our system'
    },
    {
      icon: Users,
      value: '5,000+',
      label: 'Active users',
      description: 'Growing community of creators'
    },
    {
      icon: Heart,
      value: '4.8x',
      label: 'Engagement boost',
      description: 'Higher engagement vs organic'
    },
    {
      icon: Share2,
      value: '85%',
      label: 'Viral content rate',
      description: 'Content that gets shared'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Proven Results from <span className="gradient-text">Real Creators</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our growth system has helped thousands of creators build authentic, engaged audiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-instagram-gradient rounded-full mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-600">
                  {stat.description}
                </div>
              </div>
            )
          })}
        </div>

        {/* Testimonial */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl text-gray-600 mb-6 italic">
                "I went from 500 to 12K followers in just 3 months using InstaGrow. 
                The AI content generator is incredible, and the engagement pods actually work!"
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-instagram-gradient rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">SJ</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-600">@sarahcreates • 12.3K followers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}