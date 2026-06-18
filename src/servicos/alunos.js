const alunosDoLocalStorage = JSON.parse(localStorage.getItem("alunos")) || [];

export const buscarAlunosPeloUsuario = (idUsuario) => {
  return alunosDoLocalStorage.filter((cliente) => cliente.idUsuario === idUsuario);
};

export const buscarAlunoPeloId = (idAluno) => {
  return alunosDoLocalStorage.find((aluno) => aluno.id === idAluno);
};

export const adicionarAluno = (aluno, idAluno) => {
  const novoAluno = { id: crypto.randomUUID(), idAluno, ...aluno };
  alunosDoLocalStorage.push(novoAluno);
  localStorage.setItem("alunos", JSON.stringify(alunosDoLocalStorage));
};

export const atualizarAluno = (alunoAtualizado) => {
  const indexDoAluno = alunosDoLocalStorage.findIndex(
    (aluno) => aluno.id === alunoAtualizado.id
  );
  alunosDoLocalStorage[indexDoCliente] = clienteAtualizado;
  localStorage.setItem("alunos", JSON.stringify(alunosDoLocalStorage));
};

export const removerAlunoPeloId = (idAluno) => {
  const alunosAtualizados = alunosDoLocalStorage.filter((aluno) => aluno.id !== idAluno);
  localStorage.setItem("alunos", JSON.stringify(alunosAtualizados));
};