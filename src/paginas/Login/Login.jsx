import "./Login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../Componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../Componentes/Principal/Principal";
import { useAppContext } from "../../Contexto/AppContext";

const CHAVE_USUARIOS = "usuarios";
const CHAVE_USUARIO_LOGADO = "usuarioLogado";

function Login() {
  const navigate = useNavigate();
  const { setUsuarioLogado } = useAppContext();

  const [loginForm, setLoginForm] = useState({
    email: "",
    senha: "",
  });

  function entrar() {
    const { email, senha } = loginForm;

    if (!email.trim() || !senha.trim()) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const usuarios =
      JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];

    const usuario = usuarios.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.senha === senha
    );

    if (!usuario) {
      toast.error("Email ou senha incorretos.");
      return;
    }

    localStorage.setItem(
      CHAVE_USUARIO_LOGADO,
      JSON.stringify(usuario)
    );

    setUsuarioLogado(usuario);

    toast.success("Login realizado com sucesso!");

    navigate("/inicio", { replace: true });
  }

  return (
    <Principal titulo="Login">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "20px",
        }}
      >
        <img
          src="/logo-512.png"
          alt="Agenda Escolar"
          style={{
            width: "90px",
            height: "90px",
            objectFit: "contain",
          }}
        />
      </div>

      <CampoCustomizado
        label="Email"
        type="email"
        obrigatorio
        value={loginForm.email}
        onChange={(e) =>
          setLoginForm({
            ...loginForm,
            email: e.target.value,
          })
        }
      />

      <CampoCustomizado
        label="Senha"
        type="password"
        obrigatorio
        value={loginForm.senha}
        onChange={(e) =>
          setLoginForm({
            ...loginForm,
            senha: e.target.value,
          })
        }
      />

      <BotaoCustomizado
        tipo="primario"
        aoClicar={entrar}
      >
        Entrar
      </BotaoCustomizado>

      <Link to="/novo-usuario">
        Não possui conta? Cadastre-se.
      </Link>
    </Principal>
  );
}

export default Login;