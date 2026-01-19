import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <div
          style={{
            color: '#d4a373',
            fontSize: 22,
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
