import "./PaginaInicial.css";

import { useNavigate } from "react-router-dom";
import { FaListUl, FaUserGraduate } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";

import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../Componentes/Principal/Principal";
import { useAppContext } from "../../Contexto/AppContext";

function PaginaInicial() {
  const navigate = useNavigate();
  const { usuarioLogado, setUsuarioLogado } = useAppContext();

  function sair() {
    localStorage.removeItem("usuarioLogado");
    setUsuarioLogado(null);

    navigate("/login", { replace: true });
  }

  function irPara(rota) {
    navigate(rota);
  }

  return (
    <Principal titulo="Página Inicial">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p>{usuarioLogado?.email}</p>

          <h2>
            Olá, {usuarioLogado?.nome}! Seja bem-vindo!
          </h2>
        </div>

        <BotaoCustomizado
          tipo="primario"
          aoClicar={sair}
        >
          Sair
        </BotaoCustomizado>
      </div>

      <div className="cards-container">
        <button
          className="card"
          onClick={() => irPara("/cadastro-aluno")}
        >
          <IoPersonAdd size={60} />
          <span>Cadastro de Alunos</span>
        </button>

        <button
          className="card"
          onClick={() => irPara("/lista-alunos")}
        >
          <FaUserGraduate size={60} />
          <span>Lista de Alunos</span>
        </button>

        <button
          className="card"
          onClick={() => irPara("/lista-turmas")}
        >
          <FaListUl size={60} />
          <span>Turmas</span>
        </button>
      </div>
    </Principal>
  );
}

export default PaginaInicial;