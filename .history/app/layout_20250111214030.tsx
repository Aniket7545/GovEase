import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/component/theme-provider'
import Header from '@/component/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GovEase - Your Gateway to Government Schemes',
  description: 'Discover and apply for government schemes with AI-powered assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

