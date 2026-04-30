import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 56px',
          background: 'linear-gradient(135deg, #d62d2d 0%, #1f2f62 55%, #0d2a7a 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 1.4 }}>ASDEV Solution Technology</div>
        <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.1 }}>Digital Product Delivery Partner</div>
        <div style={{ fontSize: 24, opacity: 0.85 }}>Website • Web App • Integrasi API • UI/UX</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
