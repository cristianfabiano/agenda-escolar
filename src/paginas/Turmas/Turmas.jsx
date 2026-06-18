import Principal from "../../componentes/Principal/Principal";
import "./Turmas.css";

function Turmas() {
  const alunos =
    JSON.parse(localStorage.getItem("alunos")) || [];

  const turmas = [
    "Desenvolvimento Web",
    "Desenvolvimento Mobile",
    "Desenvolvimento de Jogos",
    "Desenvolvimento de Sistemas",
  ];

  return (
    <Principal titulo="Turmas" voltarPara="/">
      <div className="turmas-container">
        {turmas.map((turma) => {
          const alunosDaTurma = alunos.filter(
            (aluno) => aluno.turma === turma
          );

          return (
            <div key={turma} className="card-turma">
              <h2>{turma}</h2>

              {alunosDaTurma.length > 0 ? (
                alunosDaTurma.map((aluno) => (
                  <div key={aluno.id}>
                    <p>{aluno.nome}</p>
                  </div>
                ))
              ) : (
                <p>Nenhum aluno</p>
              )}
            </div>
          );
        })}
      </div>
    </Principal>
  );
}

export default Turmas;