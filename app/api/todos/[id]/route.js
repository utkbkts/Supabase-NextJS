//ROUTE PARAMETRELERİ
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export async function GET(_,{params}){
//     const id = params.id;

//     const res = await fetch(`http://localhost:4000/todos/${id}`)

//     const todo = await res.json()

//     if(!res.ok){
//         return NextResponse.json({error:"Todo not found "},{
//             status:404
//         })
//     }
//     return NextResponse.json(todo,{
//         status:200
//     })
// }
// export async function DELETE(_, { params }) {
//     const id = params.id;
  
//     try {
//       const res = await fetch(`http://localhost:4000/todos/${id}`, {
//         method: "DELETE",
//       });
  
//       if (!res.ok) {
//         return NextResponse.json({ error: "Todo not found" }, { status: 404 });
//       }
  
//       return NextResponse.json({ success: "Delete successfully" }, { status: 200 });
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//       return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }
//   }

export async function DELETE(_,{params}){
  const id = params.id

  const supabase = createRouteHandlerClient({cookies})
  const {error}=await supabase.from("todos")
  .delete().eq("id",id)
  return NextResponse.json({error})
}