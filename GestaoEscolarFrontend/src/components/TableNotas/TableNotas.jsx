import React from "react";
import Modal from "../Modal/Modal";
import CadastroNotaForm from "../CadastroNotaForm/CadastroNotaForm";
import SearchInput from "../SearchInput/SearchInput";
import { useNotas } from "../../hooks/useNotas";

const TableNotas = () => {
  const {
    notas,
    isLoading,
    isError,
    isModalOpen,
    searchTerm,
    setModalOpen,
    setSearchTerm,
    cadastrarNota,
  } = useNotas();

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
          placeholder="Pesquisar por aluno ou disciplina..."
        />
        <button
          onClick={() => setModalOpen(true)}
          className="p-2 bg-black text-white rounded-md hover:cursor-pointer hover:bg-gray-700 transition-colors duration-200"
        >
          Lançar Nota
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <CadastroNotaForm
          onSubmit={cadastrarNota}
          onClose={() => setModalOpen(false)}
        />
      </Modal>

      <div className="overflow-x-auto">
        <table className="w-full rounded-md overflow-hidden shadow-md table-fixed">
          <thead>
            <tr className="bg-gray-900 text-white text-left text-sm uppercase">
              <th className="p-2 w-1/6">Id</th>
              <th className="p-2 w-1/6">Nota</th>
              <th className="p-2 w-1/3">Aluno</th>
              <th className="p-2 w-1/3">Disciplina</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((nota, index) => (
              <tr
                key={nota.id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#edeeec]"}
              >
                <td className="p-2">{nota.id}</td>
                <td className="p-2">{nota.valor.toFixed(2)}</td>
                <td className="p-2">{nota.nomeAluno}</td>
                <td className="p-2">{nota.nomeDisciplina}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableNotas;
