'use client'

import { Header } from '@/components/Header'
import { PersonalDashboard } from '@/components/PersonalDashboard'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PersonalDashboard />
    </div>
  )
}