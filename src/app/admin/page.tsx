'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/shared/Button'

export default function AdminDashboard() {
  const router = useRouter()
  const [IsAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated by trying to fetch protected data
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check')
        if (response.status === 401) {
          router.push('/admin/login')
        } else {
          setIsAuthenticated(true)
        }
      } catch {
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Services', count: 6, icon: '🛠️' },
            { label: 'Portfolio', count: 6, icon: '📁' },
            { label: 'Blog Posts', count: 6, icon: '📝' },
            { label: 'Messages', count: 0, icon: '💬' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-4xl font-bold text-primary">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Services',
              description: 'Kelola layanan yang ditawarkan',
              href: '/admin/services',
              icon: '🛠️',
            },
            {
              title: 'Portfolio',
              description: 'Kelola project portofolio',
              href: '/admin/portfolio',
              icon: '📁',
            },
            {
              title: 'Blog',
              description: 'Kelola artikel blog',
              href: '/admin/blog',
              icon: '📝',
            },
            {
              title: 'Messages',
              description: 'Lihat pesan dari pengunjung',
              href: '/admin/messages',
              icon: '💬',
            },
          ].map((section) => (
            <Link key={section.title} href={section.href}>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all cursor-pointer group">
                <div className="text-4xl mb-4">{section.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{section.description}</p>
                <div className="mt-4 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                  Buka →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
