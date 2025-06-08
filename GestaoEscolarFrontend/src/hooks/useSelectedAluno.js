import { useQuery, useQueryClient } from "@tanstack/react-query";

const SELECTED_ALUNO_KEY = "selectedAluno";

export const useSelectedAluno = () => {
  return useQuery({
    queryKey: [SELECTED_ALUNO_KEY],
    queryFn: () => null,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export const useSetSelectedAluno = () => {
  const queryClient = useQueryClient();
  
  return (aluno) => {
    queryClient.setQueryData([SELECTED_ALUNO_KEY], aluno);
  };
};
