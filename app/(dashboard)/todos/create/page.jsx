import React from "react";
import CreateForm from "./CreateForm";

const page = () => {
  return (
    <main>
      <h3 className="text-center mb-4 text-4xl text-white mt-4">Add New Todo</h3>
      <CreateForm/>
    </main>
  );
};

export default page;
