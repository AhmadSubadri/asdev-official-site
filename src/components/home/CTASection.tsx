'use client'

import Link from 'next/link'
import Button from '@/components/shared/Button'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-90" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Siap Transformasi Digital?
          </h2>

          <p className="text-lg md:text-xl text-white opacity-90 mb-8">
            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan solusi yang tepat untuk
            bisnis Anda. Tim kami siap membantu Anda mencapai tujuan digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-primary-500 hover:bg-gray-100"
              >
                Hubungi Kami Sekarang
              </Button>
            </Link>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-500"
              >
                Chat via WhatsApp
              </Button>
            </a>
          </div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-white">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-white opacity-80 text-sm mt-2">Support Tersedia</p>
            </div>
            <div className="text-white">
              <p className="text-3xl font-bold">100%</p>
              <p className="text-white opacity-80 text-sm mt-2">Kepuasan Klien</p>
            </div>
            <div className="text-white">
              <p className="text-3xl font-bold">50+</p>
              <p className="text-white opacity-80 text-sm mt-2">Project Sukses</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
