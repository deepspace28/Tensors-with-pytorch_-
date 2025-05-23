import type React from "react"
import "@/app/globals.css"
import type { Metadata, Viewport } from "next"
import { Inter, IBM_Plex_Sans } from "next/font/google"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })
const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Scientific AI",
    "Quantum Simulations",
    "Research AI",
    "Scientific Validation",
    "Mathematical Models",
    "Physics AI",
    "Research Tools",
  ],
  authors: [
    {
      name: "Synaptiq",
      url: "https://synaptiq.contact",
    },
  ],
  creator: "Synaptiq",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/apple-touch-icon.png`,
        width: 180,
        height: 180,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@synaptiq",
    images: [`${siteConfig.url}/apple-touch-icon.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  generator: "Synaptiq",
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add KaTeX CSS for proper math rendering */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
          crossOrigin="anonymous"
        />
        {/* Preload KaTeX fonts for better performance */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/fonts/KaTeX_Main-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Additional favicon links for better browser support */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, ibmPlexSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          {/* We'll add analytics in a separate script tag */}
        </ThemeProvider>

        {/* Add a script to load analytics after the page loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Check if the analytics packages are available
              try {
                // Add analytics after a short delay to ensure the page is loaded
                setTimeout(() => {
                  const analyticsScript = document.createElement('script');
                  analyticsScript.type = 'module';
                  analyticsScript.innerHTML = \`
                    import { Analytics } from "https://esm.sh/@vercel/analytics/react";
                    import { SpeedInsights } from "https://esm.sh/@vercel/speed-insights/react";
                    import { createRoot } from "https://esm.sh/react-dom/client";
                    import React from "https://esm.sh/react";
                    
                    // Create a container for analytics
                    const container = document.createElement('div');
                    container.id = 'analytics-container';
                    document.body.appendChild(container);
                    
                    // Render analytics components
                    try {
                      const root = createRoot(container);
                      root.render(
                        React.createElement(React.Fragment, null,
                          React.createElement(Analytics),
                          React.createElement(SpeedInsights)
                        )
                      );
                      console.log('Analytics loaded successfully');
                    } catch (err) {
                      console.log('Failed to render analytics:', err);
                    }
                  \`;
                  document.head.appendChild(analyticsScript);
                }, 1000);
              } catch (err) {
                console.log('Analytics initialization error:', err);
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
