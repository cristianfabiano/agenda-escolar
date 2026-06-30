import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Contexto/AppContext";

function ValidarAutenticacao() {
  const navigate = useNavigate();
  const { usuarioLogado } = useAppContext();

  useEffect(() => {
    if (!usuarioLogado) {
      navigate("/login", { replace: true });
    }
  }, [usuarioLogado, navigate]);

  return usuarioLogado ? <Outlet /> : null;
}

export default ValidarAutenticacao;