import "./Principal.css";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Principal({ voltarPara, titulo, children }) {
  const navigate = useNavigate();

  return (
    <main className="principal__root">
      <div className="principal__titulo">
        {voltarPara && <IoArrowBack
  size={24}
  onClick={() => {
    console.log("Voltar para:", voltarPara);
    navigate(voltarPara);
  }}
/>}

        <h2>{titulo}</h2>
      </div>

      {children}
    </main>
  );
}

export default Principal;