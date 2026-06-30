import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Cabecalho from "./Componentes/Cabecalho/Cabecalho";
import Rodape from "./Componentes/Rodape/Rodape";
import ValidarAutenticacao from "./Componentes/ValidarAutenticacao/ValidarAutenticacao";

import Login from "./paginas/Login/Login";
import NovoUsuario from "./paginas/NovoUsuario/NovoUsuario";
import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import CadastroAlunos from "./paginas/CadastroAlunos/CadastroAlunos";
import ListaAlunos from "./paginas/ListaAlunos/ListaAlunos";
import Turmas from "./paginas/Turmas/Turmas";
import PerfilUsuario from "./paginas/PerfilUsuario/PerfilUsuario";

const router = createBrowserRouter([

  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/novo-usuario",
    element: <NovoUsuario />,
  },


  {
    element: <ValidarAutenticacao />,
    children: [
      {
        path: "/inicio",
        element: <PaginaInicial />,
      },
      {
        path: "/meu-perfil",
        element: <PerfilUsuario />,
      },
      {
        path: "/cadastro-aluno/:alunoId?",
        element: <CadastroAlunos />,
      },
      {
        path: "/lista-alunos",
        element: <ListaAlunos />,
      },
      {
        path: "/lista-turmas",
        element: <Turmas />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Cabecalho />
      <RouterProvider router={router} />
      <Rodape />
    </>
  );
}

export default App;