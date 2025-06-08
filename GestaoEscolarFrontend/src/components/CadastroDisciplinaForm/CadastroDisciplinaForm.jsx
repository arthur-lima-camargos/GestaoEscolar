import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CadastroDisciplinaForm = ({ onSubmit, onClose }) => {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [codigoError, setCodigoError] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleCodigoChange = (e) => {
    const value = e.target.value;
    setCodigo(value);
    setCodigoError("");
  };

  const handleNomeChange = (e) => {
    const value = e.target.value;
    
    if (/[^a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/.test(value)) {
      setValidationError("O nome não pode conter caracteres especiais ou números");
    } else {
      setValidationError("");
    }
    
    setNome(value);
    setNomeError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validationError) {
      const error = await onSubmit(e);
      if (error) {
        if (error.toLowerCase().includes("nome")) {
          setNomeError(error);
        } else if (error.toLowerCase().includes("código")) {
          setCodigoError(error);
        } else {
          alert(error);
        }
      }
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
          value={codigo}
          onChange={handleCodigoChange}
          required
          maxLength={10}
          className={`w-full p-2 border rounded ${codigoError ? 'border-red-500' : ''}`}
        />
        {codigoError && (
          <p className="text-red-500 text-sm mt-1">{codigoError}</p>
        )}
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
          className={`w-full p-2 border rounded ${nomeError || validationError ? 'border-red-500' : ''}`}
        />
        {validationError && (
          <p className="text-red-500 text-sm mt-1">{validationError}</p>
        )}
        {nomeError && (
          <p className="text-red-500 text-sm mt-1">{nomeError}</p>
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
          disabled={!!validationError}
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
