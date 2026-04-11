import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AD</span>
              </div>
              <div>
                <p className="font-bold">Asdev</p>
                <p className="text-xs text-gray-400">Digital Solution</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Solusi teknologi terpercaya untuk transformasi digital bisnis Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Layanan
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Portofolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Website Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Mobile App
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Sistem Informasi
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary-500 transition-colors">
                  UI/UX Design
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:info@asdev.id" className="hover:text-primary-500 transition-colors">
                  info@asdev.id
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-500 transition-colors"
                >
                  +62 (812) 3456-7890
                </a>
              </li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Asdev Digital Solution. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-500 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
