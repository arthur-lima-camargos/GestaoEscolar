import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CadastroDisciplinaForm = ({ onSubmit, onClose }) => {
  const [nome, setNome] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNomeChange = (e) => {
    const value = e.target.value;
    
    if (/[^a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/.test(value)) {
      setErrorMessage("O nome não pode conter caracteres especiais ou números");
    } else {
      setErrorMessage("");
    }
    
    setNome(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMessage) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Cadastrar Disciplina</h2>
      <div className="mb-4">
        <label htmlFor="codigo" className="block mb-2">
          Código
        </label>
        <input
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
          value={nome}
          onChange={handleNomeChange}
          required
          maxLength={100}
          className={`w-full p-2 border rounded ${errorMessage ? 'border-red-500' : ''}`}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
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
          disabled={!!errorMessage}
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
