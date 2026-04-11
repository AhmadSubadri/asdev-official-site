"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "Asdev Digital Solution telah berhasil mengimplementasikan sistem e-commerce kami dengan sangat profesional dan tepat waktu.",
    author: "Budi Santoso, CEO",
    company: "PT Maju Jaya Abadi",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Tim mereka sangat komunikatif dan memahami kebutuhan kami dengan baik. Website perusahaan kami sekarang terlihat sangat profesional.",
    author: "Sari Wijaya, Marketing Manager",
    company: "CV Berkah Sejahtera",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Layanan maintenance mereka sangat responsif. Sistem selalu stabil dan performa optimal.",
    author: "Ahmad Setiawan, IT Director",
    company: "PT Teknologi Masa Depan",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 text-center"
        >
          Apa Kata Klien Kami
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-neutral-600 mb-16 text-center max-w-2xl mx-auto"
        >
          Lebih dari 50 project berhasil dan 100% kepuasan klien
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-neutral-200 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-neutral-700 font-medium italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
