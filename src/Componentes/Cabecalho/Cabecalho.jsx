import "./Cabecalho.css";
import { useAppContext } from "../../Contexto/AppContext";
import Avatar from "../Avatar/Avatar";

function Cabecalho() {
  const { usuarioLogado } = useAppContext();

  return (
    <header className="cabecalho__root">
      {!usuarioLogado ? null : (
        <Avatar
          nome={usuarioLogado.nome}
          imagem={usuarioLogado.foto}
        />
      )}
    </header>
  );
}

export default Cabecalho;
