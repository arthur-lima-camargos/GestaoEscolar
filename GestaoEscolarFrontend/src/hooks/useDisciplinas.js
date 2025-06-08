import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchDisciplinas = async () => {
  const response = await fetch("https://localhost:7013/api/Disciplinas");
  if (!response.ok) {
    throw new Error("Erro ao buscar disciplinas");
  }
  return response.json();
};

export const useDisciplinas = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: disciplinas = [], isLoading, isError } = useQuery({
    queryKey: ["disciplinas"],
    queryFn: fetchDisciplinas,
  });

  const filteredDisciplinas = disciplinas.filter((disciplina) =>
    disciplina.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disciplina.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cadastrarDisciplina = async (input) => {
    if (input.preventDefault) {
      input.preventDefault();
      const formData = new FormData(input.target);
      input = {
        codigo: formData.get("codigo"),
        nome: formData.get("nome"),
      };
    }

    try {
      const response = await fetch("https://localhost:7013/api/Disciplinas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar disciplina");
      }

      setModalOpen(false);
      queryClient.invalidateQueries(["disciplinas"]);
      alert("Disciplina cadastrada com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  };

  return {
    disciplinas: filteredDisciplinas,
    isLoading,
    isError,
    isModalOpen,
    searchTerm,
    setModalOpen,
    setSearchTerm,
    cadastrarDisciplina,
  };
};
