'use client'

import React, { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  Image, 
  Video, 
  FileText, 
  Send, 
  Eye,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  Users,
  Hash
} from 'lucide-react'

interface ScheduledPost {
  id: string;
  type: 'image' | 'video' | 'carousel';
  content: string;
  caption: string;
  hashtags: string[];
  scheduledTime: Date;
  status: 'scheduled' | 'posted' | 'failed';
  mediaUrls: string[];
  estimatedReach?: number;
  bestTime?: boolean;
}

export const ContentScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showNewPost, setShowNewPost] = useState(false)
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      type: 'image',
      content: 'Morning workout motivation',
      caption: '🔥 Starting the day strong! Nothing beats that post-workout endorphin rush ✨\n\nWhat\'s your favorite way to kickstart the morning?',
      hashtags: ['#fitness', '#motivation', '#morningworkout', '#healthylifestyle', '#fitnessmotivation'],
      scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      status: 'scheduled',
      mediaUrls: ['https://via.placeholder.com/400x400?text=Workout+Photo'],
      estimatedReach: 2500,
      bestTime: true
    },
    {
      id: '2',
      type: 'carousel',
      content: 'Recipe carousel',
      caption: '🥗 5 Quick & Healthy Meal Prep Ideas! Swipe for all recipes ➡️\n\nSave this post for your next grocery run!',
      hashtags: ['#mealprep', '#healthyfood', '#recipes', '#nutrition', '#wellness'],
      scheduledTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      status: 'scheduled',
      mediaUrls: [
        'https://via.placeholder.com/400x400?text=Recipe+1',
        'https://via.placeholder.com/400x400?text=Recipe+2',
        'https://via.placeholder.com/400x400?text=Recipe+3'
      ],
      estimatedReach: 3200
    }
  ])

  const [newPost, setNewPost] = useState({
    type: 'image' as 'image' | 'video' | 'carousel',
    caption: '',
    hashtags: '',
    scheduledDate: '',
    scheduledTime: '',
    mediaFiles: [] as File[]
  })

  const bestPostingTimes = [
    { time: '9:00 AM', engagement: '12.5%', day: 'Weekday' },
    { time: '1:00 PM', engagement: '11.8%', day: 'Weekday' },
    { time: '6:00 PM', engagement: '15.2%', day: 'Weekday' },
    { time: '8:00 PM', engagement: '13.7%', day: 'Weekend' },
    { time: '10:00 AM', engagement: '14.1%', day: 'Weekend' }
  ]

  const handleSchedulePost = () => {
    const scheduledDateTime = new Date(`${newPost.scheduledDate}T${newPost.scheduledTime}`)
    
    const post: ScheduledPost = {
      id: Date.now().toString(),
      type: newPost.type,
      content: newPost.caption.split('\n')[0] || 'New post',
      caption: newPost.caption,
      hashtags: newPost.hashtags.split(' ').filter(h => h.startsWith('#')),
      scheduledTime: scheduledDateTime,
      status: 'scheduled',
      mediaUrls: newPost.mediaFiles.map(file => URL.createObjectURL(file)),
      estimatedReach: Math.floor(Math.random() * 5000) + 1000
    }

    setScheduledPosts([...scheduledPosts, post])
    setNewPost({
      type: 'image',
      caption: '',
      hashtags: '',
      scheduledDate: '',
      scheduledTime: '',
      mediaFiles: []
    })
    setShowNewPost(false)
  }

  const deletePost = (postId: string) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== postId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'posted': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setNewPost(prev => ({ ...prev, mediaFiles: files }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Content Scheduler
          </h1>
          <p className="text-gray-600">
            Schedule your Instagram posts for optimal engagement
          </p>
        </div>
        
        <button
          onClick={() => setShowNewPost(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Best Times to Post */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Best Times to Post
          </h2>
          
          <div className="space-y-3">
            {bestPostingTimes.map((time, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{time.time}</div>
                  <div className="text-sm text-gray-600">{time.day}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">{time.engagement}</div>
                  <div className="text-xs text-gray-500">avg engagement</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-800">
              <Clock className="h-4 w-4" />
              <span className="font-medium text-sm">Smart Tip</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Posts scheduled during peak times get 40% more engagement on average
            </p>
          </div>
        </div>

        {/* Scheduled Posts */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Scheduled Posts ({scheduledPosts.length})
            </h2>
            
            {scheduledPosts.length > 0 ? (
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {post.type === 'image' && <Image className="h-5 w-5 text-purple-500" />}
                          {post.type === 'video' && <Video className="h-5 w-5 text-red-500" />}
                          {post.type === 'carousel' && <FileText className="h-5 w-5 text-blue-500" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{post.content}</h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDateTime(post.scheduledTime)}
                            </span>
                            {post.bestTime && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                Optimal Time
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                          {post.status.toUpperCase()}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deletePost(post.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 line-clamp-2">{post.caption}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.hashtags.slice(0, 3).map((hashtag) => (
                          <span key={hashtag} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                            {hashtag}
                          </span>
                        ))}
                        {post.hashtags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{post.hashtags.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      {post.estimatedReach && (
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{post.estimatedReach.toLocaleString()} reach</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No scheduled posts yet. Create your first scheduled post!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Schedule New Post</h2>
              <button
                onClick={() => setShowNewPost(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Post Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Type
                </label>
                <div className="flex space-x-4">
                  {[
                    { type: 'image', icon: Image, label: 'Image' },
                    { type: 'video', icon: Video, label: 'Video' },
                    { type: 'carousel', icon: FileText, label: 'Carousel' }
                  ].map(({ type, icon: Icon, label }) => (
                    <button
                      key={type}
                      onClick={() => setNewPost(prev => ({ ...prev, type: type as any }))}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                        newPost.type === type
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Media
                </label>
                <input
                  type="file"
                  multiple={newPost.type === 'carousel'}
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <textarea
                  value={newPost.caption}
                  onChange={(e) => setNewPost(prev => ({ ...prev, caption: e.target.value }))}
                  placeholder="Write your caption here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              {/* Hashtags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hashtags
                </label>
                <input
                  type="text"
                  value={newPost.hashtags}
                  onChange={(e) => setNewPost(prev => ({ ...prev, hashtags: e.target.value }))}
                  placeholder="#hashtag1 #hashtag2 #hashtag3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Schedule Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    value={newPost.scheduledDate}
                    onChange={(e) => setNewPost(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Time
                  </label>
                  <input
                    type="time"
                    value={newPost.scheduledTime}
                    onChange={(e) => setNewPost(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSchedulePost}
                  disabled={!newPost.caption || !newPost.scheduledDate || !newPost.scheduledTime}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Schedule Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}