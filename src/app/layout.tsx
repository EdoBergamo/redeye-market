import { Inter } from 'next/font/google'
import { constructMetadata } from '@/lib/utils'

import './globals.css'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/Navbar'
import Providers from '@/components/providers'
import { Toaster } from 'sonner'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full'>
      <body className={cn('relative h-full font-sans antialiased', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative flex flex-col min-h-screen">
            <Providers>
              <Navbar />
              <div className='flex-grow flex-1'>
                {children}
              </div>
              <Footer />
            </Providers>
          </main>

          <Toaster position='top-center' richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
