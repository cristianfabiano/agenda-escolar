import "./ListaAlunos.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAddCircle, MdDelete, MdEdit } from "react-icons/md";

import Avatar from "../../Componentes/Avatar/Avatar";
import CampoCustomizado from "../../Componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../Componentes/Principal/Principal";
import { useAppContext } from "../../Contexto/AppContext";
import normalizarString from "../../utils/normalizarString";

function ListaAlunos() {
  const navigate = useNavigate();
  const { usuarioLogado } = useAppContext();

  const CHAVE_ALUNOS = `alunos_${usuarioLogado.email}`;

  const [termoBusca, setTermoBusca] = useState("");

  const [alunos, setAlunos] = useState(
    JSON.parse(localStorage.getItem(CHAVE_ALUNOS)) || []
  );

  function removerAluno(alunoParaRemover) {
    const confirmar = window.confirm(
      `Tem certeza que deseja remover o aluno ${alunoParaRemover.nome}?`
    );

    if (!confirmar) return;

    const alunosAtualizados = alunos.filter(
      (aluno) => aluno.id !== alunoParaRemover.id
    );

    localStorage.setItem(
      CHAVE_ALUNOS,
      JSON.stringify(alunosAtualizados)
    );

    setAlunos(alunosAtualizados);
  }

  const alunosFiltrados = alunos.filter((aluno) => {
    const busca = normalizarString(termoBusca);

    return (
      normalizarString(aluno.nome).includes(busca) ||
      normalizarString(aluno.cpf).includes(busca) ||
      normalizarString(aluno.matricula).includes(busca)
    );
  });

  return (
    <Principal
      titulo="Lista de Alunos"
      voltarPara="/inicio"
    >
      <CampoCustomizado
        type="search"
        placeholder="Buscar aluno pelo nome, CPF ou matrícula"
        value={termoBusca}
        onChange={(e) =>
          setTermoBusca(e.target.value)
        }
      />

      {alunosFiltrados.length > 0 ? (
        alunosFiltrados.map((aluno) => (
          <div
            key={aluno.id}
            className="lista-alunos__item"
          >
            <div className="lista-alunos__item-informacoes">
              <Avatar
                nome={aluno.nome}
                imagem={aluno.foto}
              />

              <span>{aluno.nome}</span>
            </div>

            <div className="lista-alunos__item-acoes">
              <MdEdit
                size={24}
                title="Editar"
                onClick={() =>
                  navigate(`/cadastro-aluno/${aluno.id}`)
                }
              />

              <MdDelete
                size={24}
                color="red"
                title="Excluir"
                onClick={() => removerAluno(aluno)}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="lista-alunos__mensagem-vazia">
          Nenhum aluno encontrado.
        </p>
      )}

      <MdAddCircle
        className="lista-alunos__botao-adicionar"
        size={64}
        color="#ff9100"
        title="Cadastrar Aluno"
        onClick={() => navigate("/cadastro-aluno")}
      />
    </Principal>
  );
}

export default ListaAlunos;