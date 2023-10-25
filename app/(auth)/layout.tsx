import React from 'react'

type AuthLayoutProps = {
    children: React.ReactNode
}

const AuthLayout = ({children}: AuthLayoutProps) => {
  return (
    <div className='flex justify-center items-center h-full' >
        {children}
    </div>
  )
}

export default AuthLayout