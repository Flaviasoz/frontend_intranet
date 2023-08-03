import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactQueryProvider } from './ReactQueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Intranet Grazziotin',
  description: 'Nova intranet da Grazziotin para lojas e ADM',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  )
}
