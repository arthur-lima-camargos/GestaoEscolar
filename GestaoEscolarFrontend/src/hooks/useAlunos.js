import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = "https://localhost:7013/api";

const fetchAlunos = async () => {
  const response = await fetch(API_BASE_URL + "/Alunos");
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
        const response = await fetch(API_BASE_URL + "/Alunos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });

        const responseText = await response.text();
        let data;
        try {
          data = JSON.parse(responseText);
        } catch {
          data = { message: responseText };
        }

        if (!response.ok) {
          if (responseText.includes("CPF já existe")) {
            throw new Error("CPF já cadastrado no sistema");
          }
          throw new Error(data.message || "Erro ao cadastrar aluno");
        }

        setModalOpen(false);
        queryClient.invalidateQueries(["alunos"]);
        alert("Aluno cadastrado com sucesso!");
        return null;
      } catch (error) {
        return error.message;
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
    fetchAlunos,
  };
};
