const CHAVE_USUARIOS = "usuarios";
const CHAVE_USUARIO_LOGADO = "usuarioLogado";

export function buscarUsuarioLogado() {
  try {
    const usuarioLogado = localStorage.getItem(
      CHAVE_USUARIO_LOGADO
    );

    return usuarioLogado
      ? JSON.parse(usuarioLogado)
      : null;
  } catch (error) {
    console.error("Erro ao buscar usuário logado:", error);
    return null;
  }
}

export function salvarUsuario(usuarioAtualizado) {
  try {
    const usuarios =
      JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];

    const index = usuarios.findIndex(
      (usuario) => usuario.id === usuarioAtualizado.id
    );

    if (index >= 0) {
      usuarios[index] = usuarioAtualizado;
    } else {
      usuarios.push(usuarioAtualizado);
    }

    localStorage.setItem(
      CHAVE_USUARIOS,
      JSON.stringify(usuarios)
    );

    localStorage.setItem(
      CHAVE_USUARIO_LOGADO,
      JSON.stringify(usuarioAtualizado)
    );
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
  }
}

export function logoutUsuario() {
  localStorage.removeItem(CHAVE_USUARIO_LOGADO);
}