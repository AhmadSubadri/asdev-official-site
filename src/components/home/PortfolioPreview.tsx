'use client'

import Link from 'next/link'
import Button from '@/components/shared/Button'
import { motion } from 'framer-motion'

const portfolioProjects = [
  {
    id: 1,
    title: 'Website E-Commerce Toko Online',
    description: 'Platform e-commerce lengkap dengan modern UI dan payment gateway terintegrasi',
    category: 'E-Commerce',
    image: '🛒',
  },
  {
    id: 2,
    title: 'Aplikasi Management Bisnis',
    description: 'Sistem informasi untuk mengelola inventory, penjualan, dan laporan bisnis',
    category: 'Sistem Informasi',
    image: '📊',
  },
  {
    id: 3,
    title: 'Website Company Profile',
    description: 'Website profesional untuk perusahaan dengan konten management system',
    category: 'Website',
    image: '🌐',
  },
  {
    id: 4,
    title: 'Aplikasi Mobile Food Order',
    description: 'Aplikasi mobile untuk pemesanan makanan dengan real-time tracking',
    category: 'Mobile App',
    image: '📱',
  },
  {
    id: 5,
    title: 'Dashboard Analytics',
    description: 'Dashboard untuk monitoring data dan analytics real-time',
    category: 'Website',
    image: '📈',
  },
  {
    id: 6,
    title: 'Sistem Manajemen Sekolah',
    description: 'Platform untuk manajemen akademik, siswa, dan kurikulum sekolah',
    category: 'Sistem Informasi',
    image: '🏫',
  },
]

export default function PortfolioPreview() {
  return (
    <section className="section py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-4xl md:text-5xl font-black mb-6">
            Portofolio Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lihat beberapa project yang telah kami selesaikan untuk klien-klien kami.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-video bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center overflow-hidden">
                <span className="text-6xl opacity-80">{project.image}</span>
                <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block text-xs font-semibold text-primary-500 bg-blue-50 px-3 py-1 rounded-full mb-3">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {project.description}
                </p>
                <a
                  href="#"
                  className="text-primary-500 font-semibold text-sm hover:text-primary-700 transition-colors inline-flex items-center gap-2"
                >
                  Lihat Detail
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/portfolio">
            <Button variant="primary" size="lg">
              Lihat Semua Portofolio
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
