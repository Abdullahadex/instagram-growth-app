'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { FeatureCards } from '@/components/FeatureCards'
import { StatsSection } from '@/components/StatsSection'
import { FollowModal } from '@/components/FollowModal'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <FeatureCards />
        <StatsSection />
      </main>
      <FollowModal />
    </div>
  )
}