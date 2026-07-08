import { useState } from "react";
import { pessoaService } from "../services/pessoaService";

interface PessoaFormProps {
  onCriado: () => void;
}

export function PessoaForm({ onCriado }: PessoaFormProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!nome || !idade) {
      setErro("Informe nome e idade.");
      return;
    }

    try {
      await pessoaService.criar({
        nome,
        idade: Number(idade),
      });

      setNome("");
      setIdade("");
      setErro("");

      onCriado();
    } catch {
      setErro("Não foi possível cadastrar a pessoa.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nova pessoa</h3>

      {erro && <p>{erro}</p>}

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Idade"
        type="number"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />

      <button type="submit">
        Cadastrar
      </button>
    </form>
  );
}