import './globals.css'
import 'material-icons/iconfont/material-icons.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ReactQueryProvider } from './ReactQueryProvider'

const montserrat = Montserrat({ subsets: ['latin'] })

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
        <body className={montserrat.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  )
}
