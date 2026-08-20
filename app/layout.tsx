import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#050714',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Google AI Pro 18-Month Activation | Official Google One Plan Special Offer',
  description: 'Get 18 Months of Google AI Pro (Gemini Advanced with 4x higher limits, Deep Research, 5TB Google One Cloud Storage, Google Vids, 1000 Flow credits) activated directly on your personal account.',
  keywords: 'Google AI Pro, Google One AI Premium, Gemini Advanced, Google Gemini 18 Months, Gemini Activation Link, AI Subscription Tunisia, Google One 5TB, Deep Research, Google Vids',
  openGraph: {
    title: 'Google AI Pro 18-Month Activation | Official Google One Plan',
    description: 'Exclusive 18-Month Activation Link for Google AI Pro. 4x Limits, Deep Research, 5TB Storage, Google Vids & Flow Credits.',
    images: [{ url: '/gemini-preview.gif' }],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth w-full overflow-x-hidden">
      <body className="bg-[#050714] text-slate-100 antialiased min-h-screen flex flex-col relative selection:bg-purple-600 selection:text-white pb-20 md:pb-0 w-full overflow-x-hidden">
        {/* Background ambient glowing orbs contained strictly within viewport */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 max-w-full">
          <div className="cosmic-orb-1"></div>
          <div className="cosmic-orb-2"></div>
          <div className="cosmic-orb-3"></div>
        </div>
        <main className="flex-grow relative z-10 w-full overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
