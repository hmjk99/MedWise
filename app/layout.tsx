import SideBar from '@/components/SideBar'
import './globals.css'
import { SessionProvider } from '@/components/SessionProvider'
import { getServerSession } from 'next-auth'

import Login from '@/components/Login'
import ClientProvider from '@/components/ClientProvider'
import { authOptions } from '@/pages/api/auth/[...nextauth]'



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ): (
          <div className='flex'>
            <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]'>
              <SideBar/>
            </div>

            <ClientProvider />

            <div className='bg-[#344139] flex-1'>
              {children}
            </div>

          </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
