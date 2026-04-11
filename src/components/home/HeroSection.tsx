'use client'

import Link from 'next/link'
import Button from '@/components/shared/Button'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 opacity-5 rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500 opacity-5 rounded-full -ml-48 -mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
              Transformasi Digital untuk{' '}
              <span className="text-primary-500">Bisnis Anda</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Kami menyediakan solusi teknologi terpercaya dan inovatif untuk membantu bisnis
              Anda berkembang di era digital. Dari website hingga aplikasi mobile, kami siap
              mewujudkan visi digital Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Hubungi Kami
                  <span className="text-xl">→</span>
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Lihat Portofolio
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-black text-primary-500">50+</div>
                <p className="text-gray-600 text-sm mt-1">Project Selesai</p>
              </div>
              <div>
                <div className="text-3xl font-black text-primary-500">30+</div>
                <p className="text-gray-600 text-sm mt-1">Klien Puas</p>
              </div>
              <div>
                <div className="text-3xl font-black text-primary-500">5+</div>
                <p className="text-gray-600 text-sm mt-1">Tahun Pengalaman</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Placeholder for illustration */}
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 shadow-2xl aspect-square flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">💻</div>
                  <p className="text-sm opacity-90">Solusi Digital Terpercaya</p>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs"
              >
                <p className="text-sm font-semibold text-gray-900">Website Development</p>
                <p className="text-xs text-gray-600 mt-1">Cepat, Modern, Responsif</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs"
              >
                <p className="text-sm font-semibold text-gray-900">Aplikasi Mobile</p>
                <p className="text-xs text-gray-600 mt-1">iOS & Android dalam satu platform</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400 text-sm">
          <span>Scroll untuk selengkapnya</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
