import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a5632 0%, #0d2b19 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 32,
        }}
      >
        <div
          style={{
            color: '#d4a373',
            fontSize: 120,
            fontWeight: 900,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          P
        </div>
      </div>
    ),
    { ...size }
  );
}
