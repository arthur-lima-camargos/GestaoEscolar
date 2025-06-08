import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import CadastroDisciplinaForm from "../CadastroDisciplinaForm/CadastroDisciplinaForm";

const fetchDisciplinas = async () => {
  const response = await fetch("https://localhost:7013/api/Disciplinas");
  if (!response.ok) {
    throw new Error("Erro ao buscar disciplinas");
  }
  return response.json();
};

const TableDisciplinas = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: disciplinas = [], isLoading, isError } = useQuery({
    queryKey: ["disciplinas"],
    queryFn: fetchDisciplinas,
  });

  const handleSubmit = async (input) => {
    if (input.preventDefault) {
      input.preventDefault();
      const formData = new FormData(input.target);
      input = {
        codigo: formData.get("codigo"),
        nome: formData.get("nome"),
      };
    }

    try {
      const response = await fetch("https://localhost:7013/api/Disciplinas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar disciplina");
      }

      setModalOpen(false);
      queryClient.invalidateQueries(["disciplinas"]);
      alert("Disciplina cadastrada com sucesso!");
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
          Cadastrar Disciplina
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <CadastroDisciplinaForm
          onSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
        />
      </Modal>

      <table className="w-full rounded-md overflow-hidden shadow-md table-fixed">
        <thead>
          <tr className="bg-gray-900 text-white text-left text-sm uppercase">
            <th className="p-2 w-1/6">Id</th>
            <th className="p-2 w-1/3">Código</th>
            <th className="p-2 w-1/2">Nome</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((disciplina, index) => (
            <tr
              key={disciplina.id}
              className={index % 2 === 0 ? "bg-white" : "bg-[#edeeec]"}
            >
              <td className="p-2">{disciplina.id}</td>
              <td className="p-2">{disciplina.codigo}</td>
              <td className="p-2">{disciplina.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDisciplinas;
