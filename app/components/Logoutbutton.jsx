"use client"
import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
const Logoutbutton = () => {
    const router = useRouter()
   
    const handleclick=async()=>{
        const supabase = createClientComponentClient()
        const {error}=await supabase.auth.signOut();
    
        if(!error){
            router.push("/")
        }
    }
  return (
   <button onClick={handleclick} className='bg-red-400 text-white py-1 px-2 rounded-md cursor-pointer hover:bg-red-600 duration-300 transition-all'>Logout</button>
  )
}

export default Logoutbutton
