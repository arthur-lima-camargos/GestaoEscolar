import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";
import Clientes from "./pages/Clientes/Clientes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/alunos' element={<Clientes />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
