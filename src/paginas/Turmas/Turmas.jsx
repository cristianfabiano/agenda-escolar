import "./Turmas.css";

import Principal from "../../Componentes/Principal/Principal";
import { useAppContext } from "../../Contexto/AppContext";

function Turmas() {
  const { usuarioLogado } = useAppContext();

  const CHAVE_ALUNOS = `alunos_${usuarioLogado.email}`;

  const alunos =
    JSON.parse(localStorage.getItem(CHAVE_ALUNOS)) || [];

  const turmas = [
    "Desenvolvimento Web",
    "Desenvolvimento Mobile",
    "Desenvolvimento de Jogos",
    "Desenvolvimento de Sistemas",
  ];

  return (
    <Principal
      titulo="Turmas"
      voltarPara="/inicio"
    >
      <div className="turmas-container">
        {turmas.map((turma) => {
          const alunosDaTurma = alunos.filter(
            (aluno) => aluno.turma === turma
          );

          return (
            <div
              key={turma}
              className="card-turma"
            >
              <h2>{turma}</h2>

              <p>
                <strong>
                  Total de alunos:
                </strong>{" "}
                {alunosDaTurma.length}
              </p>

              {alunosDaTurma.length > 0 ? (
                alunosDaTurma.map((aluno) => (
                  <div
                    key={aluno.id}
                    className="aluno-item"
                  >
                    <p>{aluno.nome}</p>
                  </div>
                ))
              ) : (
                <p>Nenhum aluno cadastrado.</p>
              )}
            </div>
          );
        })}
      </div>
    </Principal>
  );
}

export default Turmas;