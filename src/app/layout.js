import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Site Diary',
  description: 'Created by Thomas Walters',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="flex justify-center p-12">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
