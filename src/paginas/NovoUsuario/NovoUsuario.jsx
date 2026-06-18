import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";

import validarEmail from "../../utils/validarEmail";
import validarSenha from "../../utils/validarSenha";

function NovoUsuario() {
  const navigate = useNavigate();

  const [usuarioForm, setUsuarioForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });

  function salvar() {
    if (
      !usuarioForm.nome.trim() ||
      !usuarioForm.email.trim() ||
      !usuarioForm.senha.trim() ||
      !usuarioForm.confirmacaoSenha.trim()
    ) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (!validarEmail(usuarioForm.email)) {
      toast.error("Email inválido.");
      return;
    }

    if (!validarSenha(usuarioForm.senha)) {
      toast.error("Senha inválida.");
      return;
    }

    if (usuarioForm.senha !== usuarioForm.confirmacaoSenha) {
      toast.error("As senhas não conferem.");
      return;
    }

    const usuarios =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(
      (usuario) =>
        usuario.email.toLowerCase() ===
        usuarioForm.email.toLowerCase()
    );

    if (existe) {
      toast.error("Este email já está cadastrado.");
      return;
    }

    usuarios.push({
      id: crypto.randomUUID(),
      nome: usuarioForm.nome,
      email: usuarioForm.email.toLowerCase(),
      senha: usuarioForm.senha,
      foto: "",
    });

    localStorage.setItem(
      "usuarios",
      JSON.stringify(usuarios)
    );

    toast.success("Usuário cadastrado com sucesso!");

    navigate("/login");
  }

  return (
    <Principal titulo="Novo Usuário" voltarPara="/login">

      <CampoCustomizado
        label="Nome"
        value={usuarioForm.nome}
        obrigatorio
        onChange={(e)=>
          setUsuarioForm({
            ...usuarioForm,
            nome:e.target.value
          })
        }
      />

      <CampoCustomizado
        label="Email"
        type="email"
        value={usuarioForm.email}
        obrigatorio
        onChange={(e)=>
          setUsuarioForm({
            ...usuarioForm,
            email:e.target.value
          })
        }
      />

      <CampoCustomizado
        label="Senha"
        type="password"
        value={usuarioForm.senha}
        obrigatorio
        onChange={(e)=>
          setUsuarioForm({
            ...usuarioForm,
            senha:e.target.value
          })
        }
      />

      <CampoCustomizado
        label="Confirmar Senha"
        type="password"
        value={usuarioForm.confirmacaoSenha}
        obrigatorio
        onChange={(e)=>
          setUsuarioForm({
            ...usuarioForm,
            confirmacaoSenha:e.target.value
          })
        }
      />

      <BotaoCustomizado tipo="primario" aoClicar={salvar}>
        Salvar
      </BotaoCustomizado>

    </Principal>
  );
}

export default NovoUsuario;