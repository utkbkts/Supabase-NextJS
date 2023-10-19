import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Deletebutton from './Deletebutton';
export const dynamicParams=true

export async function generateMetaData({params}){
  const id = params.id
  const supabase = createServerComponentClient({cookies})
  const {data:todo}= await supabase.from("todos")
  .select()
  .eq("id",params.id)
  .single()

  return {
    title:`TODOS | ${todo?.Title || "not found"}`
  }
}
async function gettodo(id){
  const supabase = createServerComponentClient({cookies})

  const {data}=await supabase.from("todos")
  .select()
  .eq("id",id)
  .single()

  if(!data){
    notFound()
  }
  return data;
}
const TodoDetails = async({ params }) => {
  const todo = await gettodo(params.id)
  const supabase = createServerComponentClient({cookies})
  const {data}=await supabase.auth.getSession();

  // const [todo, setTodo] = useState(null);

  // useEffect(() => {
  //   const fetchTodo = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:3000/todos/${params.id}`);
  //       if(!res.ok){
  //         notFound();
  //       }
  //       const data = await res.json();
  //       setTodo(data);
  //     } catch (error) {
  //       console.error('Error fetching todo:', error);
  //     }
  //   };
  //   fetchTodo();
  // }, [params.id]);
  // useEffect(() => {
  //   const dynamicParamsMeta = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:3000/todos/${params.id}`);
  //       if (!res.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await res.json();

  //        Update the document title with the dynamic data
  //       document.title = `TODOS || ${data.Title}`;
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   dynamicParamsMeta();
  // }, [params.id]);
  // useEffect(()=>{
  //   const staticparams=async()=>{
  //     const res = await fetch("http://localhost:3000/todos")
  //     const data = await res.json()

  //     return data.map(x=>({
  //       id:x.id
  //     }))
  //   }
  //   staticparams()
  // },[])
  return (
    <main>
      <nav>
        <h2 className='text-white text-3xl text-center mb-4 mt-2'>Todo Details</h2>
        <div className='text-right mb-2'>
          {data.session.user.email === todo.users_email && (
            <Deletebutton id={todo.id}/>
          )}
        </div>
      </nav>
      {todo && (
       <div className='bg-gray-50 flex w-full justify-between p-2'>
        <div className="p-2 flex flex-col gap-4" key={todo.id}>
          <h3>Title: {todo.Title}</h3>
          <span>Description: {todo.description}</span>
          <span>Created: {todo.users_email}</span>
        </div>
        <div>
          <span className={`${todo.situation === "urgent" ?"text-red-400 animate-pulse":"text-green-400"}`}>{todo.situation}</span>
        </div>
       </div>
      )}
    </main>
  );
};

export default TodoDetails;
