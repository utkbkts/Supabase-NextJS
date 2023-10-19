"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
const Login = () => {
  const [name,setname]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [error,seterror]=useState("")
  const router = useRouter()
  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror("")
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if(error){
      seterror(error.message)
    }
    if(!error){
      router.push("/")
    }
  };
  return (
    <div className="h-[80vh] flex items-center justify-center flex-col">
       {error && (
       <p className='border border-red-700 text-white w-[300px] h-10 rounded-md p-2 bg-red-400 '>{error}</p>
     )}
      <h1 className="text-white text-3xl border-b-2 p-1">Sign In</h1>
      <form onSubmit={handlesubmit} className="shadow-lg p-4 w-[400px]">
        <div className="flex flex-col gap-1">
          <label className="text-white" htmlFor="name">
            Name
          </label>
          <input
          value={name}
          onChange={(e)=>setname(e.target.value)}
            type="text"
            name=""
            className="outline-none placeholder:text-gray-500 font-bold p-2 text-[12px] rounded-sm focus:border border-blue-400"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white" htmlFor="Email">
            Email
          </label>
          <input
           value={email}
           onChange={(e)=>setemail(e.target.value)}
            type="email"
            name="Email"
            className="outline-none placeholder:text-gray-500 font-bold p-2 text-[12px] rounded-sm focus:border border-blue-400"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white" htmlFor="password">
            password
          </label>
          <input
           value={password}
           onChange={(e)=>setpassword(e.target.value)}
            type="password"
            name="password"
            className="outline-none placeholder:text-gray-500 font-bold p-2 text-[12px] rounded-sm focus:border border-blue-400"
          />
        </div>
        <div className="flex items-center">
          <button className="bg-blue-500 py-1 px-4  text-white rounded-sm cursor-pointer mt-4">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
