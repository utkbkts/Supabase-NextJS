import Link from 'next/link'
import React from 'react'

const Notfound = () => {
  return (
    <main className='flex items-center justify-center flex-col h-screen text-4xl text-white'>  
        <h3>I think you are lost !!</h3>
        <Link className='text-blue-400 hover:text-blue-600 duration-300 transition-all' href={"/todos"}>Click to go to the todo list</Link>
    </main>
  )
}

export default Notfound
