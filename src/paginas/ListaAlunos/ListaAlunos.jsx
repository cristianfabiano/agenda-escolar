import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete, MdAddCircle } from "react-icons/md";
import { useState } from "react";
import Avatar from "../../Componentes/Avatar/Avatar";
import CampoCustomizado from "../../Componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../Componentes/Principal/Principal";
import normalizarString from "../../utils/normalizarString";
import "./ListaAlunos.css";

function ListaAlunos() {
  const navigate = useNavigate();

  const [termoBusca, setTermoBusca] = useState("");

  const alunosDoLocalStorage = JSON.parse(localStorage.getItem("alunos")) || [];

  const removerAluno = (alunoParaRemover) => {

    if (
      confirm(`Tem certeza que deseja remover o aluno ${alunoParaRemover.nome}?`)) {
      const alunosAtualizados = alunosDoLocalStorage.filter((aluno) => aluno.id !== alunoParaRemover.id
      );

      localStorage.setItem("alunos", JSON.stringify(alunosAtualizados)
      );

      navigate("/lista-alunos");
    }
  };

  const alunosFiltrados =
    alunosDoLocalStorage.filter(
      (aluno) =>
        normalizarString(aluno.nome).includes(normalizarString(termoBusca)) ||
        normalizarString(aluno.cpf).includes(normalizarString(termoBusca)) ||
        normalizarString(aluno.matricula).includes(normalizarString(termoBusca))
    );



  return (
    <Principal
      titulo="Lista de Alunos"
      voltarPara="/"
    >
      <CampoCustomizado
        type="search"
        placeholder="Buscar aluno pelo nome, CPF ou matrícula"
        value={termoBusca}
        onChange={(e) =>
          setTermoBusca(e.target.value)
        }
      />

      {alunosFiltrados.map((aluno) => (
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
              onClick={() =>
                navigate( `/cadastro-aluno/${aluno.id}`)
              }
            />

            <MdDelete
              size={24}
              color="red"
              onClick={() => removerAluno(aluno)
              }
            />
          </div>
        </div>
      ))}

      {alunosFiltrados.length === 0 && (
        <p className="lista-alunos__mensagem-vazia">
          Nenhum aluno encontrado.
        </p>
      )}

      <MdAddCircle
        className="lista-alunos__botao-adicionar"
        size={64}
        color="#ff9100"
        onClick={() => navigate("/cadastro-aluno")
        }
      />
    </Principal>
  );
}

export default ListaAlunos;