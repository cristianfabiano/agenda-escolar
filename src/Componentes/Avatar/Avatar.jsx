import "./Avatar.css";

function Avatar({ nome = "", imagem }) {
  const primeirasLetras = nome
    .trim()
    .split(" ")
    .filter((item) => item.length > 0)
    .map((item) => item[0])
    .join("")
    .toUpperCase();

  return (
    <div className="avatar__root">
      {imagem ? (
        <img src={imagem} alt={nome} />
      ) : (
        primeirasLetras || "?"
      )}
    </div>
  );
}

export default Avatar;