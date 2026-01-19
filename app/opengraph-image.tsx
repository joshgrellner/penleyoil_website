import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Penley Oil Company - Oklahoma Fuel, DEF & Lubricants';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a5632 0%, #0d2b19 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: '#d4a373',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
              fontSize: 40,
            }}
          >
            ⛽
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-2px',
            }}
          >
            Penley Oil
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#d4a373',
            fontWeight: 600,
            marginBottom: 30,
          }}
        >
          Oklahoma&apos;s Fuel & DEF Experts Since 1958
        </div>

        {/* Services */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 20,
          }}
        >
          {['Fuel Delivery', 'DEF Supply', 'Lubricants', 'Tank Solutions'].map(
            (service) => (
              <div
                key={service}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '12px 24px',
                  borderRadius: 8,
                  color: 'white',
                  fontSize: 20,
                }}
              >
                {service}
              </div>
            )
          )}
        </div>

        {/* Phone */}
        <div
          style={{
            marginTop: 50,
            fontSize: 28,
            color: 'white',
            opacity: 0.9,
          }}
        >
          (405) 235-7553 | penleyoil.com
        </div>
      </div>
    ),
    { ...size }
  );
}
