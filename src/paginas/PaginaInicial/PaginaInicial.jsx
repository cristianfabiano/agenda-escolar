import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Contexto/AppContext";

import Principal from "../../Componentes/Principal/Principal";
import "./PaginaInicial.css";

import { IoPersonAdd } from "react-icons/io5";
import { FaListUl, FaUserGraduate } from "react-icons/fa";

function PaginaInicial() {
  const navigate = useNavigate();
  const { usuarioLogado } = useAppContext();

  return (
    <Principal titulo="">

      <h2>Bem-vindo, {usuarioLogado?.nome}!</h2>
      <p>{usuarioLogado?.email}</p>

      <div className="cards-container">

        <button
          className="card"
          onClick={() => navigate("/cadastro-aluno")}
        >
          <IoPersonAdd size={60} />
          <span>Cadastro de Alunos</span>
        </button>

        <button
          className="card"
          onClick={() => navigate("/lista-alunos")}
        >
          <FaUserGraduate size={60} />
          <span>Lista de Alunos</span>
        </button>

        <button
          className="card"
          onClick={() => navigate("/lista-turmas")}
        >
          <FaListUl size={60} />
          <span>Turmas</span>
        </button>

      </div>

    </Principal>
  );
}

export default PaginaInicial;