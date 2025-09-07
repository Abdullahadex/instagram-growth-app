'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  hasFollowed: boolean
  referralCode: string
  referralCount: number
  isPremium: boolean
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  showFollowModal: boolean
  setShowFollowModal: (show: boolean) => void
  instagramHandle: string
  setInstagramHandle: (handle: string) => void
  analytics: {
    followers: number
    engagement: number
    referrals: number
    contentGenerated: number
  }
  updateAnalytics: (key: string, value: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [showFollowModal, setShowFollowModal] = useState(false)
  const [instagramHandle, setInstagramHandle] = useState('@your_handle')
  const [analytics, setAnalytics] = useState({
    followers: 1250,
    engagement: 4.2,
    referrals: 23,
    contentGenerated: 156
  })

  // Initialize user on first load
  useEffect(() => {
    const savedUser = localStorage.getItem('instaGrowUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        hasFollowed: false,
        referralCode: Math.random().toString(36).substr(2, 8).toUpperCase(),
        referralCount: 0,
        isPremium: false
      }
      setUser(newUser)
      localStorage.setItem('instaGrowUser', JSON.stringify(newUser))
    }

    const savedHandle = localStorage.getItem('instagramHandle')
    if (savedHandle) {
      setInstagramHandle(savedHandle)
    }
  }, [])

  // Save user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('instaGrowUser', JSON.stringify(user))
    }
  }, [user])

  const updateAnalytics = (key: string, value: number) => {
    setAnalytics(prev => ({ ...prev, [key]: value }))
  }

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      showFollowModal,
      setShowFollowModal,
      instagramHandle,
      setInstagramHandle,
      analytics,
      updateAnalytics
    }}>
      {children}
    </AppContext.Provider>
  )
}