import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Asdev Digital Solution',
  description: 'Artikel dan tips tentang pengembangan website, mobile app, dan transformasi digital.',
}

const blogPosts = [
  {
    id: 1,
    title: '10 Tips Membuat Website yang SEO-Friendly',
    slug: 'tips-website-seo',
    excerpt: 'Pelajari teknik-teknik penting untuk membuat website Anda mudah ditemukan di search engine.',
    date: '2024-04-01',
    category: 'SEO',
  },
  {
    id: 2,
    title: 'Tren Teknologi 2024 untuk Digital Business',
    slug: 'tren-teknologi-2024',
    excerpt: 'Eksplorasi tren teknologi terbaru yang akan mengubah cara berbisnis di tahun 2024.',
    date: '2024-03-28',
    category: 'Teknologi',
  },
  {
    id: 3,
    title: 'Panduan Memilih Platform E-Commerce Terbaik',
    slug: 'panduan-ecommerce',
    excerpt:
      'Ketahui kriteria dan tips memilih platform e-commerce yang tepat untuk bisnis online Anda.',
    date: '2024-03-25',
    category: 'E-Commerce',
  },
  {
    id: 4,
    title: 'Mengapa User Experience Penting untuk Aplikasi Mobile',
    slug: 'ux-mobile-app',
    excerpt:
      'Pahami pentingnya desain UX yang baik dalam meningkatkan kepuasan pengguna aplikasi mobile.',
    date: '2024-03-20',
    category: 'UX Design',
  },
  {
    id: 5,
    title: 'Keamanan Data: Best Practices untuk Website Anda',
    slug: 'keamanan-data-website',
    excerpt:
      'Tips dan best practices untuk menjaga keamanan data website dan informasi pelanggan Anda.',
    date: '2024-03-15',
    category: 'Keamanan',
  },
  {
    id: 6,
    title: 'Optimasi Performance: Membuat Website Lebih Cepat',
    slug: 'optimasi-performance',
    excerpt:
      'Teknik-teknik untuk mengoptimasi kecepatan loading website dan meningkatkan user experience.',
    date: '2024-03-10',
    category: 'Performance',
  },
]

export default function Blog() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Artikel, tips, dan insights tentang pengembangan website, mobile app, dan transformasi
            digital bisnis.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-2 group"
              >
                <div className="w-full h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-6xl">
                  📝
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block text-xs font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
                  <a href="#" className="text-primary font-semibold text-sm hover:text-primary-dark">
                    Baca Selengkapnya →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Subscribe Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Dapatkan update artikel dan tips terbaru langsung di email Anda.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
