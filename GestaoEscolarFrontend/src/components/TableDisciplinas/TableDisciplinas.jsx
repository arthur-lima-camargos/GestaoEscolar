import React from "react";
import Modal from "../Modal/Modal";
import CadastroDisciplinaForm from "../CadastroDisciplinaForm/CadastroDisciplinaForm";
import SearchInput from "../SearchInput/SearchInput";
import { useDisciplinas } from "../../hooks/useDisciplinas";

const TableDisciplinas = () => {
  const {
    disciplinas,
    isLoading,
    isError,
    isModalOpen,
    searchTerm,
    setModalOpen,
    setSearchTerm,
    cadastrarDisciplina,
  } = useDisciplinas();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os dados.</div>;
  }

  return (
    <div className="mt-10 px-4">
      <div className="flex items-center gap-4 mb-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Pesquisar por nome ou código..."
        />
        <button
          onClick={() => setModalOpen(true)}
          className="p-2 bg-black text-white rounded-md hover:cursor-pointer hover:bg-gray-700 transition-colors duration-200"
        >
          Cadastrar Disciplina
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <CadastroDisciplinaForm
          onSubmit={cadastrarDisciplina}
          onClose={() => setModalOpen(false)}
        />
      </Modal>

      <div className="overflow-x-auto">
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
    </div>
  );
};

export default TableDisciplinas;
