import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import CadastroAlunoForm from "../CadastroAlunoForm/CadastroAlunoForm";

const fetchAlunos = async () => {
  const response = await fetch("https://localhost:7013/api/Alunos");
  if (!response.ok) {
    throw new Error("Erro ao buscar alunos");
  }
  return response.json();
};

const TableAlunos = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: alunos = [], isLoading, isError } = useQuery({
    queryKey: ["alunos"],
    queryFn: fetchAlunos,
  });
  console.log(alunos);
  const handleSubmit = async (input) => {
    if (input.preventDefault) {
      input.preventDefault();
      const formData = new FormData(input.target);
      input = {
        cpf: formData.get("cpf"),
        nomeCompleto: formData.get("nomeCompleto"),
        dataNascimento: formData.get("dataNascimento"),
      };
    }

    try {
      const response = await fetch("https://localhost:7013/api/Alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar aluno");
      }

      setModalOpen(false);
      queryClient.invalidateQueries(["alunos"]); 
      alert("Aluno cadastrado com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os dados.</div>;
  }

  return (
    <div className="mt-20 overflow-x-auto rounded-md px-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setModalOpen(true)}
          className="p-2 bg-black text-white rounded-md hover:cursor-pointer"
        >
          Cadastrar Aluno
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <CadastroAlunoForm
          onSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
        />
      </Modal>

      <table className="w-full rounded-md overflow-hidden shadow-md table-fixed">
        <thead>
          <tr className="bg-gray-900 text-white text-left text-sm uppercase ">
            <th className="p-2 w-1/6">Id</th>
            <th className="p-2 w-1/3">CPF</th>
            <th className="p-2 w-1/2">Nome</th>
            <th className="p-2 w-1/3">Data de Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno, index) => (
            <tr
              key={aluno.id}
              className={index % 2 === 0 ? "bg-white" : "bg-[#edeeec]"}
            >
              <td className="p-2">{aluno.id}</td>
              <td className="p-2">{aluno.cpf}</td>
              <td className="p-2">{aluno.nomeCompleto}</td>
              <td className="p-2">{new Date(aluno.dataNascimento).toLocaleDateString("pt-BR")}</td>
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
