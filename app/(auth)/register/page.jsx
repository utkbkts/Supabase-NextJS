"use client"
import React, { useState } from 'react'
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import { useRouter } from 'next/navigation'
const Register = () => {
  const [name,setname]=useState("")
  const [lastname,setlastname]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [error,seterror]=useState("")
  const router = useRouter()
  const handlesubmit=async(e)=>{
    e.preventDefault()
    seterror("")
    const supabase = createClientComponentClient();
   const {error}= await supabase.auth.signUp({
      email,
      password,
      options:{
        emailRedirectTo:`${location.origin}/api/auth/callback`,
        data:{
          name:name,
          lastname:lastname
        }
      }
    })
    if(error){
      seterror(error.message)
    }
    if(!error){
      router.push("/verify")
    }
  }
  return (
    <div className='h-[80vh] flex items-center justify-center flex-col'>
      <div className='error '>
     {error && (
       <p className='flex items-center justify-center text-center border border-red-700 text-white w-[300px] h-10 rounded-md p-2 bg-red-400 '>{error}</p>
     )}
      </div>
      <h1 className='text-white text-3xl border-b-2 p-1'>Sign Up</h1>
      <form onSubmit={handlesubmit} className='shadow-lg p-4'>
        <div className='flex items-center justify-center gap-4'>
        <div className='flex flex-col gap-1'>
          <label className='text-white' htmlFor="name">Name</label>
          <input value={name} onChange={(e)=>setname(e.target.value)} type="text" name="" className='outline-none placeholder:text-gray-500 font-bold p-2 text-[12px] rounded-sm focus:border border-blue-400' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-white' htmlFor="lastname">LastName</label>
          <input value={lastname} onChange={(e)=>setlastname(e.target.value)}  type="text" name="lastname"  className='outline-none placeholder:text-gray-500 font-bold p-2 text-[12px] rounded-sm focus:border border-blue-400'/>
        </div>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-white' htmlFor="Email">Email</label>
          <input value={email} onChange={(e)=>setemail(e.target.value)}  type="email" name="Email" className='outline-none placeholder:text-gray-500 font-bold p-2 text-[12px] rounded-sm focus:border border-blue-400' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-white' htmlFor="password">password</label>
          <input value={password} onChange={(e)=>setpassword(e.target.value)}  type="password" name="password"  className='outline-none placeholder:text-gray-500 font-bold p-2 text-[12px] rounded-sm focus:border border-blue-400'/>
        </div>
        <div className='flex items-center'>
          <button className='bg-blue-500 py-1 px-4  text-white rounded-sm cursor-pointer mt-4'>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default Register
