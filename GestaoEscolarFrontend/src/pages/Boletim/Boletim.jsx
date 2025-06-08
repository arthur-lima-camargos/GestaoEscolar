import React from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableBoletim from "../../components/TableBoletim/TableBoletim";
import AsyncSelect from 'react-select/async';
import { useSelectedAluno, useSetSelectedAluno } from "../../hooks/useSelectedAluno";
import { useAlunos } from "../../hooks/useAlunos";

const { fetchAlunos } = useAlunos();

const BoletimPage = () => {
  const { data: selectedAluno } = useSelectedAluno();
  const setSelectedAluno = useSetSelectedAluno();
  
  const { data: alunos = [], isLoading, isError } = useQuery({
    queryKey: ["alunos"],
    queryFn: fetchAlunos,
  });
  const loadOptions = async (input) => {    
    const filteredAlunos = alunos.filter(aluno =>
      aluno.nomeCompleto.toLowerCase().includes(input.toLowerCase())
    );

    return filteredAlunos.map(aluno => ({
      value: aluno.id,
      label: aluno.nomeCompleto
    }));
  };

  if (isError) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="p-10 w-full">
          <div className="text-red-500">Erro ao carregar os dados dos alunos.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-10 w-full">
        <h1 className="font-bold text-4xl mb-6">Boletim</h1>
        
        <div className="w-full max-w-2xl">
          <label htmlFor="aluno-select" className="block mb-2 text-lg">
            Selecione ou pesquise um aluno
          </label>          
          <AsyncSelect
            id="aluno-select"
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            onChange={setSelectedAluno}
            placeholder="Digite o nome do aluno..."
            noOptionsMessage={() => "Nenhum aluno encontrado"}
            loadingMessage={() => "Carregando..."}
            className="mb-4"
            isClearable
            isLoading={isLoading}
          />
        </div>        
        <TableBoletim 
          alunoId={selectedAluno?.value}
          nomeAluno={selectedAluno?.label}
        />
      </div>
    </div>
  );
};

export default BoletimPage;
