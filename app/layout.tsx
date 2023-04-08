import Header from '@/components/Header'
import StoreInitializer from '@/components/StoreInitializer'
import './globals.css'


export const metadata = {
  title: 'My Guitar Arrangements',
  description: 'E-commerce demo for sheetmusic',
  colorScheme: 'dark'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  
  return (
    <html lang="en">
      <body className='dark:bg-slate-500'>
        <StoreInitializer />
        {/* @ts-expect-error Server Component */}
        <Header />
        {children}
        </body>
    </html>
  )
}
