import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableAlunos from "../../components/TableAlunos/TableAlunos";

const Clientes = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-10 w-full ">
        <h1 className='font-bold text-4xl'>Alunos</h1>
        <TableAlunos />
      </div>
    </div>
  )
}

export default Clientes
