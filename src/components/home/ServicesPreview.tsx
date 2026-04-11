'use client'

import Link from 'next/link'
import Button from '@/components/shared/Button'
import { motion } from 'framer-motion'

const services = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Buat website profesional yang modern dan responsif untuk meningkatkan online presence bisnis Anda.',
    icon: '🌐',
    color: 'bg-blue-100',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Aplikasi mobile native atau cross-platform untuk Android dan iOS dengan performa optimal.',
    icon: '📱',
    color: 'bg-green-100',
  },
  {
    id: 3,
    title: 'Sistem Informasi Custom',
    description: 'Sistem informasi yang disesuaikan dengan kebutuhan bisnis Anda (ERP, POS, CRM, dll).',
    icon: '⚙️',
    color: 'bg-yellow-100',
  },
  {
    id: 4,
    title: 'E-Commerce Solution',
    description: 'Platform e-commerce yang lengkap dengan payment gateway dan inventory management.',
    icon: '🛒',
    color: 'bg-red-100',
  },
  {
    id: 5,
    title: 'UI/UX Design',
    description: 'Desain interface yang menarik dan user experience yang intuitif untuk aplikasi Anda.',
    icon: '🎨',
    color: 'bg-purple-100',
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    description: 'Dukungan teknis berkelanjutan dan pemeliharaan sistem untuk performa optimal.',
    icon: '🔧',
    color: 'bg-pink-100',
  },
]

export default function ServicesPreview() {
  return (
    <section className="section bg-gray-50 py-20">
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
            Layanan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami menawarkan berbagai solusi teknologi yang dirancang untuk membantu bisnis Anda
            berkembang dan bersaing di era digital.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
              <a
                href="#"
                className="text-primary-500 font-semibold text-sm hover:text-primary-700 transition-colors inline-flex items-center gap-2"
              >
                Selengkapnya
                <span>→</span>
              </a>
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
          <Link href="/services">
            <Button variant="primary" size="lg">
              Lihat Semua Layanan
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
