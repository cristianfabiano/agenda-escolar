import "./PerfilUsuario.css";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Avatar from "../../Componentes/Avatar/Avatar";
import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../Componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../Componentes/Principal/Principal";

import { useAppContext } from "../../Contexto/AppContext";
import { salvarUsuario } from "../../servicos/usuarios";

function PerfilUsuario() {
  const navigate = useNavigate();

  const { usuarioLogado, setUsuarioLogado } = useAppContext();

  function salvar() {
    salvarUsuario(usuarioLogado);

    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify(usuarioLogado)
    );

    toast.success("Perfil atualizado com sucesso!");
  }

  function sair() {
    localStorage.removeItem("usuarioLogado");
    setUsuarioLogado(null);

    navigate("/login", { replace: true });
  }

  function alterarFoto(e) {
    const imagem = e.target.files?.[0];

    if (!imagem) return;

    const reader = new FileReader();

    reader.onload = ({ target }) => {
      setUsuarioLogado((usuarioAnterior) => ({
        ...usuarioAnterior,
        foto: target.result,
      }));
    };

    reader.readAsDataURL(imagem);
  }

  if (!usuarioLogado) {
    return (
      <Principal titulo="Meu Perfil" voltarPara="/inicio" />
    );
  }

  return (
    <Principal
      titulo="Meu Perfil"
      voltarPara="/inicio"
    >
      <label
        htmlFor="imageUpload"
        className="perfil-usuario__avatar"
      >
        <Avatar
          nome={usuarioLogado.nome}
          imagem={usuarioLogado.foto}
        />

        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={alterarFoto}
        />

        <span className="perfil-usuario__avatar-text">
          Clique para alterar a foto
        </span>
      </label>

      <CampoCustomizado
        label="Email"
        value={usuarioLogado.email}
        disabled
      />

      <CampoCustomizado
        label="Nome"
        value={usuarioLogado.nome}
        onChange={(e) =>
          setUsuarioLogado({
            ...usuarioLogado,
            nome: e.target.value,
          })
        }
      />

      <BotaoCustomizado
        tipo="primario"
        aoClicar={salvar}
      >
        Salvar
      </BotaoCustomizado>

      <BotaoCustomizado
        aoClicar={sair}
      >
        Sair
      </BotaoCustomizado>
    </Principal>
  );
}

export default PerfilUsuario;