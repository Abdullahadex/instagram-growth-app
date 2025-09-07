'use client'

import React, { useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  Users, 
  Heart, 
  MessageCircle,
  Hash,
  Target,
  Calendar,
  BarChart3,
  Zap,
  Clock
} from 'lucide-react'

interface AutomationSettings {
  targetHashtags: string[];
  likesPerHour: number;
  followsPerHour: number;
  commentsPerHour: number;
  maxActionsPerDay: number;
  workingHours: {
    start: string;
    end: string;
  };
  targetAudience: {
    minFollowers: number;
    maxFollowers: number;
    engagementRate: number;
  };
}

interface AutomationStats {
  likes: number;
  follows: number;
  comments: number;
  unfollows: number;
  newFollowers: number;
  engagementRate: number;
}

export const AutomationDashboard: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [stats, setStats] = useState<AutomationStats>({
    likes: 0,
    follows: 0,
    comments: 0,
    unfollows: 0,
    newFollowers: 0,
    engagementRate: 0
  });

  const [settings, setSettings] = useState<AutomationSettings>({
    targetHashtags: ['fitness', 'lifestyle', 'motivation'],
    likesPerHour: 30,
    followsPerHour: 15,
    commentsPerHour: 10,
    maxActionsPerDay: 500,
    workingHours: {
      start: '09:00',
      end: '21:00'
    },
    targetAudience: {
      minFollowers: 100,
      maxFollowers: 10000,
      engagementRate: 2.0
    }
  });

  // Simulate real-time stats updates
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setStats(prev => ({
          likes: prev.likes + Math.floor(Math.random() * 3),
          follows: prev.follows + Math.floor(Math.random() * 2),
          comments: prev.comments + Math.floor(Math.random() * 2),
          unfollows: prev.unfollows + Math.floor(Math.random() * 1),
          newFollowers: prev.newFollowers + Math.floor(Math.random() * 2),
          engagementRate: Math.max(0, prev.engagementRate + (Math.random() - 0.5) * 0.1)
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const toggleAutomation = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      // Start automation logic here
      console.log('Starting Instagram automation...');
    } else {
      // Stop automation logic here
      console.log('Stopping Instagram automation...');
    }
  };

  const addHashtag = (hashtag: string) => {
    if (hashtag && !settings.targetHashtags.includes(hashtag)) {
      setSettings(prev => ({
        ...prev,
        targetHashtags: [...prev.targetHashtags, hashtag]
      }));
    }
  };

  const removeHashtag = (hashtag: string) => {
    setSettings(prev => ({
      ...prev,
      targetHashtags: prev.targetHashtags.filter(h => h !== hashtag)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Instagram Automation
          </h1>
          <p className="text-gray-600">
            Automate your Instagram growth with smart engagement
          </p>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          
          <button
            onClick={toggleAutomation}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
              isRunning 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Stop Automation</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Start Automation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Banner */}
      <div className={`p-4 rounded-lg mb-8 ${
        isRunning 
          ? 'bg-green-50 border border-green-200' 
          : 'bg-gray-50 border border-gray-200'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
          }`}></div>
          <span className="font-medium">
            {isRunning ? 'Automation Running' : 'Automation Stopped'}
          </span>
          {isRunning && (
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Next action in 2m 34s</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="card text-center">
          <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.likes}</div>
          <div className="text-sm text-gray-600">Likes Today</div>
        </div>
        
        <div className="card text-center">
          <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.follows}</div>
          <div className="text-sm text-gray-600">Follows Today</div>
        </div>
        
        <div className="card text-center">
          <MessageCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.comments}</div>
          <div className="text-sm text-gray-600">Comments Today</div>
        </div>
        
        <div className="card text-center">
          <TrendingUp className="h-6 w-6 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.newFollowers}</div>
          <div className="text-sm text-gray-600">New Followers</div>
        </div>
        
        <div className="card text-center">
          <BarChart3 className="h-6 w-6 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.engagementRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Engagement Rate</div>
        </div>
        
        <div className="card text-center">
          <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {stats.likes + stats.follows + stats.comments}
          </div>
          <div className="text-sm text-gray-600">Total Actions</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Target Hashtags */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Hash className="h-5 w-5 mr-2" />
            Target Hashtags
          </h2>
          
          <div className="space-y-2 mb-4">
            {settings.targetHashtags.map((hashtag) => (
              <div key={hashtag} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm">#{hashtag}</span>
                <button
                  onClick={() => removeHashtag(hashtag)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Add hashtag"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addHashtag((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector('input[placeholder="Add hashtag"]') as HTMLInputElement;
                addHashtag(input.value);
                input.value = '';
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
            >
              Add
            </button>
          </div>
        </div>

        {/* Automation Settings */}
        {showSettings && (
          <div className="card lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Automation Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Likes per Hour
                </label>
                <input
                  type="number"
                  value={settings.likesPerHour}
                  onChange={(e) => setSettings(prev => ({ ...prev, likesPerHour: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min="1"
                  max="100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follows per Hour
                </label>
                <input
                  type="number"
                  value={settings.followsPerHour}
                  onChange={(e) => setSettings(prev => ({ ...prev, followsPerHour: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min="1"
                  max="50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments per Hour
                </label>
                <input
                  type="number"
                  value={settings.commentsPerHour}
                  onChange={(e) => setSettings(prev => ({ ...prev, commentsPerHour: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min="1"
                  max="30"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Actions per Day
                </label>
                <input
                  type="number"
                  value={settings.maxActionsPerDay}
                  onChange={(e) => setSettings(prev => ({ ...prev, maxActionsPerDay: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min="100"
                  max="1000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Working Hours Start
                </label>
                <input
                  type="time"
                  value={settings.workingHours.start}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    workingHours: { ...prev.workingHours, start: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Working Hours End
                </label>
                <input
                  type="time"
                  value={settings.workingHours.end}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    workingHours: { ...prev.workingHours, end: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2 text-yellow-800">
                <Target className="h-4 w-4" />
                <span className="font-medium">Safety Limits</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                These limits help keep your account safe from Instagram's spam detection. 
                Adjust carefully to avoid shadowbans or account restrictions.
              </p>
            </div>
          </div>
        )}

        {/* Activity Log */}
        {!showSettings && (
          <div className="card lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {[
                { action: 'Liked post from @fitness_guru', time: '2 minutes ago', type: 'like' },
                { action: 'Followed @healthy_lifestyle_tips', time: '5 minutes ago', type: 'follow' },
                { action: 'Commented "Great post!" on @motivation_daily', time: '8 minutes ago', type: 'comment' },
                { action: 'Liked post from #fitness hashtag', time: '12 minutes ago', type: 'like' },
                { action: 'Followed @workout_inspiration', time: '15 minutes ago', type: 'follow' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {activity.type === 'like' && <Heart className="h-4 w-4 text-red-500" />}
                    {activity.type === 'follow' && <Users className="h-4 w-4 text-blue-500" />}
                    {activity.type === 'comment' && <MessageCircle className="h-4 w-4 text-green-500" />}
                    <span className="text-sm text-gray-700">{activity.action}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}