"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const CreateForm = () => {
  const router = useRouter();
  const [Title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [situation, setsituation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newtodo = {
      Title,
      description,
      situation,
    };
    //kendi oluşturduğumuz api
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newtodo),
    });
    if (res.status === 201) {
      toast.success("New todo successfully created")
      router.push("/todos");
    }else{
      toast.error("new todo could not be created")
      console.log("error");
    }
   const json = await res.json()

   if(json.data){
    router.refresh()
    router.push("/todos")
   }
  };
  return (
    <div className="h-[60vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-[400px] flex flex-col items-center gap-4 shadow-lg p-2">
        <div className="w-full">
          <input value={Title} onChange={(e)=>setTitle(e.target.value)} className="w-full outline-none py-2 px-5 border focus:border-blue-500" type="text" name="" id="" placeholder="Title..." />
        </div>
        <div className="w-full">
          <input value={description} onChange={(e)=>setdescription(e.target.value)} className="w-full outline-none py-2 px-5 border focus:border-blue-500" type="text" name="" id="" placeholder="Description..." />
        </div>
        <div className="w-full">
          <input value={situation} onChange={(e)=>setsituation(e.target.value)} className="w-full outline-none py-2 px-5 border focus:border-blue-500" type="text" name="" id="" placeholder="Situation..." />
        </div>
        <div className='flex items-center'>
          <button type="submit" className='bg-blue-500 py-1 px-4  text-white rounded-sm cursor-pointer mt-4'>Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
