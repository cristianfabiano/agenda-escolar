import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import BotaoCustomizado from "../../Componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../Componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../Componentes/Principal/Principal";

import validarCPF from "../../utils/validarCPF";
import formatarComMascara, {
  MASCARA_CPF,
  MASCARA_CELULAR,
} from "../../utils/formatarComMascara";

import { useAppContext } from "../../Contexto/AppContext";

function CadastroAlunos() {
  const navigate = useNavigate();
  const { alunoId } = useParams();
  const { usuarioLogado } = useAppContext();

  const CHAVE_ALUNOS = `alunos_${usuarioLogado.email}`;

  const [aluno, setAluno] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    matricula: "",
    turma: "",
    foto: "",
  });

  const turmas = [
    "Desenvolvimento Web",
    "Desenvolvimento Mobile",
    "Desenvolvimento de Jogos",
    "Desenvolvimento de Sistemas",
  ];

  useEffect(() => {
    if (!alunoId) return;

    const alunos =
      JSON.parse(localStorage.getItem(CHAVE_ALUNOS)) || [];

    const encontrado = alunos.find(
      (item) => item.id === alunoId
    );

    if (encontrado) {
      setAluno(encontrado);
    }
  }, [alunoId, CHAVE_ALUNOS]);

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
      JSON.parse(localStorage.getItem(CHAVE_ALUNOS)) || [];

    if (aluno.id) {
      const index = alunos.findIndex(
        (a) => a.id === aluno.id
      );

      if (index !== -1) {
        alunos[index] = aluno;
      }
    } else {
      alunos.push({
        ...aluno,
        id: crypto.randomUUID(),
      });
    }

    localStorage.setItem(
      CHAVE_ALUNOS,
      JSON.stringify(alunos)
    );

    toast.success(
      aluno.id
        ? "Aluno atualizado com sucesso!"
        : "Aluno cadastrado com sucesso!"
    );

    navigate("/lista-alunos");
  };

  return (
    <Principal
      titulo={aluno.id ? "Editar Aluno" : "Cadastro de Alunos"}
      voltarPara="/inicio"
    >
      <CampoCustomizado
        label="Nome"
        obrigatorio
        value={aluno.nome}
        onChange={(e) =>
          setAluno({
            ...aluno,
            nome: e.target.value,
          })
        }
      />

      <CampoCustomizado
        label="CPF"
        obrigatorio
        value={aluno.cpf}
        onChange={(e) =>
          setAluno({
            ...aluno,
            cpf: formatarComMascara(
              e.target.value,
              MASCARA_CPF
            ),
          })
        }
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
        obrigatorio
        value={aluno.matricula}
        onChange={(e) =>
          setAluno({
            ...aluno,
            matricula: e.target.value,
          })
        }
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

          {turmas.map((turma) => (
            <option
              key={turma}
              value={turma}
            >
              {turma}
            </option>
          ))}
        </select>
      </div>

      <CampoCustomizado
        label="Telefone"
        value={aluno.telefone}
        onChange={(e) =>
          setAluno({
            ...aluno,
            telefone: formatarComMascara(
              e.target.value,
              MASCARA_CELULAR
            ),
          })
        }
      />

      <CampoCustomizado
        type="file"
        accept="image/*"
        label="Foto"
        onChange={(e) => {
          const imagem = e.target.files?.[0];

          if (!imagem) return;

          const reader = new FileReader();

          reader.onload = ({ target }) => {
            setAluno((prev) => ({
              ...prev,
              foto: target.result,
            }));
          };

          reader.readAsDataURL(imagem);
        }}
      />

      {aluno.foto && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={aluno.foto}
            alt="Foto do aluno"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <BotaoCustomizado
        tipo="primario"
        aoClicar={salvar}
      >
        {aluno.id ? "Atualizar" : "Salvar"}
      </BotaoCustomizado>
    </Principal>
  );
}

export default CadastroAlunos;