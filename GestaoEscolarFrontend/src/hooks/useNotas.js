import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = "https://localhost:7013/api";

const fetchNotas = async () => {
  const response = await fetch(API_BASE_URL + "/Notas");
  if (!response.ok) {
    throw new Error("Erro ao buscar notas");
  }
  return response.json();
};

export const useNotas = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: notas = [], isLoading, isError } = useQuery({
    queryKey: ["notas"],
    queryFn: fetchNotas,
  });

  const filteredNotas = notas.filter(
    (nota) =>
      nota.nomeAluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nota.nomeDisciplina.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cadastrarNota = async (event) => {
    if (event) {
      event.preventDefault();
      const formData = new FormData(event.target);

      const alunoId = parseInt(formData.get("alunoId"));
      const disciplinaId = parseInt(formData.get("disciplinaId"));
      const valor = parseFloat(formData.get("valor"));
      
      const alunoSelect = event.target.querySelector('#alunoId');
      const disciplinaSelect = event.target.querySelector('#disciplinaId');
      const nomeAluno = alunoSelect.options[alunoSelect.selectedIndex].text;
      const nomeDisciplina = disciplinaSelect.options[disciplinaSelect.selectedIndex].text;

      try {
        const response = await fetch(API_BASE_URL + "/Notas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            valor,
            alunoId,
            disciplinaId,
            nomeAluno,
            nomeDisciplina
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.title || "Erro ao cadastrar nota");
        }

        setModalOpen(false);
        queryClient.invalidateQueries(["notas"]);
        alert("Nota cadastrada com sucesso!");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return {
    notas: filteredNotas,
    isLoading,
    isError,
    isModalOpen,
    searchTerm,
    setModalOpen,
    setSearchTerm,
    cadastrarNota,
  };
};
