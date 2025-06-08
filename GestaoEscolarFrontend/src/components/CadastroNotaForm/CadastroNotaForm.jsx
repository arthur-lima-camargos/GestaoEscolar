import React from 'react';
import PropTypes from 'prop-types';
import { useAlunos } from '../../hooks/useAlunos';
import { useDisciplinas } from '../../hooks/useDisciplinas';

const CadastroNotaForm = ({ onSubmit, onClose }) => {
  const { alunos, isLoading: alunosLoading } = useAlunos();
  const { disciplinas, isLoading: disciplinasLoading } = useDisciplinas();

  if (alunosLoading || disciplinasLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <form onSubmit={onSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Cadastrar Nota</h2>
      
      <div className="mb-4">
        <label htmlFor="alunoId" className="block mb-2">
          Aluno
        </label>
        <select
          id="alunoId"
          name="alunoId"
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Selecione um aluno</option>
          {alunos.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.nomeCompleto}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="disciplinaId" className="block mb-2">
          Disciplina
        </label>
        <select
          id="disciplinaId"
          name="disciplinaId"
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Selecione uma disciplina</option>
          {disciplinas.map((disciplina) => (
            <option key={disciplina.id} value={disciplina.id}>
              {disciplina.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="valor" className="block mb-2">
          Nota (0-10, máximo 2 casas decimais)
        </label>
        <input
          type="number"
          id="valor"
          name="valor"
          step="0.01"
          min="0"
          max="10"
          required
          placeholder="Ex: 7.50"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="p-2 bg-black text-white rounded-md hover:cursor-pointer hover:bg-gray-600"
        >
          Voltar
        </button>
        <button
          type="submit"
          className="p-2 bg-green-800 text-white rounded-md hover:bg-green-900"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

CadastroNotaForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CadastroNotaForm;
