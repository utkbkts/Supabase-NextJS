import { Suspense } from "react";
import TodoList from "./TodoList";
import Loading from "../loading";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
async function gettodos(){
  const supabase = createServerComponentClient({cookies})
  const {data,error}=await supabase.from("todos")
  .select()
  .order("created_at",{ascending:false})
  if(error){
    console.log(error.message);
  }
  return data
}
const Todos = async() => {
    const todo = await gettodos()
  return (
    <main>
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-white text-4xl ">TODOS</h2>
        <p className="text-white text-4xl ">Active todos</p>
      </div>
     <Suspense fallback={<Loading/>}>
     <TodoList  todo={todo}/>
     </Suspense>
    </main>
  );
};

export default Todos;
