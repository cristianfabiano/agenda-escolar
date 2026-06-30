import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../Componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../Componentes/Principal/Principal";
import validarCPF from "../../utils/validarCPF";

function CadastroAlunos() {
  const navigate = useNavigate();
  const params = useParams();

  const [aluno, setAluno] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    matricula: "",
    turma: "",
    foto: "",
  });

  useEffect(() => {
    if (params.alunoId) {
      const alunos =
        JSON.parse(localStorage.getItem("alunos")) || [];

      const encontrado = alunos.find(
        (item) => item.id === params.alunoId
      );

      if (encontrado) {
        setAluno(encontrado);
      }
    }
  }, [params.alunoId]);

  const salvar = () => {
    if (!aluno.nome.trim()) {
      toast.error("Informe o nome do aluno.");
      return;
    }

    if (!aluno.cpf.trim()) {
      toast.error("Informe o CPF.");
      return;
    }

    if (!validarCPF(aluno.cpf)) {
      toast.error("CPF inválido.");
      return;
    }

    if (!aluno.matricula.trim()) {
      toast.error("Informe a matrícula.");
      return;
    }

    if (!aluno.turma.trim()) {
      toast.error("Selecione uma turma.");
      return;
    }

    const alunos =
      JSON.parse(localStorage.getItem("alunos")) || [];

    if (aluno.id) {
      const index = alunos.findIndex(
        (a) => a.id === aluno.id
      );

      alunos[index] = aluno;
    } else {
      alunos.push({
        id: crypto.randomUUID(),
        ...aluno,
      });
    }

    localStorage.setItem(
      "alunos",
      JSON.stringify(alunos)
    );

    toast.success("Aluno salvo com sucesso!");
    navigate("/lista-alunos");
  };

  return (
    <Principal
      titulo="Cadastro de Alunos"
      voltarPara="/inicio"
    >
      <CampoCustomizado
        label="Nome"
        value={aluno.nome}
        onChange={(e) =>
          setAluno({
            ...aluno,
            nome: e.target.value,
          })
        }
        obrigatorio
      />

      <CampoCustomizado
        label="CPF"
        value={aluno.cpf}
        onChange={(e) =>
          setAluno({
            ...aluno,
            cpf: e.target.value,
          })
        }
        obrigatorio
      />

      <CampoCustomizado
        label="Data de Nascimento"
        type="date"
        value={aluno.dataNascimento}
        onChange={(e) =>
          setAluno({
            ...aluno,
            dataNascimento: e.target.value,
          })
        }
      />

      <CampoCustomizado
        label="Matrícula"
        value={aluno.matricula}
        onChange={(e) =>
          setAluno({
            ...aluno,
            matricula: e.target.value,
          })
        }
        obrigatorio
      />

      <div style={{ marginBottom: "20px" }}>
        <label>Turma</label>

        <select
          value={aluno.turma}
          onChange={(e) =>
            setAluno({
              ...aluno,
              turma: e.target.value,
            })
          }
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "8px",
            padding: "10px",
            marginTop: "5px",
          }}
        >
          <option value="">
            Selecione uma turma
          </option>

          <option value="Desenvolvimento Web">
            Desenvolvimento Web
          </option>

          <option value="Desenvolvimento Mobile">
            Desenvolvimento Mobile
          </option>

          <option value="Desenvolvimento de Jogos">
            Desenvolvimento de Jogos
          </option>

          <option value="Desenvolvimento de Sistemas">
            Desenvolvimento de Sistemas
          </option>
        </select>
      </div>

      <CampoCustomizado
        label="Telefone"
        value={aluno.telefone}
        onChange={(e) =>
          setAluno({
            ...aluno,
            telefone: e.target.value,
          })
        }
      />

      <CampoCustomizado
        type="file"
        accept="image/*"
        label="Foto"
        onChange={(e) => {
          const imagem = e.target.files[0];

          if (imagem) {
            const reader = new FileReader();

            reader.onload = (event) => {
              setAluno({
                ...aluno,
                foto: event.target.result,
              });
            };

            reader.readAsDataURL(imagem);
          }
        }}
      />

      {aluno.foto && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={aluno.foto}
            alt="Foto do Aluno"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      <BotaoCustomizado
        tipo="primario"
        aoClicar={salvar}
      >
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
}

export default CadastroAlunos;