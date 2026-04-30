import { readFileSync } from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';

export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

function getLogoDataUrl() {
  const logoPath = path.join(process.cwd(), 'public', 'brand', 'asdev-logo-dark.png');
  const logo = readFileSync(logoPath);
  return `data:image/png;base64,${logo.toString('base64')}`;
}

export default function Icon() {
  const logoDataUrl = getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          borderRadius: 120,
          padding: 64,
        }}
      >
        <img
          src={logoDataUrl}
          alt="ASDEV"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
