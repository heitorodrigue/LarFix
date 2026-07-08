import { useEffect, useState } from "react";
import { TransacaoForm } from "../components/TransacaoForm";
import { transacaoService } from "../services/transacaoService";
import type { TransacaoResponse } from "../types/transacao";

export function Transacoes() {
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [recarregar, setRecarregar] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregarTransacoes() {
      try {
        setCarregando(true);

        const resultado = await transacaoService.listar();

        if (ativo) {
          setTransacoes(resultado);
          setErro("");
        }
      } catch {
        if (ativo) setErro("Não foi possível carregar as transações.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarTransacoes();

    return () => {
      ativo = false;
    };
  }, [recarregar]);

  return (
    <div>
      <h1>Transações</h1>

      <TransacaoForm onCriado={() => setRecarregar((n) => n + 1)} />

      {erro && <p>{erro}</p>}

      {carregando && <p>Carregando...</p>}

      {!carregando && !erro && transacoes.length === 0 && (
        <p>Nenhuma transação cadastrada.</p>
      )}

      {!carregando && !erro && (
        <ul>
          {transacoes.map((transacao) => (
            <li key={transacao.id}>
              {transacao.descricao} - R$ {transacao.valor.toFixed(2)} -{" "}
              {transacao.tipo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}