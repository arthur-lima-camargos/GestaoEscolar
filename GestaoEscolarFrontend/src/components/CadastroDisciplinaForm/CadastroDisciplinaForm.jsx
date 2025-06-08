import React from 'react';
import PropTypes from 'prop-types';

const CadastroDisciplinaForm = ({ onSubmit, onClose }) => {
  return (
    <form onSubmit={onSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Cadastrar Disciplina</h2>
      <div className="mb-4">
        <label htmlFor="codigo" className="block mb-2">
          Código
        </label>        <input
          type="text"
          id="codigo"
          name="codigo"
          required
          maxLength={10}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="nome" className="block mb-2">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          maxLength={100}
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
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Salvar
        </button>
      </div>
    </form>
  );
};

CadastroDisciplinaForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CadastroDisciplinaForm;
