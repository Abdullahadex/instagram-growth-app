'use client'

import React, { useState } from 'react'
import { 
  Sparkles, 
  Image, 
  FileText, 
  Palette, 
  HelpCircle, 
  Download,
  Copy,
  Share2,
  Instagram
} from 'lucide-react'
import { useApp } from './providers/AppProvider'

type ContentType = 'caption' | 'image' | 'wallpaper' | 'filter' | 'quiz'

export const AIContentGenerator: React.FC = () => {
  const { instagramHandle, updateAnalytics, analytics } = useApp()
  const [activeType, setActiveType] = useState<ContentType>('caption')
  const [prompt, setPrompt] = useState('')
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const contentTypes = [
    {
      type: 'caption' as ContentType,
      title: 'AI Captions',
      description: 'Generate viral Instagram captions',
      icon: FileText,
      color: 'from-blue-500 to-purple-500',
      placeholder: 'Describe your post (e.g., "sunset beach photo with friends")'
    },
    {
      type: 'image' as ContentType,
      title: 'Image Edits',
      description: 'AI-powered image filters and effects',
      icon: Image,
      color: 'from-purple-500 to-pink-500',
      placeholder: 'Describe the edit you want (e.g., "vintage film look")'
    },
    {
      type: 'wallpaper' as ContentType,
      title: 'Wallpapers',
      description: 'Custom phone wallpapers',
      icon: Palette,
      color: 'from-pink-500 to-orange-500',
      placeholder: 'Describe your wallpaper (e.g., "minimalist mountain landscape")'
    },
    {
      type: 'filter' as ContentType,
      title: 'AR Filters',
      description: 'Instagram story filters',
      icon: Sparkles,
      color: 'from-orange-500 to-red-500',
      placeholder: 'Describe your filter (e.g., "glowing skin with sparkles")'
    },
    {
      type: 'quiz' as ContentType,
      title: 'Viral Quizzes',
      description: 'Engaging personality quizzes',
      icon: HelpCircle,
      color: 'from-green-500 to-blue-500',
      placeholder: 'Quiz topic (e.g., "What\'s your 2025 vibe?")'
    }
  ]

  const generateContent = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // Simulate AI generation (replace with actual AI API call)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockContent = {
      caption: `🌟 ${prompt} ✨\n\nThis moment reminds me that life's best adventures happen when we least expect them! Who else is feeling grateful for spontaneous moments like these? 💫\n\n#Blessed #GoodVibes #Authentic #Grateful #LifeIsBeautiful #Mindful #Inspiration #Positivity #Adventure #Memories\n\n${instagramHandle}`,
      
      image: `🎨 Your image edit for "${prompt}" is ready!\n\n✅ Applied: Vintage film grain\n✅ Enhanced: Warm color tones\n✅ Added: Soft vignette effect\n✅ Boosted: Contrast and saturation\n\nDownload your edited image below! 📸\n\n${instagramHandle}`,
      
      wallpaper: `📱 Custom wallpaper: "${prompt}"\n\n🎨 Style: Modern minimalist\n📐 Resolution: 1080x1920\n🎯 Perfect for: iPhone & Android\n⚡ Instant download available\n\nMade with love by ${instagramHandle} ✨`,
      
      filter: `✨ AR Filter: "${prompt}"\n\n🔥 Features:\n• Real-time face tracking\n• Smooth skin enhancement\n• Sparkling particle effects\n• Color-matched lighting\n\n📲 Use this filter in your stories!\nTag ${instagramHandle} when you use it! 💫`,
      
      quiz: `🔮 QUIZ: "${prompt}"\n\nQuestion 1: What's your ideal weekend?\nA) Netflix & chill 🍿\nB) Outdoor adventure 🏔️\nC) Shopping spree 🛍️\nD) Creative projects 🎨\n\nQuestion 2: Pick a color:\nA) Cozy beige ☕\nB) Forest green 🌲\nC) Hot pink 💖\nD) Electric blue ⚡\n\nResults coming up... ✨\n\nShare your result! Tag ${instagramHandle}`
    }
    
    setGeneratedContent(mockContent[activeType])
    setIsGenerating(false)
    
    // Update analytics
    updateAnalytics('contentGenerated', analytics.contentGenerated + 1)
  }

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent)
      // Show toast notification (implement as needed)
    }
  }

  const shareContent = () => {
    if (generatedContent) {
      const text = encodeURIComponent(generatedContent)
      window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
    }
  }

  const downloadContent = () => {
    if (generatedContent) {
      const element = document.createElement('a')
      const file = new Blob([generatedContent], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `${activeType}-content.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          AI Content Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create viral Instagram content with AI. Every piece includes your handle for maximum exposure.
        </p>
      </div>

      {/* Content Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {contentTypes.map((type) => {
          const Icon = type.icon
          return (
            <button
              key={type.type}
              onClick={() => setActiveType(type.type)}
              className={`p-4 rounded-xl border-2 transition-all ${
                activeType === type.type
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} p-3 mx-auto mb-2`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{type.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{type.description}</p>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Generate {contentTypes.find(t => t.type === activeType)?.title}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe what you want to create
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={contentTypes.find(t => t.type === activeType)?.placeholder}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
            
            <button
              onClick={generateContent}
              disabled={!prompt.trim() || isGenerating}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating...
                </div>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Generated Content
          </h2>
          
          {generatedContent ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {generatedContent}
                </pre>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  <span className="text-sm">Copy</span>
                </button>
                
                <button
                  onClick={downloadContent}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span className="text-sm">Download</span>
                </button>
                
                <button
                  onClick={shareContent}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              
              <div className="bg-instagram-gradient p-4 rounded-lg text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Instagram className="h-5 w-5" />
                  <span className="font-semibold">Viral Tip</span>
                </div>
                <p className="text-sm">
                  Your content includes {instagramHandle} watermark for maximum viral exposure. 
                  When people share this, they'll see your handle and want to follow!
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Enter a prompt and click generate to create viral content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}