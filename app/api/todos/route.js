import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

// export async function GET() {
//   try {
//     const res = await fetch("http://localhost:4000/todos");
//     const todos = await res.json();

//     return NextResponse.json(todos, {
//       status: 200
//     });
//   } catch (error) {
//     console.error("Error fetching todos:", error);
//     return NextResponse.error("Error fetching todos", { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     const todo = await request.json();
//     const res = await fetch("http://localhost:4000/todos", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(todo)
//     });

//     const newtodo = await res.json();
//     return NextResponse.json(newtodo, {
//       status: 201
//     });
//   } catch (error) {
//     console.error("Error creating todo:", error);
//     return NextResponse.error("Error creating todo", { status: 500 });
//   }
// }

export async function POST(request) {
  const todos = await request.json();

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data, error } = await supabase
    .from("todos")
    .insert({ ...todos, users_email: session.user.email })
    .select()
    .single()
    
    return NextResponse.json({data,error})
}
