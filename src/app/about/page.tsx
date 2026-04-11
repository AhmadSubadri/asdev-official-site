import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang Kami - Asdev Digital Solution',
  description: 'Pelajari lebih lanjut tentang Asdev Digital Solution, visi, misi, dan tim kami.',
}

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Tentang Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Kami adalah tim profesional yang berdedikasi untuk memberikan solusi teknologi terbaik
            untuk transformasi digital bisnis Anda.
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="section py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Asdev Digital Solution</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Asdev Digital Solution adalah perusahaan yang bergerak di bidang teknologi informasi
                yang menyediakan layanan pengembangan software dan solusi digital untuk membantu
                bisnis bertransformasi secara digital.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Kami fokus pada pembuatan aplikasi berbasis web dan mobile, serta pengembangan sistem
                yang disesuaikan dengan kebutuhan klien. Dengan pengalaman lebih dari 5 tahun, kami
                telah membantu puluhan bisnis mencapai tujuan digital mereka.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-12 text-white flex items-center justify-center min-h-96">
              <div className="text-6xl">🚀</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-black text-gray-900 mb-4">Visi Kami</h3>
              <p className="text-gray-600 leading-relaxed">
                Menjadi perusahaan penyedia solusi digital terpercaya yang membantu transformasi
                bisnis melalui teknologi inovatif.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-black text-gray-900 mb-4">Misi Kami</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Memberikan solusi teknologi yang efektif dan efisien</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Mengembangkan sistem yang sesuai dengan kebutuhan klien</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Memberikan pelayanan profesional dan berkelanjutan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Mengikuti perkembangan teknologi terbaru</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-4xl font-black text-gray-900 mb-12 text-center">
            Tim Kami
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Tim profesional dan berpengalaman siap mendampingi Anda dalam perjalanan transformasi
            digital.
          </p>
        </div>
      </section>
    </div>
  )
}
