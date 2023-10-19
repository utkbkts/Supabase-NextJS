"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

const TodoList = async({todo}) => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  useEffect(() => {
    const fetchTodos = async () => {
      // await new Promise(resolve=>setTimeout(resolve,3000))
      try {
        // const response = await fetch(`http://localhost:4000/todos?_page=${currentPage}&_limit=${todosPerPage}`,{
        //   next:{
        //     revalidate:0
        //   }
        // });
        const todosData = await response.json();
        setTodos(todosData);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [currentPage]);



  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  return (
    <div className='flex items-start flex-col gap-2'>
      {todo.map((x) => (
        <div className='bg-gray-50 w-full p-2 rounded-md flex justify-between hover:shadow-2xl shadow-slate-300' key={x.id}>
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
      {todo.length === 0 && <p>No todos available.</p>}
      <div className='flex items-center justify-center w-full text-white gap-4'>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>{`Page ${currentPage}`}</span>
        <button onClick={nextPage} disabled={currentPage >= todos.length}>Next</button>
      </div>
    </div>
  );
};

export default TodoList;
