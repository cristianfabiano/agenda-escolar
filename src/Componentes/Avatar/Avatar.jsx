import "./Avatar.css";

function Avatar({ nome = "", imagem }) {
  const iniciais = nome
    .trim()
    .split(" ")
    .filter((item) => item)
    .map((item) => item[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="avatar__root">
      {imagem && imagem !== "" ? (
        <img
          src={imagem}
          alt={nome}
          className="avatar__imagem"
        />
      ) : (
        <span>{iniciais || "?"}</span>
      )}
    </div>
  );
}

export default Avatar;