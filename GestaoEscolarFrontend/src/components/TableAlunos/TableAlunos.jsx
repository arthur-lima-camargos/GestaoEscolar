import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

/**
 * @typedef {Object} Aluno
 * @property {number} id
 * @property {string} nomeCompleto
 * @property {string} dataNascimento
 * @property {string} cpf
 */

const fetchAlunos = async () => {
  const response = await fetch("https://localhost:7013/api/Alunos");
  if (!response.ok) {
    throw new Error("Erro ao buscar alunos");
  }
  return response.json();
};

const TableAlunos = () => {
  const { data: alunos = [], isLoading, isError } = useQuery({
    queryKey: ["alunos"],
    queryFn: fetchAlunos,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os dados.</div>;
  }

  return (
    <div className="mt-20 overflow-x-auto rounded-md px-4">
      <div className="flex justify-between items-center mb-4">
        <Link to={"/cadastro-aluno"}>
          <button className="p-2 bg-black text-white rounded-md hover:cursor-pointer">
            Cadastrar Aluno
          </button>
        </Link>
      </div>

      <table className="w-full rounded-md overflow-hidden shadow-md table-fixed">
        <thead>
          <tr className="bg-gray-900 text-white text-left text-sm uppercase ">
            <th className="p-4 w-1/6">Id</th>
            <th className="p-4 w-1/3">CPF</th>
            <th className="p-4 w-1/2">Nome</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno, index) => (
            <tr
              key={aluno.id}
              className={index % 2 === 0 ? "bg-white" : "bg-[#edeeec]"}
            >
              <td className="p-4">{aluno.id}</td>
              <td className="p-4">{aluno.cpf}</td>
              <td className="p-4">{aluno.nomeCompleto}</td>
              <td className="p-4">
                <div className="flex gap-3 text-xl text-gray-600">
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAlunos;
