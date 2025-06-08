# Gestão Escolar

Este projeto é uma aplicação web para a gestão escolar, composta por um backend em .NET e um frontend em React. A aplicação permite gerenciar alunos, disciplinas e notas, além de exibir informações em tabelas.

## Estrutura do Projeto

- **GestaoEscolarApi/**: Contém o backend da aplicação, desenvolvido em .NET.
- **GestaoEscolarFrontend/**: Contém o frontend da aplicação, desenvolvido em React com Vite.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [.NET SDK](https://dotnet.microsoft.com/) (versão 9.0 ou superior)
- [SQL Server](https://www.microsoft.com/sql-server) (ou outro banco de dados configurado no projeto)
- [Visual Studio](https://visualstudio.microsoft.com/) (necessário para executar o backend)

## Configuração do Backend

1. Navegue até o diretório do backend:

   ```powershell
   cd GestaoEscolarApi
   ```

2. Restaure as dependências do projeto:

   ```powershell
   dotnet restore
   ```

3. Configure o banco de dados no arquivo `appsettings.json`.

4. Aplique as migrações para criar o banco de dados:

   ```powershell
   dotnet ef database update
   ```

5. Inicie o servidor backend:

   Abra o Visual Studio, carregue a solução `GestaoEscolarApi.sln` e pressione `F5` ou clique em "Iniciar" para executar a API.

O backend estará disponível em `https://localhost:7013`.

## Configuração do Frontend

1. Navegue até o diretório do frontend:

   ```powershell
   cd GestaoEscolarFrontend
   ```

2. Instale as dependências do projeto:

   ```powershell
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```powershell
   npm run dev
   ```

O frontend estará disponível em `http://localhost:5173`.

## Executando o Projeto

1. Certifique-se de que o backend está em execução.
2. Certifique-se de que o frontend está em execução.
3. Acesse o frontend no navegador em `http://localhost:5173`.

## Estrutura de Pastas

- **GestaoEscolarApi/src**:

  - **Controllers**: Controladores da API.
  - **Data**: Contexto e fábrica do banco de dados.
  - **DTOs**: Objetos de transferência de dados.
  - **Models**: Modelos de domínio.
  - **Repositories**: Repositórios para acesso a dados.
  - **Services**: Serviços de negócio.

- **GestaoEscolarFrontend/src**:
  - **components**: Componentes reutilizáveis.
  - **hooks**: Hooks personalizados.
  - **pages**: Páginas principais da aplicação.

## Tecnologias Utilizadas

- **Backend**:

  - .NET 9.0
  - Entity Framework Core
  - SQL Server

- **Frontend**:
  - React
  - Vite
  - Tailwind CSS

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
