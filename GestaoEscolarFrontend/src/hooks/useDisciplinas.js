import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = "https://localhost:7013/api";

const fetchDisciplinas = async () => {
  const response = await fetch(API_BASE_URL + "/Disciplinas");
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

  const cadastrarDisciplina = async (event) => {
    if (event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const input = {
        codigo: formData.get("codigo"),
        nome: formData.get("nome"),
      };

      try {
        const response = await fetch(API_BASE_URL + "/Disciplinas", {
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
          if (responseText.includes("Disciplina com esse Nome")) {
            throw new Error("Nome da disciplina já cadastrado no sistema");
          }
          throw new Error(data.message || "Erro ao cadastrar disciplina");
        }

        setModalOpen(false);
        queryClient.invalidateQueries(["disciplinas"]);
        alert("Disciplina cadastrada com sucesso!");
        return null;
      } catch (error) {
        return error.message;
      }
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
