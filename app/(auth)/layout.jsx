import React from 'react'
import Navbar from '../components/Navbar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const Dashboard = async({children}) => {
  const supabase = createServerComponentClient({cookies})
  const {data}=await supabase.auth.getSession()

  if(data.session){
    redirect("/")
  }
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}

export default Dashboard
