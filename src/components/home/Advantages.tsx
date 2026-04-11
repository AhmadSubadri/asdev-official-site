'use client'

import { motion } from 'framer-motion'

const advantages = [
  {
    id: 1,
    title: 'Solusi Custom',
    description: 'Kami membuat solusi yang disesuaikan dengan kebutuhan spesifik bisnis Anda, bukan template generik.',
    icon: '✨',
  },
  {
    id: 2,
    title: 'Harga Kompetitif',
    description: 'Dapatkan kualitas terbaik dengan harga yang kompetitif dan fleksibel sesuai budget Anda.',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Tim Profesional',
    description: 'Tim berpengalaman yang siap bekerja sama dengan kami dengan komunikasi yang transparan.',
    icon: '👥',
  },
  {
    id: 4,
    title: 'Support Berkelanjutan',
    description: 'Kami memberikan dukungan teknis berkelanjutan setelah project selesai untuk memastikan sistem berjalan optimal.',
    icon: '🛡️',
  },
  {
    id: 5,
    title: 'Teknologi Terkini',
    description: 'Menggunakan teknologi dan framework terbaru untuk memastikan sistem modern dan scalable.',
    icon: '🚀',
  },
  {
    id: 6,
    title: 'Pengalaman Luas',
    description: 'Lebih dari 5 tahun pengalaman menangani berbagai project untuk berbagai industri.',
    icon: '🏆',
  },
]

export default function Advantages() {
  return (
    <section className="section py-20">
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
            Mengapa Memilih Kami?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan solusi teknologi terbaik dengan dukungan profesional untuk
            kesuksesan bisnis Anda.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-500 text-white text-2xl">
                  {advantage.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-600 text-sm">{advantage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
