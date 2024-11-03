import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React from 'react'
import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'
import type { Metadata } from 'next'
import {ThemeProvider} from '@/context/ThemeProvider';

export const metadata = {
  title: 'DevFlow',
  description: 'DevFlow is a platform for developers to ask programming related questions and get answers from other developers. get help, share knowledge and collaborate with developers around the world',
  icons: {
    icon: '/assets/images/site-logo.svg'
  }
}

const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  subsets: ['latin'],
})
const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesl',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
  
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <ClerkProvider
    publishableKey={process.env.CLERK_PUBLISHABLE_KEY}
      appearance={{
        elements: {
          formButtonPrimary : 'primary-gradient',
          footerActionLink: 'primary-text-gradient hover:text-primary-500',
        },
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
    <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <ThemeProvider>
      {children}
      </ThemeProvider>
    </body>
    </ClerkProvider >
  </html>
  )
}