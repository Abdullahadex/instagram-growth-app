'use client'

import React, { useState } from 'react'
import { X, Instagram, ExternalLink, CheckCircle, Gift } from 'lucide-react'
import { useApp } from './providers/AppProvider'

export const FollowModal: React.FC = () => {
  const { showFollowModal, setShowFollowModal, user, setUser, instagramHandle } = useApp()
  const [step, setStep] = useState(1)
  const [isVerifying, setIsVerifying] = useState(false)

  if (!showFollowModal) return null

  const handleFollowClick = () => {
    // Open Instagram in new tab
    window.open(`https://instagram.com/${instagramHandle.replace('@', '')}`, '_blank')
    setStep(2)
  }

  const handleVerifyFollow = async () => {
    setIsVerifying(true)
    
    // Simulate verification delay (in real app, you might check via API or just trust the user)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mark user as having followed
    if (user) {
      const updatedUser = { ...user, hasFollowed: true }
      setUser(updatedUser)
      setStep(3)
    }
    
    setIsVerifying(false)
  }

  const handleClose = () => {
    setShowFollowModal(false)
    setStep(1)
  }

  const handleComplete = () => {
    setShowFollowModal(false)
    setStep(1)
    // Redirect to AI content page or show success message
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>

        {step === 1 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-instagram-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Instagram className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Follow to Unlock Premium Features
            </h2>
            <p className="text-gray-600 mb-6">
              Get access to AI content generation, engagement pods, and more by following our Instagram account.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">You'll unlock:</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>AI Caption Generator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Image Filters & Edits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Viral Quiz Creator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Engagement Pod Access</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Premium Wallpapers</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleFollowClick}
              className="w-full btn-primary text-lg py-4"
            >
              <Instagram className="h-5 w-5 mr-2" />
              Follow {instagramHandle}
              <ExternalLink className="h-4 w-4 ml-2" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Instagram className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Did You Follow Us?
            </h2>
            <p className="text-gray-600 mb-6">
              After following {instagramHandle}, click the button below to verify and unlock your premium features.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleVerifyFollow}
                disabled={isVerifying}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Yes, I Followed!
                  </>
                )}
              </button>
              
              <button
                onClick={handleFollowClick}
                className="w-full btn-secondary"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Instagram Again
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Premium! 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              You've successfully unlocked all premium features. Start creating viral content and growing your Instagram now!
            </p>
            
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-900 mb-2">Premium Features Unlocked:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
                <div>✅ AI Content</div>
                <div>✅ Engagement Pods</div>
                <div>✅ Viral Quizzes</div>
                <div>✅ Premium Filters</div>
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="w-full btn-primary text-lg py-4"
            >
              Start Creating Content
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            We respect your privacy. Following helps us grow and provide better features.
          </p>
        </div>
      </div>
    </div>
  )
}