import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableNotas from "../../components/TableNotas/TableNotas";

const NotasPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-10 w-full">
        <h1 className='font-bold text-4xl'>Notas</h1>
        <TableNotas />
      </div>
    </div>
  )
}

export default NotasPage
