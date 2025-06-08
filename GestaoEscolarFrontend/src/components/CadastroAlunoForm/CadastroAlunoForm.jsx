import React, { useState } from "react";
import PropTypes from "prop-types";

const CadastroAlunoForm = ({ onSubmit, onClose }) => {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [cpfError, setCpfError] = useState("");

  const handleCpfChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      const formattedCpf = value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
      setCpf(formattedCpf);
      setCpfError("");
    }
  };

  const handleNomeChange = (e) => {
    const value = e.target.value;

    if (/[^a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/.test(value)) {
      setNomeError("O nome não pode conter caracteres especiais ou números");
    } else {
      setNomeError("");
    }

    setNome(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nomeError) {
      const error = await onSubmit(e);
      if (error) {
        if (error.toLowerCase().includes("cpf")) {
          setCpfError(error);
        } else {
          alert(error);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Cadastrar Aluno</h2>
      <div className="mb-4">
        <label htmlFor="cpf" className="block mb-2">
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={cpf}
          onChange={handleCpfChange}
          placeholder="000.000.000-00"
          required
          maxLength={14}
          className={`w-full p-2 border rounded ${
            cpfError ? "border-red-500" : ""
          }`}
        />
        {cpfError && <p className="text-red-500 text-sm mt-1">{cpfError}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="nomeCompleto" className="block mb-2">
          Nome Completo
        </label>
        <input
          type="text"
          id="nomeCompleto"
          name="nomeCompleto"
          value={nome}
          onChange={handleNomeChange}
          required
          maxLength={100}
          className={`w-full p-2 border rounded ${
            nomeError ? "border-red-500" : ""
          }`}
        />
        {nomeError && (
          <p className="text-red-500 text-sm mt-1">{nomeError}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="dataNascimento" className="block mb-2">
          Data de Nascimento
        </label>
        <input
          type="date"
          id="dataNascimento"
          name="dataNascimento"
          required
          max={new Date().toISOString().split("T")[0]}
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
          disabled={!!nomeError}
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

CadastroAlunoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CadastroAlunoForm;
