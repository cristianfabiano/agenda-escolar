import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { useAppContext } from "../../contexto/AppContext";

function Login() {
  const navigate = useNavigate();
  const { setUsuarioLogado } = useAppContext();

  const [loginForm, setLoginForm] = useState({
    email: "",
    senha: "",
  });

  function entrar() {
    if (!loginForm.email.trim() || !loginForm.senha.trim()) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const usuarios =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(
      (item) =>
        item.email.toLowerCase() === loginForm.email.toLowerCase() &&
        item.senha === loginForm.senha
    );

    if (!usuario) {
      toast.error("Email ou senha incorretos.");
      return;
    }

    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify(usuario)
    );

    setUsuarioLogado(usuario);

    toast.success("Login realizado com sucesso!");

    navigate("/");
  }

  return (
    <Principal titulo="Login">
      <CampoCustomizado
        label="Email"
        type="email"
        value={loginForm.email}
        obrigatorio
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
        value={loginForm.senha}
        obrigatorio
        onChange={(e) =>
          setLoginForm({
            ...loginForm,
            senha: e.target.value,
          })
        }
      />

      <BotaoCustomizado tipo="primario" aoClicar={entrar}>
        Entrar
      </BotaoCustomizado>

      <Link to="/novo-usuario">
        Não possui conta? Cadastre-se.
      </Link>
    </Principal>
  );
}

export default Login;