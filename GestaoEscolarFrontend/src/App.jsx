import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";
import AlunoPage from "./pages/Alunos/Aluno";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/alunos' element={<AlunoPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
