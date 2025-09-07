'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Instagram, Sparkles, Users, Calendar, Gift, BarChart3, Menu, X, Zap, Hash, Clock } from 'lucide-react'
import { useApp } from './providers/AppProvider'

export const Header: React.FC = () => {
  const { user, instagramHandle } = useApp()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home', icon: Sparkles },
    { path: '/automation', label: 'Automation', icon: Zap },
    { path: '/content-scheduler', label: 'Scheduler', icon: Clock },
    { path: '/hashtag-research', label: 'Hashtags', icon: Hash },
    { path: '/ai-content', label: 'AI Content', icon: Sparkles },
    { path: '/engagement-pods', label: 'Engagement', icon: Users },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ]

  return (
    <header className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-instagram-gradient rounded-lg">
              <Instagram className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">InstaGrow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                href={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  pathname === path
                    ? 'bg-instagram-gradient text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          {/* User Status */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Instagram className="h-4 w-4 text-instagram-pink" />
              <span className="text-sm text-gray-600">{instagramHandle}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              user?.hasFollowed 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user?.hasFollowed ? 'Following' : 'Not Following'}
            </div>
            {user?.isPremium && (
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Premium
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  href={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    pathname === path
                      ? 'bg-instagram-gradient text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{instagramHandle}</span>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user?.hasFollowed 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user?.hasFollowed ? 'Following' : 'Not Following'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}