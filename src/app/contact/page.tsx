'use client'

import { useState } from 'react'
import Button from '@/components/shared/Button'
import { Metadata } from 'next'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Hubungi Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Ada pertanyaan atau ingin mendiskusikan project? Hubungi kami sekarang dan kami akan
            merespons dengan cepat.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-md">
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                    Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Nama</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nama Anda"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Anda"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Nomor Telepon"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Subjek</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subjek Pesan"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Pesan</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tuliskan pesan Anda di sini..."
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10 resize-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" isLoading={loading}>
                    Kirim Pesan
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📍</span> Lokasi
                </h3>
                <p className="text-gray-600">Jakarta, Indonesia</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📧</span> Email
                </h3>
                <a href="mailto:info@asdev.id" className="text-primary hover:text-primary-dark">
                  info@asdev.id
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📱</span> WhatsApp
                </h3>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  +62 (812) 3456-7890
                </a>
              </div>

              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-white">
                <h3 className="font-bold mb-3">Jam Operasional</h3>
                <p className="text-sm opacity-90">Senin - Jumat: 09:00 - 18:00</p>
                <p className="text-sm opacity-90">Sabtu - Minggu: Tutup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="section py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-4xl font-black text-gray-900 mb-8 text-center">
            Lokasi Kami
          </h2>
          <div className="w-full h-96 bg-gray-300 rounded-xl flex items-center justify-center">
            <p className="text-gray-600">Google Maps akan ditampilkan di sini</p>
          </div>
        </div>
      </section>
    </div>
  )
}
