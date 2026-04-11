import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portofolio - Asdev Digital Solution',
  description: 'Lihat project dan case study yang telah kami selesaikan untuk berbagai klien.',
}

const portfolioProjects = [
  {
    id: 1,
    title: 'Platform E-Commerce Toko Online',
    category: 'E-Commerce',
    description: 'Platform e-commerce lengkap dengan sistem pembayaran, inventory management, dan analytics.',
    year: 2023,
  },
  {
    id: 2,
    title: 'Sistem Manajemen Bisnis Terintegrasi',
    category: 'Sistem Informasi',
    description: 'Sistem ERP untuk mengelola seluruh aspek bisnis mulai dari penjualan hingga laporan keuangan.',
    year: 2023,
  },
  {
    id: 3,
    title: 'Website Perusahaan Multinasional',
    category: 'Website',
    description: 'Website company profile modern dengan CMS dan multi-language support.',
    year: 2022,
  },
  {
    id: 4,
    title: 'Aplikasi Mobile Food Delivery',
    category: 'Mobile App',
    description: 'Aplikasi mobile iOS dan Android untuk pemesanan makanan dengan real-time tracking.',
    year: 2022,
  },
  {
    id: 5,
    title: 'Dashboard Analytics Real-Time',
    category: 'Website',
    description: 'Dashboard untuk monitoring data penjualan dan analytics dengan visualisasi interaktif.',
    year: 2023,
  },
  {
    id: 6,
    title: 'Sistem Manajemen Sekolah Online',
    category: 'Sistem Informasi',
    description: 'Platform untuk manajemen akademik, siswa, dan komunikasi sekolah online.',
    year: 2022,
  },
]

export default function Portfolio() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Portofolio Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Lihat project dan case study yang telah kami selesaikan untuk berbagai klien di berbagai
            industri.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-2"
              >
                <div className="w-full h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-6xl opacity-80">
                  📱
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Tahun {project.year}</span>
                    <a href="#" className="text-primary font-semibold hover:text-primary-dark">
                      Lihat Detail →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-primary mb-2">50+</div>
              <p className="text-gray-600">Project Selesai</p>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-2">30+</div>
              <p className="text-gray-600">Klien Puas</p>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-2">5+</div>
              <p className="text-gray-600">Tahun Pengalaman</p>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-2">100%</div>
              <p className="text-gray-600">Kepuasan Klien</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
