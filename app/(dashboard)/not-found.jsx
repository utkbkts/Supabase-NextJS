import Link from 'next/link'
import React from 'react'

const Notfound = () => {
  return (
    <main className='flex items-center justify-center flex-col h-screen text-4xl text-white'>  
        <h3>Sorry !! Something went wrong </h3>
        <Link className='text-blue-400 hover:text-blue-600 duration-300 transition-all' href={"/"}>Click to go to the home page</Link>
    </main>
  )
}

export default Notfound
