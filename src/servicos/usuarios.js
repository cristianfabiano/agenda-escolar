export function buscarUsuarioLogado() {
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  if (!usuarioLogado) {
    return null;
  }

  return JSON.parse(usuarioLogado);
}

export function salvarUsuario(usuarioAtualizado) {
  const usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

  const index = usuarios.findIndex(
    (u) => u.id === usuarioAtualizado.id
  );

  if (index !== -1) {
    usuarios[index] = usuarioAtualizado;
  } else {
    usuarios.push(usuarioAtualizado);
  }

  localStorage.setItem(
    "usuarios",
    JSON.stringify(usuarios)
  );

  localStorage.setItem(
    "usuarioLogado",
    JSON.stringify(usuarioAtualizado)
  );
}

export function logoutUsuario() {
  localStorage.removeItem("usuarioLogado");
}