import React, { useState } from "react";
import PropTypes from "prop-types";

const CadastroAlunoForm = ({ onSubmit, onClose }) => {
  const [cpf, setCpf] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [errors, setErrors] = useState({});

  const handleCpfChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11); 
    setCpf(
      value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    );
  };

  const handleNomeChange = (e) => {
    const value = e.target.value.slice(0, 100); 
    setNomeCompleto(value);
    if (/[^a-zA-ZçÇ\s]/.test(value)) { 
      setErrors((prev) => ({ ...prev, nomeCompleto: "O nome não pode conter caracteres especiais." }));
    } else {
      setErrors((prev) => ({ ...prev, nomeCompleto: null }));
    }
  };

  const handleDataNascimentoChange = (e) => {
    const value = e.target.value;
    setDataNascimento(value);
    if (new Date(value) > new Date()) {
      setErrors((prev) => ({ ...prev, dataNascimento: "A data de nascimento não pode ser maior que hoje." }));
    } else {
      setErrors((prev) => ({ ...prev, dataNascimento: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.nomeCompleto && !errors.dataNascimento) {
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData);

      onSubmit(formObject); 
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Cadastrar Aluno</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">CPF</label>
          <input
            type="text"
            name="cpf"
            value={cpf}
            onChange={handleCpfChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nome Completo</label>
          <input
            type="text"
            name="nomeCompleto"
            value={nomeCompleto}
            onChange={handleNomeChange}
            className="w-full border rounded-md p-2"
            required
          />
          {errors.nomeCompleto && <p className="text-red-500 text-sm">{errors.nomeCompleto}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={dataNascimento}
            onChange={handleDataNascimentoChange}
            className="w-full border rounded-md p-2"
            max={new Date().toISOString().split("T")[0]} 
            required
          />
          {errors.dataNascimento && <p className="text-red-500 text-sm">{errors.dataNascimento}</p>}
        </div>
        <div className="flex justify-between">
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
    </>
  );
};

CadastroAlunoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CadastroAlunoForm;
