import { ImageResponse } from 'next/og';

export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #d62d2d 0%, #0d2a7a 100%)',
          borderRadius: 120,
          color: 'white',
          fontSize: 220,
          fontWeight: 900,
          fontFamily: 'sans-serif',
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
