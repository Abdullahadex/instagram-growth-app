'use client'

import React, { useState } from 'react'
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Share2, 
  Clock, 
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  UserPlus
} from 'lucide-react'
import { useApp } from './providers/AppProvider'

interface Pod {
  id: string
  name: string
  category: string
  members: number
  maxMembers: number
  avgEngagement: number
  description: string
  requirements: string[]
  isJoined: boolean
}

export const EngagementPods: React.FC = () => {
  const { user } = useApp()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [joinedPods, setJoinedPods] = useState<string[]>([])

  const categories = [
    { id: 'all', name: 'All Pods', count: 12 },
    { id: 'lifestyle', name: 'Lifestyle', count: 4 },
    { id: 'business', name: 'Business', count: 3 },
    { id: 'fitness', name: 'Fitness', count: 2 },
    { id: 'travel', name: 'Travel', count: 2 },
    { id: 'food', name: 'Food', count: 1 }
  ]

  const pods: Pod[] = [
    {
      id: '1',
      name: 'Lifestyle Creators Hub',
      category: 'lifestyle',
      members: 45,
      maxMembers: 50,
      avgEngagement: 8.2,
      description: 'A supportive community for lifestyle content creators focusing on daily inspiration and authentic moments.',
      requirements: ['Post 3-5 times per week', 'Engage within 2 hours', 'Quality content only'],
      isJoined: false
    },
    {
      id: '2',
      name: 'Business Growth Network',
      category: 'business',
      members: 38,
      maxMembers: 40,
      avgEngagement: 12.5,
      description: 'Entrepreneurs and business owners supporting each other\'s growth journey.',
      requirements: ['Business-focused content', 'Genuine engagement', 'Active participation'],
      isJoined: false
    },
    {
      id: '3',
      name: 'Fitness Motivation Squad',
      category: 'fitness',
      members: 32,
      maxMembers: 35,
      avgEngagement: 9.8,
      description: 'Fitness enthusiasts sharing workouts, progress, and motivation.',
      requirements: ['Fitness-related posts', 'Positive community spirit', 'Regular activity'],
      isJoined: false
    },
    {
      id: '4',
      name: 'Travel Wanderers',
      category: 'travel',
      members: 28,
      maxMembers: 30,
      avgEngagement: 11.3,
      description: 'Travel lovers sharing adventures, tips, and wanderlust inspiration.',
      requirements: ['Travel content focus', 'High-quality photos', 'Engaging captions'],
      isJoined: false
    }
  ]

  const filteredPods = selectedCategory === 'all' 
    ? pods 
    : pods.filter(pod => pod.category === selectedCategory)

  const joinPod = (podId: string) => {
    setJoinedPods(prev => [...prev, podId])
  }

  const leavePod = (podId: string) => {
    setJoinedPods(prev => prev.filter(id => id !== podId))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Engagement Pods
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join ethical engagement communities to boost your reach. Support others and they'll support you back!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{joinedPods.length}</div>
          <div className="text-gray-600">Joined Pods</div>
        </div>
        <div className="card text-center">
          <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">+{joinedPods.length * 15}%</div>
          <div className="text-gray-600">Avg Engagement</div>
        </div>
        <div className="card text-center">
          <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{joinedPods.length * 23}</div>
          <div className="text-gray-600">Daily Likes</div>
        </div>
        <div className="card text-center">
          <MessageCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{joinedPods.length * 8}</div>
          <div className="text-gray-600">Daily Comments</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-instagram-gradient text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-white bg-opacity-20'
                      : 'bg-gray-200'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-500 mb-2" />
              <h4 className="font-semibold text-blue-900 mb-1">Ethical Guidelines</h4>
              <p className="text-sm text-blue-700">
                Our pods focus on genuine engagement. Only join pods relevant to your niche for authentic growth.
              </p>
            </div>
          </div>
        </div>

        {/* Pods List */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {filteredPods.map(pod => {
              const isJoined = joinedPods.includes(pod.id)
              const isFull = pod.members >= pod.maxMembers
              
              return (
                <div key={pod.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{pod.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                          {pod.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{pod.description}</p>
                    </div>
                    
                    {isJoined ? (
                      <button
                        onClick={() => leavePod(pod.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Leave Pod
                      </button>
                    ) : (
                      <button
                        onClick={() => joinPod(pod.id)}
                        disabled={isFull}
                        className="px-4 py-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isFull ? 'Full' : 'Join Pod'}
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {pod.members}/{pod.maxMembers} members
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {pod.avgEngagement}% avg engagement
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {isJoined ? 'Active member' : 'Available'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {pod.requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {isJoined && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-green-900">You're in this pod!</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Engage with other members' posts within 2 hours for best results. 
                        Check the pod activity feed for new posts to engage with.
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* How It Works */}
          <div className="mt-12 card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How Engagement Pods Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="h-6 w-6 text-blue-500" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">1. Join Relevant Pods</h4>
                <p className="text-sm text-gray-600">
                  Choose pods that match your niche and content style for authentic engagement.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-green-500" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">2. Engage Authentically</h4>
                <p className="text-sm text-gray-600">
                  Like and comment genuinely on other members' posts within the time window.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">3. Boost Your Reach</h4>
                <p className="text-sm text-gray-600">
                  Early engagement signals to Instagram that your content is valuable, increasing organic reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}