import { useCallback, useEffect, useState } from "react";
import { pessoaService } from "../services/pessoaService";
import type { PessoaResponse } from "../types/pessoa";
import { PessoaForm } from "../components/PessoaForm";

export function Pessoas() {
  const [pessoas, setPessoas] = useState<PessoaResponse[]>([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  const carregarPessoas = useCallback(async () => {
    try {
      setCarregando(true);

      const resultado = await pessoaService.listar();

      setPessoas(resultado);
      setErro("");
    } catch {
      setErro("Não foi possível carregar as pessoas.");
    } finally {
      setCarregando(false);
    }
  }, []);

  async function excluirPessoa(id: number) {
  try {
    await pessoaService.excluir(id);

    carregarPessoas();
  } catch {
    setErro("Não foi possível excluir a pessoa.");
  }
}

  useEffect(() => {
    async function carregarInicialmente() {
      try {
        const resultado = await pessoaService.listar();

        setPessoas(resultado);
        setErro("");
      } catch {
        setErro("Não foi possível carregar as pessoas.");
      } finally {
        setCarregando(false);
      }
    }

    carregarInicialmente();
  }, []);

  return (
    <div>
      <h1>LarFix</h1>

      <h2>Pessoas</h2>

      <PessoaForm onCriado={carregarPessoas} />

      {erro && <p>{erro}</p>}

      {carregando && <p>Carregando pessoas...</p>}

      {!carregando && !erro && pessoas.length === 0 && (
        <p>Nenhuma pessoa cadastrada.</p>
      )}

      {!carregando && !erro && (
        <ul>
          {pessoas.map((pessoa) => (
            <li key={pessoa.id}>
              {pessoa.nome} - {pessoa.idade} anos
              <button onClick={() => excluirPessoa(pessoa.id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}