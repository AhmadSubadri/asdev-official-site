import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 62px',
          background: 'linear-gradient(120deg, #0d2a7a 0%, #182a54 45%, #d62d2d 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 999,
              background: '#ffffff',
              color: '#d62d2d',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 1.6 }}>ASDEV Solution Technology</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 62, fontWeight: 900, lineHeight: 1.06 }}>Website & Solusi Digital</div>
          <div style={{ fontSize: 34, opacity: 0.95 }}>Siap Scale, Siap Tumbuh, Siap Eksekusi</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, opacity: 0.85 }}>
          <span>CV Asdev Solusi Teknologi</span>
          <span>asdev.id</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
