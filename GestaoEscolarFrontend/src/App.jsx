import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";
import AlunoPage from "./pages/Aluno/Aluno";
import DisciplinaPage from "./pages/Disciplina/Disciplina";
import NotasPage from "./pages/Nota/Nota";
import BoletimPage from "./pages/Boletim/Boletim";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/alunos' element={<AlunoPage />} />
          <Route path="/disciplinas" element={<DisciplinaPage/>} />
          <Route path="/notas" element={<NotasPage/>}/>
          <Route path="/boletim" element={<BoletimPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
