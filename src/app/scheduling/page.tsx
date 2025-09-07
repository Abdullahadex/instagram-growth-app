'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { FollowModal } from '@/components/FollowModal'
import { Calendar, Clock, Hash, TrendingUp } from 'lucide-react'

export default function SchedulingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Smart Scheduling & Hashtags
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Post at optimal times with AI-powered hashtag suggestions to maximize your reach.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <Calendar className="h-8 w-8 text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Optimal Posting Times</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Monday</span>
                  <span className="text-green-600">11:00 AM, 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Tuesday</span>
                  <span className="text-blue-600">9:00 AM, 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Wednesday</span>
                  <span className="text-purple-600">10:00 AM, 8:00 PM</span>
                </div>
              </div>
            </div>

            <div className="card">
              <Hash className="h-8 w-8 text-purple-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Trending Hashtags</h2>
              <div className="flex flex-wrap gap-2">
                {['#InstaGrow', '#ContentCreator', '#ViralContent', '#SocialMediaTips', '#InstagramGrowth', '#Trending'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-instagram-gradient text-white rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <FollowModal />
    </div>
  )
}