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
      
      <h2 style={{ color: "gray", marginTop: "20px", marginBottom: "10px" }}>
        Histórico
      </h2>
      
      {erro && <p>{erro}</p>}

      {carregando && <p>Carregando...</p>}

      {!carregando && !erro && transacoes.length === 0 && (
        <p>Nenhuma transação cadastrada.</p>
      )}

      {!carregando && !erro && (
       <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Pessoa</th>
            </tr>
          </thead>

          <tbody>
            {transacoes.map((transacao) => (
              <tr key={transacao.id}>
                <td>{transacao.descricao}</td>
                <td>
                  {transacao.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>{transacao.tipo}</td>
                <td>{transacao.pessoaNome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}