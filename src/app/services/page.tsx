import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Layanan Kami - Asdev Digital Solution',
  description: 'Lihat daftar lengkap layanan website development, mobile app, sistem informasi, dan UI/UX design kami.',
}

const servicesList = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Buat website profesional yang modern, responsif, dan SEO-friendly untuk bisnis Anda.',
    features: [
      'Website Perusahaan (Company Profile)',
      'Website E-Commerce',
      'Website Edukatif',
      'Website Community',
      'Landing Page',
    ],
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Aplikasi mobile native atau cross-platform untuk Android dan iOS dengan performa optimal.',
    features: [
      'Aplikasi Native (iOS/Android)',
      'Cross-Platform Development',
      'Progressive Web App (PWA)',
      'Hybrid App',
    ],
  },
  {
    id: 3,
    title: 'Sistem Informasi Custom',
    description:
      'Sistem informasi yang disesuaikan dengan kebutuhan bisnis Anda untuk meningkatkan efisiensi.',
    features: ['ERP System', 'POS System', 'CRM System', 'HRM System'],
  },
  {
    id: 4,
    title: 'E-Commerce Solution',
    description: 'Platform e-commerce lengkap dengan payment gateway dan inventory management.',
    features: [
      'Toko Online Lengkap',
      'Payment Gateway Integration',
      'Inventory Management',
      'Analytics & Reporting',
    ],
  },
  {
    id: 5,
    title: 'UI/UX Design',
    description: 'Desain interface yang menarik dan user experience yang intuitif untuk aplikasi Anda.',
    features: [
      'UI Design',
      'UX Research',
      'Wireframing',
      'Prototyping',
      'User Testing',
    ],
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    description: 'Dukungan teknis berkelanjutan dan pemeliharaan sistem untuk performa optimal.',
    features: [
      'Technical Support 24/7',
      'System Maintenance',
      'Bug Fixing',
      'Performance Optimization',
    ],
  },
]

export default function Services() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Layanan Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Kami menawarkan berbagai solusi teknologi yang dirancang untuk membantu bisnis Anda
            berkembang dan bersaing di era digital.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesList.map((service) => (
              <div key={service.id} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all">
                <h3 className="text-2xl font-black text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Fitur & Benefit:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-4xl font-black text-gray-900 mb-12 text-center">
            Proses Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: 1, title: 'Konsultasi', desc: 'Diskusi kebutuhan dan tujuan Anda' },
              { num: 2, title: 'Proposal', desc: 'Dokumen rancangan solusi dan timeline' },
              { num: 3, title: 'Development', desc: 'Pengembangan solusi sesuai requirement' },
              { num: 4, title: 'Delivery', desc: 'Testing, deployment, dan support' },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="bg-white rounded-lg p-6 shadow-md text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
                {step.num < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
