import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchAlunos = async () => {
  const response = await fetch("https://localhost:7013/api/Alunos");
  if (!response.ok) {
    throw new Error("Erro ao buscar alunos");
  }
  return response.json();
};

export const useAlunos = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: alunos = [], isLoading, isError } = useQuery({
    queryKey: ["alunos"],
    queryFn: fetchAlunos,
  });

  const filteredAlunos = alunos.filter(
    (aluno) =>
      aluno.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.cpf.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cadastrarAluno = async (event) => {
    if (event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const input = {
        cpf: formData.get("cpf"),
        nomeCompleto: formData.get("nomeCompleto"),
        dataNascimento: formData.get("dataNascimento"),
      };

      try {
        const response = await fetch("https://localhost:7013/api/Alunos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          throw new Error("Erro ao cadastrar aluno");
        }

        setModalOpen(false);
        queryClient.invalidateQueries(["alunos"]);
        alert("Aluno cadastrado com sucesso!");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return {
    alunos: filteredAlunos,
    isLoading,
    isError,
    isModalOpen,
    searchTerm,
    setModalOpen,
    setSearchTerm,
    cadastrarAluno,
  };
};
