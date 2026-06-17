import Avatar from "../Avatar/Avatar";
import "./Cabecalho.css";

function Cabecalho() {
  return (
    <header className="cabecalho__root">
      <img
        src="/logo.png"
        alt="Logo"
        height="32"
      />

      <Avatar nome="Agenda Escolar" />
    </header>
  );
}

export default Cabecalho;
