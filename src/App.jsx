import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Cabecalho from "./Componentes/Cabecalho/Cabecalho";
import Rodape from "./Componentes/Rodape/Rodape";

import CadastroAlunos from "./paginas/CadastroAlunos/CadastroAlunos";
import ListaAlunos from "./paginas/ListaAlunos/ListaAlunos";
import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import Turmas from "./paginas/Turmas/Turmas";

const roteador = createBrowserRouter([
  {
    path: "/",
    element: <PaginaInicial />
  },
  {
    path: "/cadastro-aluno/:alunoId?",
    element: <CadastroAlunos />
  },
  {
    path: "/lista-alunos",
    element: <ListaAlunos />
  },
  {
    path: "/lista-turmas",
    element: <Turmas />
  }
]);

function App() {
  return (
    <>
      <Cabecalho />

      <RouterProvider router={roteador} />

      <Rodape />
    </>
  );
}

export default App;