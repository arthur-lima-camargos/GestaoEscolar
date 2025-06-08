import React from "react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from 'prop-types';

const fetchNotasAluno = async (alunoId) => {
  if (!alunoId) return [];
  const response = await fetch(`https://localhost:7013/api/Notas/aluno/${alunoId}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar notas do aluno");
  }
  return response.json();
};

const TableBoletim = ({ alunoId, nomeAluno }) => {
  const { data: notas = [], isLoading, isError } = useQuery({
    queryKey: ["notasAluno", alunoId],
    queryFn: () => fetchNotasAluno(alunoId),
    enabled: !!alunoId,
  });

  if (!alunoId) {
    return null;
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os dados.</div>;
  }

  const calcularMedia = () => {
    if (notas.length === 0) return 0;
    const soma = notas.reduce((acc, nota) => acc + nota.valor, 0);
    return (soma / notas.length).toFixed(2);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Boletim de {nomeAluno}</h2>
      <table className="w-full rounded-md overflow-hidden shadow-md table-fixed">
        <thead>
          <tr className="bg-gray-900 text-white text-left text-sm uppercase">
            <th className="p-2 w-2/3">Disciplina</th>
            <th className="p-2 w-1/3">Nota</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota, index) => (
            <tr
              key={nota.id}
              className={index % 2 === 0 ? "bg-white" : "bg-[#edeeec]"}
            >
              <td className="p-2">{nota.nomeDisciplina}</td>
              <td className="p-2">{nota.valor.toFixed(2)}</td>
            </tr>
          ))}
          <tr className="bg-gray-100 font-bold">
            <td className="p-2">Média Geral</td>
            <td className="p-2">{calcularMedia()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

TableBoletim.propTypes = {
  alunoId: PropTypes.number,
  nomeAluno: PropTypes.string,
};

export default TableBoletim;
