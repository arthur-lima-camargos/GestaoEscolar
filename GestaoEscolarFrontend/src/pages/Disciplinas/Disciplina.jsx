import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableDisciplinas from "../../components/TableDisciplinas/TableDisciplinas";

const DisciplinaPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-10 w-full">
        <h1 className='font-bold text-4xl'>Disciplinas</h1>
        <TableDisciplinas />
      </div>
    </div>
  )
}

export default DisciplinaPage