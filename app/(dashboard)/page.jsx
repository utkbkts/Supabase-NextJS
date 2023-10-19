import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

async function gettodos(){
  const supabase = createServerComponentClient({cookies})
  const {data:{session}} = await supabase.auth.getSession()

  const {data,error}=await supabase.from("todos")
  .select()
  .eq("users_email",session.user.email)
  .order("created_at",{ascending:false})
//kendi yapılacaklarımız
  if(error){
    console.log(error);
  }
  return data
}

const Home = async() => {
  const todos = await gettodos();
  return (
    <main className='flex items-center flex-col'>
      <h3 className='text-4xl text-white'>Dashboard</h3>
      <span className='text-white text-2xl'>Go to create form <Link className='text-blue-500 underline' href={"/todos/create"}>Create Todo</Link></span>
      <div className='flex justify-center my-8'>
        <Link href={"/todos"}>
          <button className='bg-blue-500 py-1 px-5 text-white rounded-md'>show todos</button>
        </Link>
      </div>
      <div className='w-full flex items-start flex-col gap-2'>
      {todos.map((x) => (
        <div className='bg-gray-50 w-full p-2 rounded-md flex justify-between hover:shadow-2xl shadow-slate-300 ' key={x.id}>
         <Link href={`/todos/${x.id}`} className='flex justify-between w-full'>
         <div className={` ${x.situation}`}>
            <h3>{x.Title}</h3>
            <span>{x.description ? x.description.slice(0, 100) + '...' : ''}</span>
          </div>
          <div className={`pill ${x.situation === "urgent" ? "text-red-400 animate-bounce" : "text-green-400"}`}>
            {x.situation}
          </div>
         </Link>
        </div>
      ))}
      {todos.length === 0 && <p>No todos available.</p>}
      <div className='flex items-center justify-center w-full text-white gap-4'>
      </div>
    </div>
    </main>
  )
}

export default Home
