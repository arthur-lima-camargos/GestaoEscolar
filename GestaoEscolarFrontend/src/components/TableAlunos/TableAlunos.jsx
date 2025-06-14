import React from "react";
import Modal from "../Modal/Modal";
import CadastroAlunoForm from "../CadastroAlunoForm/CadastroAlunoForm";
import SearchInput from "../SearchInput/SearchInput";
import { useAlunos } from "../../hooks/useAlunos";

const TableAlunos = () => {
  const {
    alunos,
    isLoading,
    isError,
    isModalOpen,
    searchTerm,
    setModalOpen,
    setSearchTerm,
    cadastrarAluno,
  } = useAlunos();

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
          placeholder="Pesquisar por nome ou CPF..."
        />
        <button
          onClick={() => setModalOpen(true)}
          className="p-2 bg-black text-white rounded-md hover:cursor-pointer hover:bg-gray-700 transition-colors duration-200"
        >
          Cadastrar Aluno
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <CadastroAlunoForm
          onSubmit={cadastrarAluno}
          onClose={() => setModalOpen(false)}
        />
      </Modal>

      <div className="overflow-x-auto">
        <table className="w-full rounded-md overflow-hidden shadow-md table-fixed">
          <thead>
            <tr className="bg-gray-900 text-white text-left text-sm uppercase">
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
                <td className="p-2">
                  {new Date(aluno.dataNascimento).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableAlunos;
