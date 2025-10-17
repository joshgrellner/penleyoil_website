import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { SITE_CONFIG } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Fuel, DEF & Lubricants Delivery Oklahoma`,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description: SITE_CONFIG.description,
  keywords: ['fuel delivery Oklahoma', 'DEF supplier', 'diesel delivery', 'lubricants Oklahoma City'],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Replace with actual code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
  const GTM = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <head>
        {/* Google Search Console verification meta tags */}
        {/* <meta name="google-site-verification" content="<TOKEN-for-https://penleyoil.com>" /> */}
        {/* <meta name="google-site-verification" content="<TOKEN-for-https://www.penleyoil.com>" /> */}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Google Tag Manager (noscript) */}
        {GTM && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <Header />
        <main>{children}</main>
        <Footer />

        {/* AI Chatbot - Configure in .env.local */}
        {process.env.NEXT_PUBLIC_CHATBOT_PROVIDER && process.env.NEXT_PUBLIC_CHATBOT_KEY && (
          <Chatbot
            provider={process.env.NEXT_PUBLIC_CHATBOT_PROVIDER as any}
            apiKey={process.env.NEXT_PUBLIC_CHATBOT_KEY}
          />
        )}

        {/* GA4 */}
        {GA4 && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4}', { send_page_view: true });
                window.gaEvent = (name, params={}) => gtag('event', name, params);
              `}
            </Script>
          </>
        )}

        {/* GTM */}
        {GTM && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM}');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
