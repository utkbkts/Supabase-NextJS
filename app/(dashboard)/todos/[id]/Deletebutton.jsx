"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
const Deletebutton = ({id}) => {
    const [loading,setloading]=useState(false)
  const router = useRouter()
    const handleclick=async()=>{
        setloading(true)

        const res = await fetch(`http://localhost:3000/api/todos/${id}`,{
          method:"DELETE"
        })
        const json = res.json()
        if(json.error){
          console.log(error);
          setloading(false)
        }
        if(!json.error){
          router.refresh()
          router.push("/todos")
        }
    }
  return (
    <button className='bg-blue-500 py-1 px-5 text-white text-xl' onClick={handleclick}
    disabled={loading}
    >
    {loading ? "is being deleted":"DELETE"}
    </button>
  )
}

export default Deletebutton
