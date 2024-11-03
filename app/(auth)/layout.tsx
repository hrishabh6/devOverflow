import React from 'react'

const Layout = ({children}: {children : React.ReactNode}) => {
  return (
    <main className='flex min-h-screen justify-center items-center w-full'>
      {children}
    </main>
  )
}

export default Layout
