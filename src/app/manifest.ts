import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ASDEV Solution Technology',
    short_name: 'ASDEV',
    description: 'Solusi digital profesional untuk website, web app, dan transformasi bisnis.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1326',
    theme_color: '#d62d2d',
    lang: 'id',
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
