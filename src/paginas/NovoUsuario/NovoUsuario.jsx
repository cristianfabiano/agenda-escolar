import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../Componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../Componentes/Principal/Principal";

import validarEmail from "../../utils/validarEmail";
import validarSenha from "../../utils/validarSenha";

const CHAVE_USUARIOS = "usuarios";

function NovoUsuario() {
  const navigate = useNavigate();

  const [usuarioForm, setUsuarioForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });

  function salvar() {
    const { nome, email, senha, confirmacaoSenha } = usuarioForm;

    if (
      !nome.trim() ||
      !email.trim() ||
      !senha.trim() ||
      !confirmacaoSenha.trim()
    ) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (!validarEmail(email)) {
      toast.error("Email inválido.");
      return;
    }

    if (!validarSenha(senha)) {
      toast.error("Senha inválida.");
      return;
    }

    if (senha !== confirmacaoSenha) {
      toast.error("As senhas não conferem.");
      return;
    }

    const usuarios =
      JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];

    const existe = usuarios.some(
      (usuario) =>
        usuario.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (existe) {
      toast.error("Este email já está cadastrado.");
      return;
    }

    usuarios.push({
      id: crypto.randomUUID(),
      nome: nome.trim(),
      email: email.toLowerCase().trim(),
      senha,
      foto: "",
    });

    localStorage.setItem(
      CHAVE_USUARIOS,
      JSON.stringify(usuarios)
    );

    toast.success("Usuário cadastrado com sucesso!");

    navigate("/login", { replace: true });
  }

  return (
    <Principal
      titulo="Novo Usuário"
      voltarPara="/login"
    >
      <CampoCustomizado
        label="Nome"
        obrigatorio
        value={usuarioForm.nome}
        onChange={(e) =>
          setUsuarioForm({
            ...usuarioForm,
            nome: e.target.value,
          })
        }
      />

      <CampoCustomizado
        label="Email"
        type="email"
        obrigatorio
        value={usuarioForm.email}
        onChange={(e) =>
          setUsuarioForm({
            ...usuarioForm,
            email: e.target.value,
          })
        }
      />

      <CampoCustomizado
        label="Senha"
        type="password"
        obrigatorio
        value={usuarioForm.senha}
        onChange={(e) =>
          setUsuarioForm({
            ...usuarioForm,
            senha: e.target.value,
          })
        }
      />

      <CampoCustomizado
        label="Confirmar Senha"
        type="password"
        obrigatorio
        value={usuarioForm.confirmacaoSenha}
        onChange={(e) =>
          setUsuarioForm({
            ...usuarioForm,
            confirmacaoSenha: e.target.value,
          })
        }
      />

      <BotaoCustomizado
        tipo="primario"
        aoClicar={salvar}
      >
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
}

export default NovoUsuario;