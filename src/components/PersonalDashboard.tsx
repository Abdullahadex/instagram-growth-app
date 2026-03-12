'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Instagram, RefreshCw } from 'lucide-react'
import { useApp } from './providers/AppProvider'

interface MediaItem {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  caption?: string
  permalink: string
  timestamp: string
}

export const PersonalDashboard: React.FC = () => {
  const { instagramHandle } = useApp()
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadMedia = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch('/api/instagram/media')
      if (!res.ok) {
        throw new Error('Failed to fetch media')
      }
      const data = await res.json()
      setMedia(data.data || [])
    } catch (e) {
      setError('Could not load your Instagram posts. They may be private or the token may have expired.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMedia()
  }, [])

  return (
    <main className="pt-20 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Simple hero */}
      <section className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 bg-instagram-gradient rounded-full">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Your Instagram dashboard
              </h1>
            </div>
            <p className="text-gray-600">
              Connected account:{' '}
              <a
                href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-instagram-pink underline underline-offset-2"
              >
                {instagramHandle}
              </a>
            </p>
          </div>
          <button
            onClick={loadMedia}
            disabled={loading}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {loading ? 'Refreshing…' : 'Refresh posts'}
          </button>
        </div>
      </section>

      {/* Media grid */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent posts</h2>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading && !media.length ? (
          <div className="py-10 text-center text-gray-500 text-sm">
            Loading your Instagram posts…
          </div>
        ) : !media.length ? (
          <div className="py-10 text-center text-gray-500 text-sm">
            No posts could be loaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {media.map((item) => (
              <a
                key={item.id}
                href={item.permalink}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={item.thumbnail_url || item.media_url}
                    alt={item.caption || 'Instagram post'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 mb-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                  {item.caption && (
                    <p className="text-sm text-gray-800 line-clamp-2">{item.caption}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

